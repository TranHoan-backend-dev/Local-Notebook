# Quy chuẩn 01: Scope, Vision & Kiến trúc RAG (Wiki-Enhanced / Hybrid RAG)

Tài liệu này định nghĩa các quy tắc cốt lõi về tầm nhìn sản phẩm và tiêu chuẩn kỹ thuật đối với hệ thống trích xuất tri thức và hỏi đáp (RAG).

---

## 1. Tầm nhìn & Phạm vi sản phẩm (Scope & Vision)

- **Local Knowledge Workspace:** Ứng dụng tập trung vào việc đọc, hỏi đáp, tìm kiếm thông tin và ghi chú cá nhân chạy hoàn toàn cục bộ (offline/local-first).
- **Các tính năng không thuộc phạm vi (Out of Scope):** Không phát triển các tính năng đa phương tiện phức tạp như: Sinh âm thanh/Podcast, xuất PowerPoint, xử lý Video, hoặc các công cụ tự động sinh ghi chú mẫu (như Study Guide, FAQs tự động).
- **Core Value:** Tốc độ phản hồi cực nhanh trên máy tính cá nhân, bảo mật dữ liệu tuyệt đối và khả năng trích dẫn nguồn cực kỳ chính xác.

---

## 2. Các nguyên tắc kiến trúc bất biến (Architecture Invariants)

Mọi đoạn code liên quan đến pipeline xử lý tài liệu và hội thoại bắt buộc phải tuân theo 3 nguyên lý:
1. **Source Document = Ground Truth:** Tài liệu gốc (văn bản thô, bảng biểu) là chân lý tối cao. Thông tin trả về cho người dùng phải luôn có nguồn gốc xác thực từ tài liệu.
2. **Wiki/Knowledge Layer = Precomputed Semantic Layer:** Bộ Wiki tri thức (Glossary, Summary, Facts) chỉ đóng vai trò làm giàu ngữ cảnh và tăng tốc độ truy vấn, **không bao giờ thay thế hoặc xóa bỏ tài liệu gốc**.
3. **LLM = Answer Generator, not Source of Truth:** LLM chỉ làm nhiệm vụ tổng hợp câu trả lời từ ngữ cảnh RAG truyền vào. Nếu thông tin không có trong tài liệu, LLM không được tự ý suy diễn hoặc bịa đặt.

---

## 3. Quy chuẩn Ingestion & Trích xuất Wiki (Knowledge Extraction)

- **Quy tắc "Precompute Once":** AI Agent thực hiện đọc và phân tích cấu trúc tài liệu một lần duy nhất khi người dùng nạp tài liệu để xây dựng bộ Wiki tri thức (Knowledge Layer). Không quét lại file thô mỗi lần người dùng hỏi. Cho phép chạy lại (re-index) khi nâng cấp prompt/model.
- **Dữ liệu cấu trúc Wiki trích xuất gồm:**
  - `Glossary`: Định nghĩa các thuật ngữ, khái niệm, viết tắt.
  - `Section Summaries`: Tóm tắt các phân đoạn với độ dài thích ứng (adaptive length).
  - `Key Facts`: Số liệu cụ thể, sự kiện cốt lõi quan trọng.
  - `Core Q&As`: Các cặp câu hỏi/trả lời dự đoán trước cho tài liệu.
- **User Edit Protection (Bảo vệ dữ liệu người dùng sửa):**
  - Mọi mục Wiki phải có thuộc tính `modified_by_user` (boolean) và lịch sử `version`.
  - Nếu người dùng chỉnh sửa trang Wiki, AI tuyệt đối không được tự động ghi đè (overwrite) khi người dùng re-index tài liệu.

---

## 4. Quy chuẩn Hỏi đáp (Retrieval & Generation Pipeline)

Mọi truy vấn hội thoại phải đi qua quy trình chuẩn hóa:
1. **Wiki-driven Query Expansion:** Mở rộng câu hỏi của người dùng dựa trên Glossary. Tuy nhiên, câu hỏi gốc phải luôn được gán trọng số ưu tiên cao hơn (high weight), từ khóa mở rộng có trọng số thấp hơn để tránh hiện tượng loang truy vấn (Query Drift).
2. **Hybrid Search:** Thực hiện tìm kiếm vector và BM25 song song trên cả hai lớp: `Knowledge Layer` (Wiki) và `Source Layer` (Source Chunks).
3. **Reranking:** Toàn bộ kết quả thô được gộp và đưa qua Reranker trước khi lọc.
4. **Evidence Confidence Control:**
   - Đánh giá điểm tương đồng (similarity score) của các chunks tìm được.
   - Nếu điểm số của tất cả các chunks thấp hơn ngưỡng quy định (ví dụ: `< 0.4`), hệ thống bắt buộc phải dừng câu lệnh và trả lời: *"Không tìm thấy đủ thông tin trong tài liệu"* thay vì cố trả lời.
5. **Context Allocation (Phân bổ ngữ cảnh):**
   - Đảm bảo tỷ lệ cân bằng trong cửa sổ ngữ cảnh LLM (ví dụ: tối đa 3 mục Wiki và 5 mục Source Chunks). Tránh trường hợp một bên chiếm hết dung lượng ngữ cảnh.
