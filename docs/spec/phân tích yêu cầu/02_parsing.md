# Quyết định 2: Định dạng tài liệu, OCR & Cấu trúc Parser (Parsing Abstraction)

### Nỗi đau người dùng

Khi nạp các file PDF dạng scan (ảnh quét), tài liệu bị lỗi font hoặc chứa bảng biểu phức tạp, các công cụ parse thông thường chỉ lấy ra đống text lộn xộn, mất cấu trúc hoặc rỗng tuếch khiến AI không thể hiểu đúng. Đồng thời, việc xử lý riêng lẻ từng loại định dạng file làm code backend trở nên rối rắm và khó mở rộng.

### Yêu cầu làm rõ

Ứng dụng cần hỗ trợ các định dạng tài liệu: **PDF, MD, TXT, HTML** chạy hoàn toàn cục bộ (local).

### Quyết định kỹ thuật

1. **Kiến trúc Parser chuẩn hóa (Normalized Document Schema):**
   - Thiết kế abstraction lớp `DocumentParser` làm cổng giao tiếp chung. Tất cả các parser định dạng cụ thể phải trả về một cấu trúc tài liệu chuẩn hóa chung (`Normalized Document Schema`) bao gồm thông tin `Metadata` và danh sách các `Blocks` (như `Heading`, `Paragraph`, `Table`, `Code`, `Image`).
   - Pipeline RAG và Chunker chỉ xử lý trên schema chuẩn hóa này mà không cần quan tâm định dạng file gốc ban đầu là gì.
2. **Công cụ xử lý tương ứng:**
   - **PDF:** Sử dụng **Docling** (chính) để phân tích cấu trúc nâng cao (bảng biểu, headers, phân cấp). Sử dụng **PyMuPDF (fitz)** làm fallback nhẹ cho máy cấu hình thấp.
   - **Markdown (MD) & TXT:** Đọc trực tiếp và phân tách cấu trúc dựa trên cú pháp tiêu chuẩn của Markdown.
   - **HTML:** Sử dụng **BeautifulSoup4** kết hợp **Markdownify** để chuyển đổi nội dung HTML sang Markdown sạch trước khi đưa vào chunking pipeline.
3. **Xử lý OCR (Hình ảnh & PDF quét):**
   - Tích hợp OCR làm **tính năng tùy chọn** (Sử dụng module OCR có sẵn của Docling hoặc PaddleOCR nhẹ). Chỉ kích hoạt khi văn bản trích xuất từ PDF rỗng hoặc theo yêu cầu của người dùng để tối ưu hiệu năng máy local.
