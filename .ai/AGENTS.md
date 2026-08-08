<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Local-Notebook** (6 symbols, 1 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

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
| Understand architecture / "How does X work?" | `.ai/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.ai/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.ai/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.ai/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.ai/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.ai/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

---

# Quy tắc & Quy chuẩn của Dự án Local-NotebookLM

Tất cả các AI Coding Agents khi làm việc trên codebase này **BẮT BUỘC** phải đọc và tuân thủ các quy tắc chi tiết sau đây trước khi triển khai bất kỳ đoạn code nào:

## 1. Định hướng & Scope Dự án

- **Next.js/React + Electron (Desktop Shell) + FastAPI (Python Backend Sidecar)**.
- Xây dựng hệ thống RAG offline local-first hỗ trợ tài liệu TXT, PDF, MD, HTML.
- Sử dụng mô hình **Wiki-Enhanced / Hybrid RAG**: Tài liệu gốc là chân lý (`Source = Ground Truth`), lớp Wiki đóng vai trò là lớp tăng tốc ngữ nghĩa được tính toán trước (`Precomputed Semantic Layer`).

## 2. Danh mục tài liệu Quy tắc chi tiết

Để xem các quy tắc code chi tiết theo ngôn ngữ và công cụ, hãy truy cập các tệp tin cấu hình dưới đây:

- [rules/01_scope_vision.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/rules/01_scope_vision.md): Định hướng sản phẩm, kiến trúc Wiki-Enhanced RAG, phân bổ context, và cơ chế an toàn `Evidence Confidence`.
- [rules/02_python_conventions.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/rules/02_python_conventions.md): Quy chuẩn code Python (FastAPI, Type Hints, async/await, Pydantic, abstractions).
- [rules/03_frontend_conventions.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/rules/03_frontend_conventions.md): Quy chuẩn code TS/JS, Next.js/React, Electron IPC, UI 3 cột, và bắt buộc thuộc tính `data-testid` để test UI.
- [rules/04_ai_tooling.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/rules/04_ai_tooling.md): Quy tắc tận dụng GitNexus (impact analysis, detect_changes) và cấu hình hooks (`pre-flight` & `post-tool-use`).
- [rules/access-control.md](file:///d:/Du_an_ca_nhan/Local-Notebook/.ai/rules/access-control.md): Quy chuẩn kiểm soát truy cập file local, bảo mật Electron, an toàn IPC và bảo mật localhost cho FastAPI backend.

