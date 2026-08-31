# AgentMemory — Hệ Thống Ký Ức Bền Vững Cho AI Agents

[AgentMemory](https://github.com/rohitg00/agentmemory) là một phân lớp bộ nhớ dài hạn, giúp lưu trữ, truy xuất và hợp nhất các tương tác của AI agent qua các phiên làm việc khác nhau (cross-session memory).

## 1. Cài Đặt (Installation)

Sử dụng `pnpm` để cài đặt toàn cục:

```bash
pnpm add -g @agentmemory/agentmemory
```

## 2. Cách Khởi Chạy & Sử Dụng (Running & Usage)

Để khởi động máy chủ bộ nhớ cục bộ (chạy ở cổng mặc định `3111`):

```bash
agentmemory
```

### Các Lệnh Hỗ Trợ (Commands)

- `agentmemory demo`: Nạp trước một số dữ liệu mẫu để thử nghiệm truy xuất ngữ nghĩa (semantic recall).
- `agentmemory doctor`: Chạy chương trình chẩn đoán tương tác để kiểm tra trạng thái máy chủ, cổng kết nối và cấu hình MCP.
- `agentmemory --reset`: Khởi tạo lại cấu hình từ đầu.
- `agentmemory stop`: Dừng toàn bộ các dịch vụ nền và engine đang chạy.

## 3. Cấu Hình MCP (Model Context Protocol)

Để cấu hình làm MCP Server cho các AI Editor hoặc công cụ hỗ trợ như Antigravity/Claude Code:

Thêm đoạn cấu hình sau vào `.mcp.json` hoặc file cấu hình MCP của editor:

```json
{
  "mcpServers": {
    "agentmemory": {
      "command": "pnpm",
      "args": ["dlx", "@agentmemory/agentmemory"],
      "description": "Persistent memory layer for AI agents"
    }
  }
}
```

## 4. REST API & Web UI

- **REST API**: Khởi chạy tại `http://localhost:3111`.
  - Kiểm tra trạng thái: `curl http://localhost:3111/agentmemory/health`
- **Web Viewer (UI)**: Mở trình duyệt truy cập `http://localhost:3113` để xem trực quan hóa các ký ức dạng vector được lưu trữ.
