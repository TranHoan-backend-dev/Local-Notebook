# Quyết định 6: Thiết kế bố cục giao diện Workspace & Chế độ hội thoại (Chat Modes)

### Nỗi đau người dùng

Khi đang cần tìm kiếm thông tin nhanh dưới áp lực công việc, người dùng rất khó chịu khi AI trả lời quá dài dòng, chứa nhiều câu xã giao thừa thãi ("Chào bạn, tôi có thể giúp...", "Hy vọng câu trả lời này..."). Họ cũng không muốn AI lục lọi toàn bộ 20 tài liệu trong kho để trả lời một câu hỏi chỉ liên quan tới 2 file cụ thể.

### Yêu cầu làm rõ

Quyết định chi tiết về cấu trúc các thành phần trên giao diện làm việc chính (Workspace UI) và các tùy chọn tối ưu hóa câu trả lời của AI.

### Quyết định kỹ thuật

1. **Bố cục giao diện 3 cột chính:**
   - **Cột trái (Source Manager):**
     - Phía trên: Khu vực tải lên tài liệu (TXT, PDF, MD, HTML).
     - Phía dưới: Danh sách các tài liệu đã tải lên trong Notebook.
     - Hỗ trợ checkbox **Chọn tất cả (Select All)** và **Checkbox chọn lẻ** từng tài liệu.
     - **Retrieval Scope:** Khi người dùng tích chọn tài liệu ở UI, backend bắt buộc phải dùng bộ lọc `document_ids` trực tiếp khi truy vấn LanceDB/Vector DB (không lọc ở frontend).
   - **Cột giữa (Chat Console):** Cửa sổ chat chính, hiển thị lịch sử hội thoại, các trích dẫn nguồn (citations) và hộp nhập tin nhắn.
   - **Cột phải (Notes Manager):** Danh sách các ghi chú thủ công của người dùng, cho phép xem nhanh và chỉnh sửa trực tiếp nội dung ghi chú.
2. **Chế độ Tối ưu Output (AI Output Optimization Toggle):**
   - Tích hợp nút bật/tắt (Switch Toggle) cho phép chọn **"Tối ưu câu trả lời (Optimized Output)"**.
   - Cấu hình style câu trả lời bao gồm hai chế độ: **Concise (Súc tích)** và **Normal (Bình thường)**.
   - Khi bật `Concise`, hệ thống sẽ tiêm một prompt đặc biệt vào system prompt yêu cầu LLM đi thẳng vào vấn đề, loại bỏ hoàn toàn các câu mở đầu/kết thúc xã giao, rườm rà.
