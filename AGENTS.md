# Giới thiệu Tổng quát Dự án Local-NotebookLM

**Local-NotebookLM** là một ứng dụng không gian tri thức cá nhân ngoại tuyến (Local Personal Knowledge Workspace), lấy cảm hứng từ Google NotebookLM nhưng được thiết kế để chạy **offline 100% cục bộ** trên máy tính cá nhân. Dự án tập trung giải quyết bài toán đọc, tìm kiếm ngữ nghĩa, hỏi đáp có trích nguồn chính xác và ghi chú thủ công mà không phụ thuộc vào bất kỳ dịch vụ Cloud hay API bên ngoài nào.

### Cấu trúc Công nghệ

- **Frontend:** Xây dựng bằng **Next.js / React** dưới dạng SPA tĩnh, giao diện tối ưu 3 cột (Tài liệu nguồn, Khung chat AI, Trình ghi chú thủ công).
- **Desktop Shell:** Đóng gói bằng **Electron** làm phần mềm Desktop cài đặt và chạy trực tiếp trên máy người dùng.
- **Backend (Sidecar):** **Python (FastAPI)** chạy dưới dạng tiến trình con (sidecar) của Electron để xử lý các tác vụ RAG nặng (Docling PDF parser, SQLite, LanceDB vector store, BGE Embeddings & Reranker).

### Nguyên lý RAG cốt lõi

Dự án sử dụng mô hình **Wiki-Enhanced / Hybrid RAG**:

- **Source is Ground Truth:** Văn bản gốc của tài liệu luôn là chân lý gốc của hệ thống.
- **Wiki as Semantic Layer:** AI quét tài liệu một lần khi nạp (Precompute Once) để trích xuất ra một lớp tri thức Wiki (Glossary, Summary, Key Facts, Core Q&As). Câu hỏi thông thường quét trên Wiki để phản hồi cực nhanh, tiết kiệm Token/VRAM local, và đối chiếu lại với tệp thô khi cần thông tin chi tiết.

---

> [!IMPORTANT]
> **Đối với AI Coding Agents:**
> Hãy đọc tài liệu quy chuẩn kỹ thuật và các quy tắc hoạt động chi tiết tại **[.ai/AGENTS.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/AGENTS.md)** trước khi triển khai bất kỳ thay đổi nào trong mã nguồn.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Local-Notebook** (1982 symbols, 1995 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
| ---------- | --------- |
| `gitnexus://repo/Local-Notebook/context` | Codebase overview, check index freshness |
| `gitnexus://repo/Local-Notebook/clusters` | All functional areas |
| `gitnexus://repo/Local-Notebook/processes` | All execution flows |
| `gitnexus://repo/Local-Notebook/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
| ------ | --------------------- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
