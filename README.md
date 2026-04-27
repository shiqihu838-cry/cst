# CST App-Simulator Framework

这个目录采用“一个页面一个 HTML + CSS/JS 分层目录”的轻量结构，方便你逐页迁移和维护。

## 目录说明（简化版）

- `index.html`：默认入口页（可直接作为首页，或跳转到 `pages/home.html`）
- `pages/`：所有业务页面（一个页面一个 HTML）
- `css/`：样式目录
  - `reset.css`：全局重置
  - `global.css`：全局样式
  - `components/`：可复用组件样式（如 tab-bar/header/card）
- `js/`：脚本目录
  - `global.js`：全局脚本
  - `components/`：可复用组件脚本（如 tab-bar）
- `assets/`：静态资源目录
  - `images/`：页面图片、图标、背景图
  - `fonts/`：字体文件
- `intake/raw-snippets/`：你每次粘贴代码后的暂存区
- `migration-docs/`：迁移记录、页面映射、决策日志

## 迁移规则（固定流程）

1. 你贴代码给我。
2. 我先判断代码属于哪个模块（页面/组件/样式/脚本）。
3. 我解释这段代码的意义和风险点（会不会覆盖、丢字段、改行为）。
4. 你确认后，我才把它放入新框架对应目录。
5. 每次迁移都会更新 `migration-docs/page-map/pages-registry.json` 和决策日志。

## 页面命名规范（一个页面一个 HTML）

- 页面文件采用 `kebab-case`，例如：`phone-verify.html`、`square-nearby.html`。
- 页面共享样式优先放在 `css/global.css` 和 `css/components/`。
- 页面共享脚本优先放在 `js/global.js` 和 `js/components/`。
- 手机全屏与网页预览都使用同一套页面文件，不再拆双目录。

## 下一步

请开始贴第一段代码（或贴第一个旧页面文件内容）。我会先做归类和说明，确认后再落盘。
