# Quyết định 9: Kiến trúc Wiki-Enhanced / Hybrid RAG & Các cơ chế tối ưu hóa

### Nỗi đau người dùng

Với mỗi câu hỏi đơn giản, máy tính local của người dùng lại bị quá tải, quạt tản nhiệt quay rú lên và mất tới 20-30 giây phản hồi vì CPU/GPU phải liên tục đọc đi đọc lại hàng ngàn từ văn bản thô đầy nhiễu của tài liệu gốc. Ngược lại, nếu chỉ sử dụng bản tóm tắt thông tin, AI sẽ bị ảo tưởng (hallucination) hoặc bỏ sót các chi tiết kỹ thuật nhỏ nằm sâu trong tài liệu gốc khi người dùng hỏi sâu.

### Yêu cầu làm rõ

Thay đổi mô hình RAG truyền thống sang mô hình **Wiki-Enhanced / Hybrid RAG** (Kết hợp giữa việc tra cứu trên bộ Wiki tri thức được trích xuất trước và đối chiếu lại với văn bản thô gốc của tài liệu) để tối ưu tối đa hiệu năng mà vẫn bảo toàn độ chính xác của câu trả lời từ Local LLM.

### Quyết định kỹ thuật

1. **Nguyên tắc kiến trúc bất biến (Architecture Invariants):**
   - **Source Document = Ground Truth:** Tài liệu gốc (Raw Source Chunks) luôn là chân lý tối cao của hệ thống.
   - **Wiki/Knowledge Layer = Precomputed Semantic Layer:** Bộ Wiki tri thức chỉ đóng vai trò là một lớp ngữ nghĩa được tính toán trước nhằm tăng tốc độ truy vấn và làm phong phú thêm ngữ cảnh, tuyệt đối **không thay thế tài liệu gốc**.
   - **LLM = Answer Generator, not Source of Truth:** LLM chỉ chịu trách nhiệm tổng hợp câu trả lời từ ngữ cảnh được cung cấp, không tự ý suy diễn hoặc bịa đặt thông tin ngoài ngữ cảnh.

2. **Khái niệm xử lý "Precompute Once" (Tính toán một lần):**
   - Không áp dụng cơ chế "Read once forever" (đọc một lần mãi mãi). AI Agent sẽ đọc tài liệu để trích xuất lớp tri thức một lần duy nhất trong quá trình nạp/indexing và tạo thành **Knowledge Layer** lưu trong SQLite.
   - Khi có thay đổi về phiên bản parser, prompt tóm tắt, hoặc mô hình LLM, hệ thống cho phép tính toán lại (re-index) để đảm bảo chất lượng tri thức cập nhật nhất.
   - Lớp tri thức trích xuất (Knowledge Layer) bao gồm:
     - **Glossary (Thuật ngữ & Khái niệm):** Định nghĩa chi tiết các khái niệm, từ viết tắt.
     - **Section Summaries (Tóm tắt phân đoạn):** Tóm tắt nội dung chính của từng chương/mục lớn với độ dài thích ứng (adaptive length) dựa trên kích thước phần.
     - **Key Facts (Số liệu & Sự kiện cốt lõi):** Các mốc thời gian, số liệu thống kê hoặc sự kiện quan trọng.
     - **Core Q&As (Hỏi đáp cốt lõi):** Các cặp câu hỏi-trả lời dự đoán trước cho tài liệu.

3. **Cơ chế hỏi đáp lai (Hybrid Retrieval at Query Time) & Phân bổ ngữ cảnh:**
   - Hệ thống thực hiện truy tìm song song trên cả hai lớp:
     - **Knowledge Layer (Wiki Context):** Cung cấp giải thích và ngữ cảnh ngữ nghĩa rộng (Semantic Context).
     - **Source Layer (Source Evidence):** Cung cấp bằng chứng cụ thể và dữ liệu thô phục vụ trích dẫn (Evidence/Citation).
   - **Giới hạn tỷ lệ ngữ cảnh (Context Allocation):** Ngữ cảnh truyền vào LLM được phân bổ cân bằng theo tỷ lệ (ví dụ: tối đa 3 mục Wiki + 5 mục Source Chunks) để tránh việc một bên chiếm dụng toàn bộ context window.
   - Kết quả từ cả hai nguồn được gộp lại, đưa qua **Reranker** để lọc và sắp xếp.
   - **Đánh giá độ tin cậy của bằng chứng (Evidence Confidence):** Nếu điểm tương đồng (similarity score) của các ứng viên tìm được thấp hơn ngưỡng quy định (ví dụ: < 0.4), hệ thống sẽ ngắt và LLM sẽ trả lời: *"Không tìm thấy đủ thông tin trong tài liệu"* thay vì cố trả lời để tránh hallucination.

4. **Các cơ chế tối ưu hóa nâng cao:**
   - **Quản lý phiên bản & Bảo vệ chỉnh sửa (User Edit Versioning):** Giao diện cho phép người dùng sửa đổi trực tiếp trang Wiki. Mỗi mục Wiki có thuộc tính `modified_by_user: boolean` và lịch sử phiên bản (`version`). Khi re-index tài liệu, hệ thống chỉ cập nhật các mục có giá trị `modified_by_user = false`, giữ nguyên nội dung người dùng đã chỉnh sửa.
   - **Định tuyến Citation ở Backend (Backend Citation Validation):** Hệ thống phân biệt rõ citation nội bộ (ví dụ: `W1` cho Wiki, `S1` cho Source). Backend chịu trách nhiệm map các ID nguồn và validate chúng trước khi gửi kết quả lên UI, không để frontend tự suy luận nhãn `[1]` tương ứng nguồn nào.
   - **Liên kết thực thể thông minh (Entity Resolution):** Gom nhóm các thực thể trùng nhau từ các file khác nhau dựa trên cấu trúc gồm `canonical_name`, `aliases` (từ đồng nghĩa) và `embeddings`, tránh trùng lặp thông tin thô.
   - **Kiểm soát mở rộng truy vấn (Query Expansion Control):** Sử dụng Glossary để tìm từ đồng nghĩa nhằm mở rộng câu hỏi gốc, nhưng câu hỏi gốc luôn được gán trọng số ưu tiên cao nhất (high weight), từ khóa mở rộng có trọng số thấp hơn để tránh hiện tượng loang truy vấn (Query Drift).
   - **Tóm tắt cuốn chiếu phân cấp & Cache Version cho Summary:** Áp dụng quy trình tóm tắt từ dưới lên (Paragraphs -> Section Summaries -> Document Summary). Cache key cho Summary bao gồm `document_hash` + `llm_model` + `summary_prompt_version`. Nếu chỉ thay đổi prompt summary, hệ thống chỉ sinh lại summary mới mà không cần parse/embedding lại file gốc ban đầu.
