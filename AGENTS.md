# AI Copilot Agents Configuration (Hui Yin Seh Project)

This project is developed by a single developer and an AI Copilot. The AI MUST strictly adhere to the following roles, behavioral guidelines, and execution rules.

## 1. Behavioral Guidelines (Reduce LLM Coding Mistakes)

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1.1 Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- **If you do not fully understand the user's expression or intent, you MUST confirm via Q&A. Do not guess blindly.**

### 1.2 Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 1.3 Surgical Changes
**Touch only what you must. Clean up only your own mess.**
- When editing existing code: Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken. Match existing style.
- If you notice unrelated dead code, mention it - don't delete it.
- When your changes create orphans: Remove imports/variables/functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked.
- The test: Every changed line should trace directly to the user's request.

### 1.4 Goal-Driven Execution
**Define success criteria. Loop until verified.**
- Transform tasks into verifiable goals (e.g., "Add validation" → "Write tests for invalid inputs, then make them pass").
- For multi-step tasks, state a brief plan before execution:
  `1. [Step] → verify: [check]`

---

## 2. Agent Skill & Token Optimization

### 2.1 Mandatory RTK Command Execution
- **When:** Under all conditions, for ANY command execution or task execution in the terminal.
- **Action:** Every single terminal command MUST be prefixed with `rtk` (e.g., `rtk npm run build`, `rtk php`, `rtk git`, `rtk npx sass ...`).
- **Fallback:** If `rtk` fails or is not applicable, notify the user.

### 2.2 Q&A Confirmation (Clarification Protocol)
- **Trigger:** Instructions are ambiguous, contradictory, missing parameters, or out of scope.
- **Rule:** **Never guess** – always ask specific, bulleted questions.

### 2.3 Auto-build Verification (For `hys` Frontend Repo)
- **After every code change:** Run `rtk npm run build`.
- **On failure:** Auto-fix errors and rebuild until success.
- **Escalation:** If repeated failures, report error log and wait for user.

### 2.4 Style Modification (SCSS Only - `hys` Frontend Repo)
- **Allowed location:** `src/assets/scss/` (e.g., `main.scss`).
- **Prohibited:**
  - `style` attribute in HTML/JSX (NO inline CSS).
  - Direct edit of `src/assets/css/main.css`.
  - JS-based viewport detection for styling.
- **Responsive:** Use **nested media queries** inside selectors (Mobile-first).
- **Compile:** After changes, run: `rtk npx sass src/assets/scss/main.scss src/assets/css/main.css`
- **Verify:** Check mobile, tablet, desktop viewports before commit.

### 2.5 Automated API Documentation Update (`hys_api` Backend Repo)
- **Scope:** Any API-related code change.
- **Target:** `docs/api_docs.html` (or project equivalent).
- **Content:** Include path, method, params, response samples, error codes, env vars.
- **Timing:** Update before Git commit.

### 2.6 Auto Git Commit & Push
- **Precondition (Frontend):** `rtk npm run build` passes with no errors.
- **Remote Target:** - Frontend Repo: `git@github.com:PutoLim0226/hys.git`
  - Backend Repo: `git@github.com:PutoLim0226/hys_api.git`
- **Pre-approved commands (no user confirmation):**
  - `rtk git pull`
  - `rtk npm run build` (if applicable)
  - `rtk git status`
  - `rtk git add .`
  - `rtk git commit -m "Auto-commit: <summary>"`
  - `rtk git push`
- **Flags:** Always add `--dangerously-skip-permissions` and `--auto-approve`.

### 2.7 README.md Synchronization & Versioning
- **Sync:** The `README.md` in the root directory of the current repository MUST be updated synchronously with code/feature iterations.
- **Versioning:**
  - Start initial version at `1.0.0`.
  - Increment the version number (e.g., `1.0.0` -> `1.0.1`) in the `README.md` whenever configurations or features change.
  - The version number MUST be clearly marked at the top of the document.

### 2.8 Deployment & Environment Constraints
- **Netlify Removed:** Do NOT perform Netlify deployment or Netlify-specific proxy checks (Netlify integration has been completely removed to prevent credit exhaustion).
- **Environment:** Develop and test locally via Vite dev server (`http://localhost:3000`) and local PHP server (`http://localhost:8000`), or via direct server target.
- **Automated AGENTS.md Sync:** `AGENTS.md` is automatically reviewed and updated daily at 10:00 AM to keep project specifications accurate.

---

## 3. Tech-Specific Agents Execution Rules

### 3.1 Frontend React Agent (Operates in `hys` repository)
- **Tech Stack:** React (Vite), JavaScript, SCSS, React-Helmet-Async, i18n.
- **Duties:**
  - Build Client and Admin UI components (Theme: Orange & White).
  - Implement Light/Dark Mode via CSS variables.
  - Inject dynamic SEO metadata (`<title>`, `<meta>`, OG tags).
  - Pre-validate file sizes (max 2MB) and MIME types before API submission.

### 3.2 Backend PHP Agent (Operates in `hys_api` repository)
- **Tech Stack:** Native PHP, MySQL, PDO, GD Library.
- **Duties:**
  - Build RESTful APIs outputting standard JSON (`{"status": "success", "data": [...]}`).
  - strictly use PDO Prepared Statements for ALL database interactions.
  - **File Upload Security:** Validate MIME types (jpg/png/webp only) server-side.
  - **Image Processing:** Auto-compress images using GD Library, restrict max dimensions, and force `.webp` format storage.
  - Auto-generate a dynamic `sitemap.xml` for front-end SEO crawling.