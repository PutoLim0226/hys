# Version: 1.1.2 - 慧音社 (HUI YIN SEH) Frontend React Application

## 專案簡介 (Project Overview)
馬來西亞檳城慧音社 (HUI YIN SEH) 雙語官方網站與後台管理介面。採用 React (Vite)、JavaScript、SCSS 模組化極簡設計、React-Helmet-Async SEO 優化以及多語系 (i18n) 支援。

## 版本纪录 (Version History)
- **1.1.2**: 全站程式碼品質稽核修復（i18n / SCSS / RWD）：補齊所有缺失與硬編碼之 i18n 語系鍵值（支援參數插值）、全面清除 61 處 Inline CSS 並收斂至 `main.scss`、補齊 576px / 768px / 992px / 1200px 響應式斷點與彈性換行規則以解決手機版破版與溢位問題。
- **1.1.1**: 新增志工報名名額控管與候補機制 (Waitlist)，報名成功提供 QR Code 憑證，並擴充表單支援服務時段與意向組別。後台新增對應的狀態篩選與手動報到功能。
- **1.1.0**: 修复 Netlify 反向代理 Port 8080 端口错误：修正 `netlify.toml` 与 `public/_redirects` 中 `/api/*` 转发目标地址至 `http://45.32.25.8:8080/api/:splat`，解决线上环境 404 Route not found 报错。
- **1.0.9**: 新增後台表格通用元件：包含 `useTablePagination` 自訂 Hook 與可重用 `Pagination` 分頁控制條元件；於 AdminNews 新增即時標題/內容搜尋、分類下拉選單、狀態篩選與動態分頁功能。
- **1.0.8**: 修复 `res.ok` 在解析后的 JSON 对象中未定义导致生产环境 Netlify 代理 API 无法正确跳转至控制台的问题 (修复 AdminLogin 与 Volunteer 登录/提交状态)。
- **1.0.7**: 修复排版设计，完全恢复原始高质感样式，取消所有 bootstrap 冲突网格；所有文字已强制繁体转为简体中文，确保用词准确。
- **1.0.6**: 完成階段六 (Stage 6) API 整合與測試。建立 `src/api/client.js` 集中封裝 `fetch` 邏輯與錯誤處理，並加入防快取 (Cache-Control) 標頭。全站程式碼重構完畢，確保每個元件行數低於 300 行限制。
- **1.0.5**: 完成階段五 (Stage 5) 重構，模組化 `AdminHeader` 及 `AdminKpiCards`，並針對所有管理員頁面實行 300 行以下程式碼重構；完善管理員角色權限控制 (Role-based access)。
- **1.0.4**: 設定 Netlify 反向代理 `/api/*` 至 Vultr 伺服器 IP (`http://45.32.25.8/api/:splat`)，解決前端 HTTPS 與 IP 後端連線與 API CRUD 操作。
- **1.0.3**: 新增 Netlify SPA 路由重定向設定 (`_redirects` 與 `netlify.toml`)，解決 Netlify 部署後直接訪問或重新整理 `/admin` 等子路由出現 404/無法呈現的問題。
- **1.0.2**: 完成 PRD v2.0 產品需求升級規劃——包含活動名額與進度條、一鍵加入 Google/Apple 日曆、PDF 電子收據下載、前台捐款徵信與匿名功能、FB/WhatsApp/Telegram 社群分享卡片、全站雙語搜尋、動態 CSV 檔名與慧音社 12 大幹部職務權限分級 (RBAC)。
- **1.0.1**: 更新品牌 Logo 處理（去除背景透明化 PNG 與獨立 RWD 響應式尺寸控制），更新 SVG Favicon 圖示，全面清除全站硬編碼假資料 (Mock Data)，完善真實 API 狀態處理與數據填充。
- **1.0.0**: 初始版本發布。完成響應式前台（首頁、關於我們、活動與最新消息、線上捐款、志工招募、聯絡我們）以及後台管理系統（權限認證、最新消息 CMS、捐款對帳、志工審核）。

## 技術細節與規範 (Tech Stack & Rules)
- **核心框架:** React 18 (Vite)
- **樣式 (Styling):** SCSS (`src/assets/scss/main.scss` 編譯至 `src/assets/css/main.css`)，嚴格遵守無 Inline CSS 規範
- **主題 (Theme):** Light / Dark 亮暗色模式切換 (CSS Variables)
- **多語系 (i18n):** 簡體中文 (`zh-CN`) 與 英文 (`en`)
- **SEO 標籤:** `react-helmet-async` 動態生成 Title, Description 及 Open Graph
- **檔案上傳:** 前端限制檔案大小 max 2MB 及格式 (JPG/PNG/WEBP)

## 編譯與建置指令 (Scripts)
- SCSS 編譯: `rtk npx sass src/assets/scss/main.scss src/assets/css/main.css`
- 前端建置驗證: `rtk npm run build`