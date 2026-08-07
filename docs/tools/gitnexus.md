# GitNexus — Trình Phân Tích & Code Intelligence Cho AI Agents

[GitNexus](https://gitnexus.vercel.app/) là công cụ hỗ trợ AI xây dựng bản đồ cấu trúc codebase (knowledge graph) hoàn toàn local, giúp AI hiểu sâu sắc về các mối quan hệ imports, hàm gọi, lớp kế thừa và luồng thực thi mà không cần tải code lên đám mây.

## 1. Cài Đặt (Installation)

Do GitNexus sử dụng các binary biên dịch native (như Tree-sitter và LadybugDB), khuyến nghị cài đặt kèm quyền build:

```bash
pnpm add -g --allow-build=@ladybugdb/core --allow-build=gitnexus --allow-build=tree-sitter gitnexus
```

*Lưu ý: Nếu binary LadybugDB bị thiếu trên môi trường Windows, chạy lệnh sau để sửa chữa:*

```bash
node "C:\Users\XUAN HOAN\AppData\Local\pnpm\global\5\.pnpm\@ladybugdb+core@0.18.3\node_modules\@ladybugdb\core\install.js"
```

## 2. Cách Sử Dụng (Usage)

Di chuyển vào thư mục gốc của dự án và chạy các lệnh dưới đây:

### Phân Tích Codebase

```bash
gitnexus analyze
```

Lệnh này quét toàn bộ dự án, tạo biểu đồ phụ thuộc và xuất ra các file quy chuẩn như `AGENTS.md`.

### Thiết Lập MCP Cho Editor

```bash
gitnexus setup
```

Lệnh này tự động quét và cấu hình MCP Server cùng các skill, hooks thích hợp cho các trình soạn thảo được cài đặt (như Claude Code, Antigravity, Codex, v.v.).

### Kiểm Tra Trạng Thái

- `gitnexus list`: Hiển thị danh sách các kho mã nguồn đã được chỉ mục.
- `gitnexus status`: Xem trạng thái chỉ mục hiện tại của dự án này.
- `gitnexus serve`: Khởi chạy giao diện Web UI cục bộ để trực quan hóa biểu đồ mã nguồn.

## 3. Cấu Hình MCP (Model Context Protocol)

Có thể chạy GitNexus dưới dạng MCP Server trực tiếp bằng cách cấu hình vào `.mcp.json`:

```json
{
  "mcpServers": {
    "gitnexus": {
      "command": "pnpm",
      "args": ["dlx", "gitnexus", "mcp"],
      "description": "Codebase knowledge graph and code intelligence"
    }
  }
}
```
