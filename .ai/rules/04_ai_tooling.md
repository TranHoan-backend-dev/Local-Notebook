# Quy chuẩn 04: Quy tắc sử dụng Tooling & GitNexus (AI Tooling Rules)

Tài liệu này quy định cách thức AI Coding Assistant bắt buộc phải sử dụng các công cụ phân tích mã nguồn (GitNexus), hooks tự động và quản lý tài nguyên khi làm việc trên codebase.

---

## 1. Quy tắc sử dụng công cụ phân tích tác động GitNexus (Impact Analysis)

Để tránh gây lỗi lan truyền (regression bugs) khi chỉnh sửa các lớp, biến, hoặc hàm dùng chung:

- **MUST RUN impact() before editing any symbol:** AI bắt buộc phải chạy lệnh phân tích tác động trước khi sửa đổi bất kỳ hàm/biến/class nào.
  - Sử dụng: `impact({target: "symbolName", direction: "upstream"})`
  - Đánh giá blast radius: Báo cáo lại cho người dùng phạm vi bị ảnh hưởng (các hàm gọi nó, các tiến trình bị liên đới) và mức độ rủi ro.
- **MUST warn the user on high risk:** Nếu kết quả phân tích tác động của GitNexus trả về mức độ rủi ro **HIGH** hoặc **CRITICAL**, AI phải lập tức cảnh báo người dùng và đề xuất phương án refactor an toàn trước khi tiến hành code.
- **MUST RUN detect_changes() before commit:** Trước khi tạo commit hoặc kết thúc task, AI phải chạy `detect_changes({scope: "compare", base_ref: "main"})` để kiểm tra các file đã chỉnh sửa có nằm trong phạm vi cho phép và không gây ra thay đổi ngoài mong muốn.

---

## 2. Quy trình kích hoạt Hooks tự động (.ai/hooks)

Chúng ta sử dụng các script trong `.ai/hooks/` để kiểm tra tự động trước và sau khi AI chạy bất kỳ tool nào:

- **Pre-flight Check (`pre-flight.ps1` / `pre-flight.sh`):**
  - AI chạy kiểm tra môi trường local (phiên bản node, python, các thư viện cần thiết) trước khi thực thi các lệnh terminal thay đổi file hệ thống.
- **Post-tool-use Check (`post-tool-use.ps1` / `post-tool-use.sh`):**
  - Tự động kích hoạt kiểm tra chất lượng code (`pnpm lint`, `ruff check` hoặc `black --check`) ngay sau khi AI thực hiện chỉnh sửa file code để phát hiện và sửa nhanh lỗi cú pháp (syntax/lint errors).

---

## 3. Quản lý Context & Tiết kiệm Token (Token Saving Strategy)

Vì ứng dụng hoạt động local và context của LLM có hạn:

- **Token Saving Strategy:** AI tuân thủ cấu hình `"token_saving_strategy": "summarize_inactive_files"` trong `.ai/settings.json`.
- **Tối ưu hóa context:**
  - Chỉ đọc các file thực sự cần thiết bằng cách sử dụng `view_file` có giới hạn dòng (`StartLine` và `EndLine`).
  - Sử dụng `grep_search` để tìm chính xác vùng code cần sửa thay vì đọc toàn bộ thư mục lớn một cách bừa bãi.
  - Tóm tắt ngắn gọn các file cấu hình lớn hoặc không hoạt động để giữ cửa sổ ngữ cảnh LLM luôn sạch sẽ và phản hồi nhanh chóng.
