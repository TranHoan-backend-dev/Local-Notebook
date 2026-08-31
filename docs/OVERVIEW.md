# Tài liệu Tổng quan Dự án Local-NotebookLM (Workspace Overview)

## 1. Giới thiệu chung

**Local-NotebookLM** là một ứng dụng không gian tri thức cá nhân ngoại tuyến (Local Personal Knowledge Workspace), lấy cảm hứng từ Google NotebookLM nhưng được thiết kế linh hoạt cho phép chạy **offline cục bộ** trên máy tính cá nhân.

Mục tiêu chính của dự án là giải quyết bài toán đọc, tìm kiếm ngữ nghĩa, hỏi đáp có trích nguồn chính xác và ghi chú thủ công. Ứng dụng hỗ trợ sử dụng mô hình từ **Google AI Studio API** khi thiết bị có kết nối mạng để đạt hiệu năng tối đa, đồng thời tự động **fallback về mô hình LLM chạy cục bộ (local model)** khi mất kết nối mạng (offline), giúp đảm bảo tính riêng tư dữ liệu và khả năng hoạt động liên tục.

Phạm vi tập trung vào:

- Import và đọc tài liệu.
- Hỏi đáp dựa trên tài liệu.
- Tổng hợp nội dung từ nhiều tài liệu.
- Ghi chú và tóm tắt.
- Trả lời có citation/source.
- Quản lý nhiều notebook.
- Có thể mở rộng thành knowledge graph.

Không ưu tiên các tính năng như:

- Podcast.
- PowerPoint.
- Video.
- Các tính năng multimedia không cần thiết.

---

## 2. Kiến trúc Hệ thống (System Architecture)

Ứng dụng được thiết kế theo mô hình **Desktop/Web App + Python Sidecar** để đảm bảo khả năng đóng gói cài đặt dễ dàng và hiệu năng xử lý RAG tối ưu.

```text
       ┌────────────────────────────────────────────────────────┐
       │                 Interface SHELL                        │
       │                                                        │
       │  ┌───────────────────────┐      ┌───────────────────┐  │
       │  │   Frontend (Next.js)  │ ◄───►│ Electron Main     │  │
       │  │   SPA (UI 3 cột)      │      │ (Process manager) │  │
       │  └───────────────────────┘      └─────────┬─────────┘  │
       └──────────────┬────────────────────────────┼────────────┘
                      │                            │
                      │ API Requests               │ Spawns & Monitors
                      ▼                            ▼
       ┌────────────────────────────────────────────────────────┐
       │                    PYTHON SIDECAR                      │
       │                                                        │
       │  ┌───────────────────────┐      ┌───────────────────┐  │
       │  │   FastAPI Server      │      │ Docling Parser    │  │
       │  └───────────┬───────────┘      └───────────────────┘  │
       │              │                                         │
       │              ▼                                         │
       │  ┌───────────────────────┐      ┌───────────────────┐  │
       │  │   LanceDB / Qdrant    │      │ SQLite (Metadata) │  │
       │  │   (Vector DB)         │      └───────────────────┘  │
       │  └───────────────────────┘                             │
       └────────────────────────────────────────────────────────┘
```

- **Frontend (Next.js / React):** Được xây dựng dưới dạng SPA tĩnh (Static Single Page Application). Giao diện tối ưu hóa 3 cột:
    1. **Tài liệu nguồn:** Quản lý danh sách file, thư mục tài liệu nạp vào.
    2. **Khung chat AI:** Trò chuyện, hỏi đáp và hiển thị câu trả lời kèm citation trực quan.
    3. **Trình ghi chú thủ công:** Soạn thảo bằng Markdown, cho phép người dùng tự do lưu lại các ý tưởng quan trọng.
- **Desktop Shell (Electron):** Đóng gói ứng dụng để cài đặt và chạy trực tiếp trên máy người dùng. Electron Main process sẽ quản lý vòng đời và tự động khởi động Backend Python Sidecar.
- **Backend Sidecar (Python FastAPI):** Thực thi các tác vụ RAG nặng như phân tích cú pháp tài liệu (Parsing), nhúng vector (Embedding), tìm kiếm lai (Hybrid Retrieval), Reranking và sinh câu trả lời bằng LLM cục bộ (thông qua Ollama hoặc llama.cpp serving).

---

## 3. Nguyên lý Wiki-Enhanced / Hybrid RAG

Dự án áp dụng nguyên lý **Wiki-Enhanced / Hybrid RAG** để cân bằng giữa hiệu năng của máy tính cá nhân và độ chính xác của tri thức:

- **Source Document = Ground Truth:** Tài liệu gốc là chân lý gốc. Hệ thống luôn đối chiếu dữ liệu thô khi cần trích dẫn cụ thể (Evidence / Citation).
- **Wiki/Knowledge Layer = Precomputed Semantic Layer:** Lớp ngữ nghĩa được tính toán trước một lần duy nhất lúc nạp tài liệu (**Precompute Once**). AI sẽ đọc tài liệu để trích xuất ra một bộ Wiki tri thức bao gồm:
  - **Glossary:** Định nghĩa các thuật ngữ chuyên ngành, từ viết tắt.
  - **Section Summaries:** Tóm tắt phân đoạn chương/mục lớn có độ dài thích ứng.
  - **Key Facts:** Số liệu thống kê, sự kiện hoặc mốc thời gian cốt lõi.
  - **Core Q&As:** Các câu hỏi và câu trả lời dự đoán trước của tài liệu.
- **LLM = Answer Generator, not Source of Truth:** Mô hình LLM cục bộ chỉ đóng vai trò tổng hợp và biên soạn câu trả lời dựa trên context được cung cấp thay vì tự suy diễn hay bịa đặt.

---

## 4. Quy trình Xử lý Tài liệu & Truy vấn (Ingestion & Query Pipeline)

```text
                  [Nạp Tài Liệu]
                        │
                        ▼
               Parse / OCR (Docling)
                        │
                        ▼
              Document Structuring
                        │
                        ▼
             Semantic Chunking (Heading)
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        Embedding Vector      Metadata Index
       (BGE-M3 / LanceDB)        (SQLite)
             │                     │
             └──────────┬──────────┘
                        ▼
                  [Truy Vấn User]
                        │
                        ▼
                 Query Rewriting
                        │
                        ▼
             Hybrid Retrieval Route
             (Wiki Search + Source Search)
                        │
                        ▼
               Reranker (BGE Rerank)
                        │
                        ▼
              Evidence Confidence Check
                        │
                        ▼
               Context Compression
                        │
                        ▼
          Google AI Studio / Local LLM
                        │
                        ▼
             Trích xuất nguồn & Trả lời
```

### Các bước tối ưu hóa nâng cao

1. **Document Structuring:** Sử dụng **Docling** giữ lại toàn bộ cấu trúc định dạng của PDF (bảng biểu, danh sách, code block, caption, số trang) để hỗ trợ Citation chính xác thay vì chỉ lấy văn bản thô.
2. **Evidence Confidence (Độ tin cậy của bằng chứng):** Nếu độ tương đồng của kết quả tìm kiếm thấp hơn ngưỡng quy định (ví dụ: < 0.4), hệ thống sẽ ngắt và LLM trả lời *"Không tìm thấy đủ thông tin..."* để chống ảo tưởng (hallucination).
3. **User Edit Protection:** Khi người dùng trực tiếp sửa đổi các mục trong Knowledge Layer (Wiki), hệ thống đánh dấu cờ `modified_by_user = true` để giữ nguyên các sửa đổi này khi thực hiện re-index tài liệu.
4. **Backend Citation Validation:** Quá trình ánh xạ citation được thực hiện hoàn toàn ở Backend để validate trước khi gửi lên UI, tránh việc Frontend tự sinh nhãn liên kết bừa bãi.
5. **Multi-layer Cache:** Lưu cache các bước xử lý parsing, embedding, tóm tắt và câu hỏi thường gặp để nâng cao tốc độ phản hồi cục bộ.

---

## 5. Stack Công nghệ Đề xuất

| Thành phần | Lựa chọn Công nghệ |
| :--- | :--- |
| **Frontend Framework** | Next.js / React (SPA) |
| **Desktop Shell** | Electron |
| **Backend Framework** | Python FastAPI |
| **Parser & OCR** | Docling (kèm Tesseract / PaddleOCR) |
| **Embedding Model** | BGE-M3 |
| **Vector DB** | LanceDB / Qdrant |
| **Metadata DB** | SQLite |
| **Reranker** | BGE Reranker |
| **LLM Local Serving** | Ollama / llama.cpp / vLLM |
| **Mô hình LLM khuyên dùng** | Qwen 2.5/3, Llama 3, Gemma 2, Mistral, DeepSeek Distill |

## 6. Cấu trúc Metadata & Chunking phân cấp

Hệ thống không parse tài liệu thành văn bản thuần đơn giản rồi chia đều theo số lượng token cố định. Để bảo toàn cấu trúc tài liệu phục vụ việc hiển thị và trích dẫn chính xác, quá trình chunking tuân theo ranh giới ngữ nghĩa và cấu trúc phân cấp:

```text
Document (Tài liệu)
 └── Chapter (Chương)
      └── Section (Phân đoạn / Mục)
           └── Paragraph / Table / List / Code Block (Mục nhỏ)
```

Mỗi chunk được lưu kèm metadata phong phú nhằm phục vụ tối ưu cho quá trình tìm kiếm và trích nguồn. Một ví dụ tiêu biểu về metadata của một chunk:

```json
{
  "document_id": "doc_networking_01",
  "document_name": "networking.pdf",
  "page_number": 15,
  "chapter": "HTTP Protocol",
  "heading": "HTTP Methods",
  "chunk_type": "paragraph",
  "content": "HTTP sử dụng port 80 theo mặc định để truyền thông điệp văn bản thuần giữa Client và Server.",
  "chunk_id": "chunk_http_methods_003"
}
```

---

## 7. Làm giàu Siêu dữ liệu (Metadata Enrichment)

Sau khi tài liệu được parse và chunking thành công, hệ thống sẽ sử dụng LLM chạy một lần duy nhất lúc nạp tài liệu (Precompute Once) để phân tích ngữ cảnh và làm giàu siêu dữ liệu cho cả tài liệu và từng phân đoạn (Section). Kết quả phân tích được lưu trữ trong SQLite dưới dạng một lớp tri thức ngữ nghĩa:

- **Tóm tắt đa cấp độ (Hierarchical Summary):** Tự động sinh tóm tắt từ dưới lên (Paragraph -> Section -> Document).
- **Danh sách Thực thể (Entities) & Chủ đề (Topics):** Trích xuất tên riêng, công nghệ, khái niệm cốt lõi phục vụ liên kết thực thể (Entity Resolution).
- **Bảng thuật ngữ (Glossary):** Định nghĩa nhanh thuật ngữ chuyên ngành viết tắt xuất hiện trong file.
- **Hỏi đáp cốt lõi (Core Q&As):** Dự đoán trước một số câu hỏi phổ biến kèm câu trả lời tương ứng để phản hồi siêu tốc khi người dùng truy vấn trùng khớp.

---

## 8. Hỏi đáp Đa bước (Multi-step Retrieval)

Với các câu hỏi phức tạp (cần so sánh, suy luận logic hoặc tổng hợp thông tin từ nhiều tài liệu khác nhau), hệ thống không chỉ thực hiện một lượt tìm kiếm duy nhất. Quy trình Multi-step Retrieval sẽ được kích hoạt:

```text
               [Câu hỏi phức tạp của User]
                            │
                            ▼
                    Lượt tìm kiếm thứ 1
                            │
                            ▼
              LLM phân tích thông tin thu được
                 & xác định dữ liệu còn thiếu
                            │
                            ▼
                    Lượt tìm kiếm thứ 2
                            │
                            ▼
                     Gộp ngữ cảnh lai
                            │
                            ▼
                   Sinh câu trả lời cuối
```

Cơ chế này chỉ kích hoạt khi hệ thống nhận diện câu hỏi có mức độ phức tạp cao hoặc khi người dùng yêu cầu phân tích chéo tài liệu trên giao diện UI.

---

## 9. Quản lý Bộ nhớ Hội thoại (Conversation Memory)

Để tránh hiện tượng tràn cửa sổ ngữ cảnh (context window) của các mô hình LLM local (thường bị giới hạn tài nguyên) và duy trì mạch trò chuyện trôi chảy, hệ thống áp dụng cơ chế quản lý bộ nhớ thông minh:

- **Nén lịch sử hội thoại (Conversation Summary):** LLM chạy ngầm sẽ tóm tắt định kỳ lịch sử chat trước đó thành một đoạn mô tả ngắn gọn.
- **Bộ nhớ ngắn hạn (Recent Messages):** Giữ lại chính xác nội dung của một vài câu thoại gần nhất (ví dụ: 3-5 câu thoại gần nhất) để giữ độ chi tiết.
- **Truyền Context tích hợp:** Context gửi đến LLM sẽ là sự kết hợp giữa: `[Tóm tắt lịch sử cũ] + [Các tin nhắn chi tiết gần nhất] + [Câu hỏi hiện tại đã được viết lại (Query Rewrite)]`.

---

## 10. Hệ thống Cache Đa tầng (Multi-layer Cache)

Hoạt động hoàn toàn local yêu cầu ứng dụng phải tiết kiệm tối đa tài nguyên và tăng tốc độ xử lý. Hệ thống xây dựng 6 cấp độ cache độc lập:

1. **Document Parse Cache:** Lưu trữ kết quả phân tích cấu trúc của Docling. Tránh parse lại tệp gốc nếu mã băm file (`document_hash`) không đổi.
2. **Embedding Cache:** Không tạo lại vector nhúng cho chunk nếu nội dung chunk đó không có sự thay đổi.
3. **Metadata & Summary Cache:** Lưu tóm tắt tài liệu theo phiên bản prompt và phiên bản mô hình LLM. Chỉ tạo lại tóm tắt khi thay đổi prompt hoặc mô hình.
4. **Retrieval Cache:** Cache kết quả truy vấn tìm kiếm nếu câu hỏi mới tương tự câu hỏi cũ.
5. **Answer Cache:** Lưu câu trả lời từ LLM cho các câu hỏi hoàn toàn trùng lặp.

---

## 11. Tri thức cấp Notebook & Đồ thị Kiến thức (Knowledge Graph)

- **Notebook-level Knowledge:** Hệ thống tổng hợp tri thức ở mức độ toàn bộ không gian làm việc (Notebook) thay vì chỉ xem xét từng file riêng lẻ. Bao gồm: tổng hợp mối quan hệ giữa các tài liệu, danh sách chủ đề chung, và bảng thuật ngữ toàn cục.
- **Biểu đồ Tri thức nhẹ (Knowledge Graph):** Lưu trữ và trực quan hóa các thực thể dưới dạng các Node và quan hệ dưới dạng Edge trong SQLite.
  - *Ví dụ:* `[Thực thể A] -- (được nhắc đến trong) --> [Tài liệu B]`, `[Thực thể A] -- (có quan hệ với) --> [Thực thể C]`.
  - Biểu đồ tri thức hoạt động bổ trợ trực tiếp cho Vector Search, giúp tìm kiếm ngữ cảnh liên đới cực kỳ hiệu quả khi người dùng muốn khám phá bức tranh tri thức toàn cảnh.
