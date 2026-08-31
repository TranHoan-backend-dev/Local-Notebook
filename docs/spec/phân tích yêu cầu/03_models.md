# Quyết định 3: Phương thức kết nối & Quản lý Model (LLM, Embedding, Reranker)

### Nỗi đau người dùng

Người dùng chạy ứng dụng local thường bị giới hạn bởi phần cứng máy tính (VRAM/GPU yếu). Nếu ép buộc họ tải các mô hình cực lớn hoặc bắt họ tự cấu hình code phức tạp để chạy AI thì họ sẽ từ bỏ. Họ cần sự linh hoạt để tận dụng phần cứng có sẵn (như Ollama) hoặc kết nối tới các server AI mạnh hơn bên ngoài khi cần.

### Yêu cầu làm rõ

Quyết định cơ chế kết nối với mô hình ngôn ngữ (LLM) bao gồm cả dịch vụ đám mây (Google AI Studio API) và các mô hình chạy cục bộ (Ollama, v.v.), cùng các mô hình hỗ trợ (Embedding, Reranker) chạy cục bộ.

### Quyết định kỹ thuật

1. **Kết nối LLM & Cơ chế tự động Fallback:**
   - **Chế độ Online (Có kết nối mạng):** Ưu tiên sử dụng mô hình qua **Google AI Studio API (Gemini)** thông qua API Key được cấu hình trong cài đặt ứng dụng nhằm tăng tốc độ phản hồi và tối đa chất lượng câu trả lời.
   - **Chế độ Offline (Mất kết nối mạng / Fallback):** Tự động phát hiện mất mạng và chuyển hướng (fallback) về sử dụng các mô hình chạy cục bộ.
     - **Mặc định (Default Local):** Tích hợp sâu với **Ollama** qua API cục bộ (`http://localhost:11434`). Hỗ trợ tự động lấy danh sách model hiện có trong Ollama để lựa chọn trên giao diện.
     - **Mở rộng (Custom Local):** Hỗ trợ cấu hình kết nối qua cổng tương thích **OpenAI API** (LM Studio, vLLM, KoboldCPP, hoặc API Cloud tùy chọn).
2. **Mô hình Embedding & Reranker Abstraction:**
   - Tạo các lớp Abstraction `EmbeddingProvider` và `RerankerProvider` để dễ dàng nâng cấp/benchmark các model khác nhau độc lập với RAG pipeline.
   - **Mặc định (Default):** Chạy trực tiếp các mô hình nhỏ này trong Backend Python qua thư viện **SentenceTransformers** (tận dụng CPU hoặc CUDA/MPS nếu có GPU):
     - **Embedding Model:** Mô hình đa ngôn ngữ chuyên biệt **BAAI/bge-m3** để biểu diễn văn bản tối ưu cho tiếng Việt.
     - **Reranker Model:** Mô hình **BAAI/bge-reranker-v1.5-mini** để sắp xếp lại độ liên quan của các chunks ngữ cảnh trước khi gửi tới LLM.
