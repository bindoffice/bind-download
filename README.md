# BindOffice 下载中心

BindOffice 官方下载官网 —— 包含**邮箱（BindMail）**与**会议（BindMeet）**两个应用的下载入口，支持 Android / iOS，点击按钮或扫码即可下载。

- 主色：科技蓝 · 辅色：白色
- 纯 HTML / CSS / JS，无框架、无构建步骤
- 二维码库已内置（`js/qrcode.min.js`），**无任何外部依赖**，离线也能用
- **中英文双语**：右上角语言按钮一键切换，自动记忆选择，英文环境浏览器默认显示英文
- 可直接部署到 GitHub Pages
- 已配置自定义域名 `download.bindoffice.com`（见下方说明）

## 文件结构

```
bind-download/
├── index.html          # 页面主体
├── css/
│   └── style.css       # 全部样式（蓝色科技风）
├── js/
│   ├── main.js         # 交互逻辑 + 下载链接配置
│   └── qrcode.min.js   # 二维码生成库（内置，无需联网）
└── README.md
```

## 修改下载链接

打开 `js/main.js`，编辑文件顶部的 `DOWNLOAD_LINKS` 配置即可，页面上的按钮、二维码会同步生效：

```js
var DOWNLOAD_LINKS = {
  mail: {                       // BindMail 必得邮箱
    android: "https://play.google.com/store/apps/details?id=com.bindoffice.mail",
    ios:     "https://apps.apple.com/app/id6788962946"
  },
  meet: {                       // BindMeet 必得会议
    android: "https://play.google.com/store/apps/details?id=com.bindoffice.meet",
    ios:     "https://apps.apple.com/app/id6797494502"
  }
};
```

- `android`：Google Play 地址，或 APK 直链（如 `https://你的域名/apk/bindmail.apk`）
- `ios`：App Store 地址

> 页面文案（应用名、特性、标语）在 `index.html` 中修改。

## 本地预览

```bash
# 任意静态服务器均可，例如：
python3 -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

## 部署到 GitHub Pages

### 方式一：分支部署（最简单）

1. 在 GitHub 新建仓库（如 `bind-download`），把本目录所有文件推上去：
   ```bash
   git init
   git add .
   git commit -m "init bind-office download page"
   git branch -M main
   git remote add origin https://github.com/你的用户名/bind-download.git
   git push -u origin main
   ```
2. 打开仓库 **Settings → Pages**
3. **Build and deployment** 选择 **Deploy from a branch**
4. Branch 选择 `main`，目录选择 `/ (root)`
5. 点击 **Save**，稍等片刻即可通过
   `https://你的用户名.github.io/bind-download/` 访问

### 方式二：GitHub Actions 自动部署（可选）

在仓库中创建 `.github/workflows/pages.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - uses: actions/deploy-pages@v4
        id: deployment
```

然后在仓库 **Settings → Pages** 中把 Source 改为 **GitHub Actions**，每次推送 `main` 分支即自动发布。

## 配置自定义域名 download.bindoffice.com

仓库根目录的 `CNAME` 文件已写好域名（`download.bindoffice.com`），GitHub Pages 会自动识别并应用，只需完成以下两步：

### 1. 配置 DNS 解析

在域名服务商（阿里云 / DNSPod / Cloudflare 等）添加一条 CNAME 记录：

| 主机记录 | 记录类型 | 记录值 |
| --- | --- | --- |
| `download` | `CNAME` | `你的用户名.github.io` |

> `你的用户名.github.io` 需替换为你实际的 GitHub Pages 域名，例如 `bindoffice.github.io`。

### 2. 在 GitHub 启用自定义域名

1. 仓库 **Settings → Pages**
2. **Custom domain** 输入 `download.bindoffice.com`，点击 **Save**
3. 等待 DNS 校验通过后，勾选 **Enforce HTTPS**（获取 HTTPS 证书需要几分钟到几小时）
4. 之后通过 `https://download.bindoffice.com` 访问

> 两种部署方式都支持：分支部署时 GitHub 自动读取根目录 `CNAME`；GitHub Actions 部署时 `CNAME` 会随构建产物一并上传。

## 二维码说明

- 点击每张应用卡片上的「查看下载二维码」，会弹出该应用的 Android / iOS 二维码，用手机相机或扫码工具扫描即可跳转下载。
- 弹窗中同时提供下载链接与「复制链接」按钮。
- 二维码颜色与站点风格统一（深蓝），如需修改请调整 `js/main.js` 中 `renderQr()` 的 `colorDark` 值。
- 站点全部使用相对路径，部署在 `download.bindoffice.com` 或 `用户名.github.io` 下均可正常访问。
