# Kiểm soát Truy cập & Bảo mật Local (Local Access Control & Security)

Tài liệu này định nghĩa các nguyên tắc bảo mật, giới hạn truy cập thư mục hệ thống, an toàn IPC cho ứng dụng Desktop (Electron) và bảo mật phiên làm việc (session/BFF) cho ứng dụng Web (Next.js).

---

## 1. Giới hạn truy cập Thư mục & Đường dẫn (File System Access Control)

Vì ứng dụng chạy trực tiếp trên máy của người dùng, việc bảo vệ hệ thống tệp tin khỏi bị sửa đổi trái phép là rất quan trọng:

- **Nguyên tắc Sandbox Local:** Ứng dụng chỉ được phép đọc/ghi dữ liệu trong thư mục dữ liệu được chỉ định:
  - Thư mục hệ thống: `%LOCALAPPDATA%/Local-Notebook` (Windows), `~/Library/Application Support/Local-Notebook` (macOS), `~/.local/share/local-notebook` (Linux).
  - Thư mục Workspace hiện tại được người dùng mở.
- **Chặn Directory Traversal:** Mọi API tải lên hoặc xử lý tệp tin ở Backend Python phải kiểm tra và làm sạch (sanitize) đường dẫn tệp. Tuyệt đối không cho phép sử dụng ký tự quay lui thư mục (như `../` hoặc `..\\`) để đọc ghi các tệp hệ thống nhạy cảm bên ngoài Sandbox.
- **Xác thực định dạng tệp:** Giới hạn chặt chẽ định dạng file tải lên (chỉ cho phép các tệp văn bản có phần mở rộng `.txt`, `.pdf`, `.md`, `.html`). Chặn hoàn toàn các file thực thi (như `.exe`, `.sh`, `.bat`) để tránh chạy mã độc local.

---

## 2. Bảo mật Electron (Electron Security Shell)

Electron chạy với đặc quyền của Node.js, do đó cần cấu hình bảo mật tuyệt đối cho Renderer Process:

- **Bật Context Isolation:** Bắt buộc cấu hình `contextIsolation: true` trong cửa sổ BrowserWindow để cô lập hoàn toàn môi trường JavaScript của Renderer với Main Process Node.js.
- **Tắt Node Integration:** Bắt buộc cấu hình `nodeIntegration: false` ở Renderer để ngăn giao diện web thực thi các lệnh hệ thống trực tiếp.
- **Làm sạch IPC Payloads:** Main Process phải validate tất cả dữ liệu nhận được từ Renderer qua các kênh IPC (ví dụ: kiểm tra ID notebook có phải là chuỗi hợp lệ, kiểm tra đường dẫn file có hợp pháp). Không tin tưởng dữ liệu thô gửi lên từ Renderer.

---

## 3. Bảo mật Backend FastAPI (Local API Security)

FastAPI chạy dưới dạng một Local Server sidecar phục vụ Renderer:

- **Giới hạn Host:** Backend FastAPI bắt buộc phải bind và chỉ lắng nghe các kết nối từ cổng cục bộ `127.0.0.1` (localhost). Chặn hoàn toàn việc bind vào `0.0.0.0` để tránh các thiết bị khác trong cùng mạng LAN truy cập vào API và tài liệu local của người dùng.
- **CORS Configuration:** Cấu hình CORS ở FastAPI chỉ cho phép nguồn gốc (Origin) từ Electron App (ví dụ: `file://` hoặc cổng localhost cụ thể của frontend) truy cập.
- **Chặn Command Injection:** Tuyệt đối không thực thi các lệnh shell hệ thống bằng cách truyền trực tiếp chuỗi chưa qua lọc từ người dùng vào các hàm như `os.system()` hoặc `subprocess.Popen(shell=True)`.

---

## 4. Bảo mật cho chế độ chạy Web (Next.js BFF / Web Mode Security)

Khi triển khai dưới dạng Web App phục vụ nhiều người dùng qua trình duyệt, bắt buộc tuân thủ các quy tắc bảo mật sau:

- **Session Management (Next.js BFF):** Client (Trình duyệt) không bao giờ được nắm giữ `Access Token` trực tiếp để tránh tấn công XSS. Tầng BFF (Next.js API Routes) sẽ lưu Token dưới dạng `HttpOnly`, `Secure`, `SameSite=Lax` Cookie.
- **Token Propagation:** Khi có request từ Client, BFF Next.js chịu trách nhiệm đọc HttpOnly Cookie, giải mã và đính kèm token vào Header `Authorization: Bearer ...` trước khi chuyển tiếp yêu cầu xuống FastAPI Backend.
- **Route Guards & Middleware:** Sử dụng Next.js Middleware (`middleware.ts`) để kiểm tra trạng thái Session trên máy chủ và chặn hướng điều hướng (redirect) người dùng ra khỏi các trang riêng tư (Private pages) nếu họ chưa đăng nhập hợp lệ.
- **Ẩn phần tử giao diện (UI Visibility):** Kiểm tra JWT payload ở client-side để ẩn/vô hiệu hóa các nút hành động nhạy cảm (như nút sửa, xóa ghi chú) nếu user không đủ quyền hạn. Tuy nhiên, backend FastAPI vẫn bắt buộc phải xác thực lại quyền này ở mỗi request.
 F
