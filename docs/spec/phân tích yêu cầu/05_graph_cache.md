# Quyết định 5: Giao diện mạng lưới tri thức trực quan (Knowledge Graph) & Cơ chế Cache hiệu năng

### Nỗi đau người dùng

Khi nghiên cứu một lượng tài liệu khổng lồ, người dùng rất khó để hình dung các khái niệm và tài liệu liên kết với nhau như thế nào nếu chỉ đọc text thuần. Ngoài ra, việc nạp lại một file cũ mà máy tính cứ phải chạy parse và tạo vector embedding từ đầu rất mất thời gian (có thể mất 5-10 phút cho một cuốn sách dài), gây ức chế cực kỳ lớn.

### Yêu cầu làm rõ

Quyết định hình thức hiển thị của mạng lưới tri thức (Knowledge Graph) và phương án tối ưu hóa hiệu năng thông qua bộ nhớ đệm (Cache) trên máy cục bộ.

### Quyết định kỹ thuật

1. **Trực quan hóa Mạng lưới tri thức (Visual Knowledge Graph):**
   - **Giao diện người dùng (Frontend):** Tích hợp màn hình hiển thị đồ thị tương tác (sử dụng thư viện React phù hợp như `react-force-graph` hoặc `vis.js`). Trực quan hóa liên kết giữa các tài liệu, các thực thể chính (Entities) và các chủ đề (Topics) xuất hiện trong Notebook ở mức độ tối giản.
   - **RAG Integration:** Knowledge Graph đóng vai trò là nguồn kiến trúc bổ trợ thông tin quan hệ khi người dùng query, không thay thế hoặc làm nhiễu pipeline tìm kiếm chính (Vector Search + BM25).
2. **Cơ chế Cache tối ưu & Phiên bản hóa Cache (Cache Versioning):**
   - **File Hash Caching:** Khi người dùng tải lên tài liệu, hệ thống sử dụng thuật toán hash SHA-256 để kiểm tra tệp tin.
   - **Cache Key bao gồm:** `file_hash` + `parser_version` + `chunker_version` + `embedding_model` + `embedding_model_version`. Nếu trùng khớp key, hệ thống lấy dữ liệu text đã parse và vector embeddings từ database ra sử dụng ngay, bỏ qua toàn bộ quá trình xử lý.
   - **Các thực thể Cache độc lập:** Cho phép cache độc lập từng bước trong pipeline xử lý: Parsed Documents, Chunks, Embeddings, Summaries.
