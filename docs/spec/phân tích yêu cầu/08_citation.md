# Quyết định 8: Kiến trúc trích dẫn tài liệu nguồn (Citation Architecture)

### Nỗi đau người dùng

AI thường gặp hiện tượng "ảo tưởng" (hallucination) - tự bịa ra thông tin sai lệch nhưng viết rất thuyết phục. Nếu không có cơ chế đối chiếu nguồn rõ ràng, người dùng không thể tin tưởng câu trả lời của AI và phải mất hàng giờ lật giở từng trang tài liệu giấy/PDF để tìm kiếm và kiểm chứng lại xem AI lấy thông tin đó ở đâu.

### Yêu cầu làm rõ

Xây dựng cơ chế trích xuất và hiển thị nguồn chính xác của các thông tin mà AI đưa ra trong câu trả lời.

### Quyết định kỹ thuật

1. **Trích xuất thông tin nguồn đáng tin cậy:**
   - Khi RAG pipeline lấy các chunks liên quan từ LanceDB, mỗi chunk được gán một ID duy nhất và truyền vào ngữ cảnh LLM kèm theo số thứ tự (ví dụ: `[Context 1]`, `[Context 2]`).
   - Yêu cầu LLM khi đưa ra khẳng định phải chỉ định số thứ tự nguồn (ví dụ: `TLS sử dụng cổng 443 [1]`).
2. **Hiển thị và Điều hướng trên UI (Interactive Navigation):**
   - Hệ thống parse câu trả lời của AI và chuyển đổi các tag trích dẫn (`[1]`) thành các liên kết nhấp chuột (interactive links).
   - Khi người dùng click vào thẻ trích dẫn, ứng dụng sẽ mở tài liệu tương ứng tại cột trái/modal, tự động nhảy đến đúng trang (`page_number`) và highlight đoạn văn bản dựa trên `start_offset` và `end_offset` đã lưu trong Chunk Metadata.
