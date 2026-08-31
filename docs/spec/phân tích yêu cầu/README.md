# Danh mục các Quyết định Thiết kế (Design Decisions Index) - Local NotebookLM

Để giữ tài liệu gọn gàng và dễ theo dõi, các quyết định kiến trúc đã được tách thành các tệp tin Markdown chuyên biệt dưới thư mục `plan/`.

Dưới đây là danh mục tổng hợp liên kết trực tiếp tới từng quyết định:

| Mã | Quyết định Thiết kế | Mô tả tóm tắt | Liên kết |
| :--- | :--- | :--- | :--- |
| **QD-01** | **Nền tảng & Kiến trúc phân phối** | Sử dụng Next.js/React + FastAPI chạy local & Electron sidecar. | [Chi tiết tại đây](./01_platform.md) |
| **QD-02** | **Định dạng & Parsing Abstraction** | Hỗ trợ PDF, TXT, MD, HTML qua `DocumentParser` (Docling, BS4). | [Chi tiết tại đây](./02_parsing.md) |
| **QD-03** | **Quản lý Model (LLM & Embeddings)** | Google AI Studio (khi online), tự động fallback về Ollama (khi offline); chạy BGE-M3 & Reranker local. | [Chi tiết tại đây](./03_models.md) |
| **QD-04** | **Notebooks & Ghi chú thủ công** | Quản lý dạng Dashboard, chỉ dùng ghi chú viết tay Markdown. | [Chi tiết tại đây](./04_notebook_notes.md) |
| **QD-05** | **Knowledge Graph & Cache** | Đồ thị trực quan tương tác & Cơ chế Cache theo Hash + Version. | [Chi tiết tại đây](./05_graph_cache.md) |
| **QD-06** | **Giao diện 3 Cột & Chat Modes** | Layout 3 cột, checkbox giới hạn scope & nút tối ưu câu trả lời (Concise). | [Chi tiết tại đây](./06_layout_modes.md) |
| **QD-07** | **Lưu trữ & SQLite Database Schema** | Lưu trữ tại thư mục Home của hệ thống, định nghĩa cấu trúc DB. | [Chi tiết tại đây](./07_persistence.md) |
| **QD-08** | **Kiến trúc Trích nguồn (Citation)** | Cơ chế bắt nguồn từ context và click để nhảy đến vị trí text gốc. | [Chi tiết tại đây](./08_citation.md) |
| **QD-09** | **Kiến trúc Wiki-Enhanced RAG** | Trích xuất tri thức 1 lần duy nhất lúc nạp file, tối ưu tài nguyên local. | [Chi tiết tại đây](./09_wiki_first.md) |

---
*Lưu ý: Bất kỳ thay đổi hoặc quyết định mới nào được thông qua trong quá trình thảo luận cũng cần được cập nhật vào tệp tin chi tiết tương ứng và phản ánh lại trong bảng danh mục này.*

| Mã | Độ ưu tiên | Quyết định Thiết kế | Trạng thái Đặc tả (Spec/SRS/SDD) | Liên kết |
| :--- | :---: | :--- | :---: | :--- |
| **QD-01** | **1** | **Nền tảng & Kiến trúc phân phối** | `[x]` Đã hoàn thành | [Chi tiết](./01_platform.md) \| [Đặc tả](./01_platform/) |
| **QD-07** | **2** | **Lưu trữ & SQLite Database Schema** | `[ ]` Chưa bắt đầu | [Chi tiết](./07_persistence.md) |
| **QD-02** | **3** | **Định dạng & Parsing Abstraction** | `[ ]` Chưa bắt đầu | [Chi tiết](./02_parsing.md) |
| **QD-09** | **4** | **Kiến trúc Wiki-Enhanced RAG** | `[ ]` Chưa bắt đầu | [Chi tiết](./09_wiki_first.md) |
| **QD-03** | **5** | **Quản lý Model (LLM & Embeddings)** | `[ ]` Chưa bắt đầu | [Chi tiết](./03_models.md) |
| **QD-08** | **6** | **Kiến trúc Trích nguồn (Citation)** | `[ ]` Chưa bắt đầu | [Chi tiết](./08_citation.md) |
| **QD-04** | **7** | **Notebooks & Ghi chú thủ công** | `[ ]` Chưa bắt đầu | [Chi tiết](./04_notebook_notes.md) |
| **QD-06** | **8** | **Giao diện 3 Cột & Chat Modes** | `[ ]` Chưa bắt đầu | [Chi tiết](./06_layout_modes.md) |
| **QD-05** | **9** | **Knowledge Graph & Cache** | `[ ]` Chưa bắt đầu | [Chi tiết](./05_graph_cache.md) |
