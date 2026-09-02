# Quy chuẩn 03: Tiêu chuẩn lập trình JS/TS & Electron (Frontend Conventions)

Tài liệu này quy định các quy tắc code Frontend, giao tiếp Electron IPC, cấu trúc UI và quy chuẩn kiểm thử tự động UI.

---

## 1. Tiêu chuẩn TypeScript & React (TS & React Standards)

- **TypeScript Strict Mode:** Bắt buộc sử dụng kiểu dữ liệu tường minh. Hạn chế tối đa sử dụng kiểu `any`. Mọi API Response và Props của component phải được định nghĩa bằng `interface` hoặc `type`.
- **Phân tách Logic và UI (Hook Separation):**
  - Tránh viết logic gọi API, quản lý state phức tạp hoặc tính toán cồng kềnh trực tiếp trong component JSX.
  - Tách logic vào các **Custom Hooks** (ví dụ: `useNotebooks`, `useRAGChat`). Component JSX chỉ chịu trách nhiệm render giao diện và bắt sự kiện.
- **State Management:** Sử dụng **Zustand** hoặc Context API cho global state (như cấu hình model hoạt động, danh sách notebook đang chọn, theme tối/sáng).

---

## 2. Quy chuẩn Giao tiếp Electron IPC (Electron IPC Channels)

Để đảm bảo tính bảo mật và đúng kiến trúc của Electron Desktop App:
- **Không nhúng Node.js vào Renderer:** Cấm gọi trực tiếp các module Node.js (như `fs`, `child_process`, `path`) ở giao diện Renderer Process.
- **Context Bridge & Preload Script:** Tất cả giao tiếp giữa cửa sổ giao diện (Renderer) và hệ thống (Main Process) phải thông qua `contextBridge` định nghĩa trong `preload.js` để phơi bày các API an toàn (ví dụ: `window.electronAPI.selectFile()`).
- **IPC Message Naming:** Sử dụng cách đặt tên kênh IPC rõ ràng theo tiền tố:
  - Gửi yêu cầu từ UI: `ipcRenderer.invoke('db:get-notebooks')`
  - Nhận phản hồi/lắng nghe sự kiện từ Main: `ipcRenderer.on('import:progress', callback)`

---

## 3. Thiết kế giao diện & Bố cục 3 Cột (Workspace Layout)

- **Bố cục 3 Cột bắt buộc (Workspace 3-Column):**
  - **Cột trái (Source Area):** Khu vực tải lên tài liệu và danh sách tài liệu. Phải chứa Checkbox chọn tất cả và Checkbox chọn lẻ từng tệp.
  - **Cột giữa (Chat Area):** Cửa sổ chat, nút Toggle "Optimized Output" để bật chế độ câu trả lời súc tích.
  - **Cột phải (Notes/Wiki Area):** Trình soạn thảo ghi chú thủ công bằng Markdown và khu vực xem đồ thị tri thức (Knowledge Graph).
- **Themeing:** Sử dụng CSS variables/Tailwind để hỗ trợ đồng bộ cả giao diện Tối (Dark mode) và Sáng (Light mode) hài hòa, dịu mắt.

---

## 4. Quy chuẩn Kiểm thử tự động UI (Playwright & data-testid)

Để đảm bảo Playwright kiểm thử tự động chính xác và không bị đứt gãy khi thay đổi UI class CSS:
- **Bắt buộc thuộc tính `data-testid`:** Mọi phần tử tương tác chính trên màn hình bắt buộc phải chứa thuộc tính `data-testid` để kiểm thử viên (Playwright) định vị.
- **Quy tắc đặt tên `data-testid`:**
  - Nút bấm: `data-testid="btn-[chức_năng]"` (ví dụ: `data-testid="btn-create-notebook"`, `data-testid="btn-send-message"`).
  - Ô nhập liệu: `data-testid="input-[tên_trường]"` (ví dụ: `data-testid="input-chat-query"`, `data-testid="input-note-content"`).
  - Vùng hiển thị/Danh sách: `data-testid="container-[tên_vùng]"` hoặc `data-testid="list-[tên]"` (ví dụ: `data-testid="list-documents"`, `data-testid="container-chat-history"`).
  - Trạng thái/Loader: `data-testid="loader-processing"`, `data-testid="status-import-failed"`.
- **Tích hợp kiểm thử:** Sau khi hoàn thành code một màn hình, chạy bộ test suite Playwright tương ứng để xác minh các luồng hoạt động chính (như tạo notebook -> nạp tài liệu -> tick chọn -> chat thử -> viết note).
