# Quyết định 1: Nền tảng ứng dụng & Kiến trúc phân phối

### Nỗi đau người dùng

Lập trình viên và người dùng kỹ thuật thích chạy ứng dụng web trên localhost để dễ debug và linh hoạt, nhưng người dùng cuối (non-tech) lại gặp khó khăn khi phải gõ lệnh terminal để khởi động. Họ cần một ứng dụng Desktop cài đặt đơn giản, mở lên là chạy, không cấu hình rườm rà.

### Yêu cầu làm rõ

Ứng dụng cần hỗ trợ đồng thời cả giao diện Web (chạy qua trình duyệt trên localhost) và giao diện Desktop (đóng gói bằng Electron).

### Quyết định kỹ thuật

1. **Frontend Architecture:**
   - Sử dụng **Next.js** làm framework chính để xây dựng giao diện người dùng. Đảm bảo hỗ trợ tốt việc build/render cả dạng Web App chạy local và đóng gói giao diện tĩnh cho Electron.
2. **Backend & Processing Pipeline:**
   - Sử dụng **Python (FastAPI)** làm Backend Server để xử lý các thư viện RAG nặng (như Docling, BGE Embeddings, SQLite, LanceDB).
   - **Chế độ Web:** Người dùng khởi chạy Backend FastAPI độc lập và mở Frontend Next.js trên trình duyệt.
   - **Chế độ Desktop (Electron):** Electron đóng vai trò desktop shell và sẽ khởi chạy một tiến trình con (Sidecar Process) chạy Backend Python (được đóng gói sẵn) để cung cấp API cục bộ cho giao diện Electron.
