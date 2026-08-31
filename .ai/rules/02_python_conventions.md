# Quy chuẩn 02: Tiêu chuẩn lập trình Python (Backend Conventions)

Tài liệu này quy định các tiêu chuẩn lập trình Backend bằng Python trong dự án Local-Notebook.

---

## 1. Phong cách Code & Cú pháp cơ bản (Python PEP8 & Formatting)

- **PEP8 Compliance:** Code phải tuân thủ nghiêm ngặt chuẩn PEP8. Sử dụng công cụ format tự động (như `black` hoặc `ruff`) để giữ code đồng nhất.
- **Bắt buộc sử dụng Type Hints:** Tất cả các định nghĩa hàm, tham số đầu vào và kiểu dữ liệu trả về phải ghi rõ Type Hints (ví dụ: `def search(query: str, limit: int = 5) -> List[Chunk]:`).
- **Pydantic v2:** Sử dụng Pydantic v2 để định nghĩa các request body, response schema, và cấu hình ứng dụng nhằm đảm bảo dữ liệu đầu vào luôn được xác thực (validate) chặt chẽ.
- **Async/Await:** Mọi endpoint API FastAPI, các hàm gọi tới cơ sở dữ liệu (SQLite) hoặc truy vấn Vector DB (LanceDB) phải viết dạng bất đồng bộ (`async def`) để không làm nghẽn luồng xử lý của server local.

---

## 2. Thiết kế Lớp trừu tượng (Abstraction Pattern)

Để hệ thống linh hoạt và dễ nâng cấp, tuyệt đối không được hard-code các thư viện cụ thể trực tiếp vào RAG pipeline. Bắt buộc phải triển khai qua các interface lớp trừu tượng (Abstractions):

- **DocumentParser Abstraction:**
  - Lớp base `DocumentParser` với phương thức `def parse(file_path: Path) -> NormalizedDocument`.
  - Mọi lớp cụ thể như `DoclingParser`, `HtmlParser`, `MarkdownParser` kế thừa từ `DocumentParser` và trả về duy nhất một cấu trúc `NormalizedDocument` gồm metadata và các blocks chuẩn hóa.
- **EmbeddingProvider Abstraction:**
  - Lớp base `EmbeddingProvider` định nghĩa `embed_query` và `embed_documents`.
  - Kế thừa cụ thể: `BGEEmbeddingProvider` (sử dụng SentenceTransformers local).
- **RerankerProvider Abstraction:**
  - Lớp base `RerankerProvider` định nghĩa `rerank(query, candidates)`.
  - Kế thừa cụ thể: `BGERerankerProvider`.

---

## 3. Quản lý Cơ sở dữ liệu & Đường dẫn lưu trữ (DB & Path Management)

- **OS-Specific Path Resolution:** Sử dụng module `pathlib.Path` và cơ chế tự động tìm thư mục dữ liệu cục bộ theo hệ điều hành (không được hard-code đường dẫn Windows):
  - Windows: `%LOCALAPPDATA%/Local-Notebook`
  - macOS: `~/Library/Application Support/Local-Notebook`
  - Linux: `~/.local/share/local-notebook`
- **SQLite Connection Management:** Sử dụng SQLAlchemy hoặc SQLModel để quản lý kết nối SQLite. Sử dụng transaction an toàn và cấu hình SQLite chạy ở chế độ WAL (Write-Ahead Logging) để tăng hiệu năng ghi song song.
- **LanceDB Connection:** Đảm bảo LanceDB được mở dưới dạng database file cục bộ (embedded) trỏ tới thư mục `/vector_store/` trong thư mục Home của người dùng.

---

## 4. Logging & Xử lý lỗi (Error Handling & Logging)

- **Centralized Logging:** Sử dụng module `logging` của Python. Log phải ghi rõ level (`INFO`, `WARNING`, `ERROR`) và thời gian cụ thể.
- **Không dùng print():** Tuyệt đối không dùng câu lệnh `print()` để log thông tin trong mã nguồn sản xuất, bắt buộc dùng `logger.info()` hoặc `logger.error()`.
- **Chống lỗi sập server đột ngột:** Bao bọc các khối xử lý file, kết nối mạng, hoặc AI inference bằng khối `try-except` chặt chẽ. Đảm bảo khi một file nạp bị lỗi, hệ thống phải cập nhật trạng thái `processing_status = "failed"` vào SQLite và tiếp tục xử lý các file khác thay vì làm treo hoặc sập toàn bộ FastAPI backend.
