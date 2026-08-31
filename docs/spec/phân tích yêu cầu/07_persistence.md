# Quyết định 7: Vị trí lưu trữ dữ liệu & Thiết kế Schema Cơ sở dữ liệu (Data Persistence)

### Nỗi đau người dùng

Khi nâng cấp hoặc cài đặt lại ứng dụng, toàn bộ dữ liệu, lịch sử chat và công sức viết note tích lũy của người dùng bỗng dưng biến mất do lưu trữ sai vị trí. Bên cạnh đó, nếu ứng dụng chỉ trỏ tới đường dẫn file gốc ngoài ổ cứng, khi người dùng vô tình di chuyển hoặc xóa tệp gốc đó, ứng dụng sẽ bị lỗi liên kết và không thể đọc được tài liệu nữa.

### Yêu cầu làm rõ

Xác định nơi lưu trữ các tệp dữ liệu vật lý và thiết kế cấu trúc database cho ứng dụng cục bộ.

### Quyết định kỹ thuật

1. **Thư mục lưu trữ hệ thống (OS-Specific Application Data Directory):**
   - **Windows:** `%LOCALAPPDATA%/Local-Notebook` (đường dẫn thực tế: `C:\Users\<Tên_User>\AppData\Local\Local-Notebook`).
   - **macOS:** `~/Library/Application Support/Local-Notebook`.
   - **Linux:** `~/.local/share/local-notebook`.
   - Các cấu trúc thư mục con:
     - `/db/local_notebook.db`: Cơ sở dữ liệu SQLite.
     - `/vector_store/`: Cơ sở dữ liệu LanceDB (lưu trữ vector embeddings).
     - `/uploads/`: Bản sao vật lý các tệp tài liệu gốc được sao chép khi người dùng import (tránh lỗi mất liên kết nếu file gốc bị xóa/di chuyển bên ngoài).
2. **Thiết kế Database Schema chính:**
   - Ứng dụng quản lý các bảng SQLite chính bao gồm:
     - `Notebook`: `id`, `name`, `created_at`
     - `Document`: `id`, `notebook_id`, `name`, `file_hash`, `file_path`, `parser_version`, `chunker_version`, `embedding_model`, `processing_status` (`pending`, `processing`, `completed`, `failed`), `created_at`
     - `Chunk`: `id`, `document_id`, `page_number`, `heading`, `content`, `start_offset`, `end_offset`
     - `Conversation`: `id`, `notebook_id`, `created_at`
     - `Message`: `id`, `conversation_id`, `role`, `content`, `citations` (JSON list of chunk ids), `created_at`
     - `Note`: `id`, `notebook_id`, `title`, `content`, `created_at`
     - `Entity` & `Topic` (cho Knowledge Graph)
