# Quyết định 4: Quản lý Không gian làm việc (Notebooks) & Ghi chú (Notes)

### Nỗi đau người dùng

Người dùng phải học và nghiên cứu nhiều chủ đề khác nhau cùng một lúc. Nếu tất cả tài liệu bị gom chung vào một nơi, AI sẽ trả lời lẫn lộn kiến thức của các chủ đề với nhau. Đồng thời, việc ghi chép lại các kiến thức quan trọng thường bị phân tán ra các ứng dụng viết note bên ngoài (như Notion, Word) gây mất tập trung và đứt gãy luồng làm việc.

### Yêu cầu làm rõ

Xác định cách thức tổ chức các không gian làm việc (Notebooks) và phạm vi tính năng của hệ thống ghi chú (Notes).

### Quyết định kỹ thuật

1. **Quản lý dạng Dashboard (Notebooks Dashboard):**
   - Giao diện chính là một Dashboard quản lý danh sách các Notebook (Tạo mới, Xóa, Đổi tên).
   - Mỗi Notebook hoạt động độc lập: lưu trữ tài liệu nguồn riêng, lịch sử chat riêng, và ghi chú riêng.
2. **Hệ thống ghi chú (Notes Specification):**
   - Chỉ hỗ trợ **ghi chú thủ công (Manual Notes)**. Người dùng tự viết ghi chú (hỗ trợ Markdown cơ bản: Bold, Italic, List, Code Block).
   - Cho phép lưu trữ, sửa đổi, và xóa các ghi chú này bên trong từng Notebook.
