# Version: 1.0.4 - 慧音社 (HUI YIN SEH) Frontend React Application

## 專案簡介 (Project Overview)
馬來西亞檳城慧音社 (HUI YIN SEH) 雙語官方網站與後台管理介面。採用 React (Vite)、JavaScript、SCSS 模組化極簡設計、React-Helmet-Async SEO 優化以及多語系 (i18n) 支援。

## 版本紀錄 (Version History)
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