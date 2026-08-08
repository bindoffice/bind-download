/* =====================================================
 * BindOffice 下载中心
 * 1. 修改下载链接：编辑下方 DOWNLOAD_LINKS 配置
 * 2. 修改文案：编辑下方 I18N 中英文翻译字典
 * ===================================================== */

(function () {
  "use strict";

  // ---------------- 下载链接配置 ----------------
  // 把下面的占位链接替换成你的真实下载地址即可
  //   android: 应用商店地址或 APK 直链
  //   ios:     App Store 地址
  var DOWNLOAD_LINKS = {
    mail: {
      android: "https://static.bindoffice.ltd/bind-mail/bind-mail-1.0.6.apk",
      ios: "https://apps.apple.com/app/id6788962946"
    },
    meet: {
      android: "https://static.bindoffice.ltd/bind-meet/bind-meet-1.0.2.apk",
      ios: "https://apps.apple.com/app/id6797494502"
    }
  };

  // ---------------- 中英文翻译字典 ----------------
  var I18N = {
    zh: {
      "nav-apps": "应用下载",
      "nav-mail": "邮箱",
      "nav-meet": "会议",
      "lang-switch-aria": "切换到英文",
      "hero-badge": "官方下载中心 · 安全快速",
      "hero-title": "高效办公，从 <span class=\"gradient-text\">BindOffice</span> 开始",
      "hero-sub": "一个账号，邮箱与会议一站式搞定。<br>极速收发、高清音视频，让团队协作更简单。",
      "hero-download": "立即下载",
      "hero-browse": "浏览应用",
      "sec-apps-title": "选择你的应用",
      "sec-apps-sub": "支持 Android 与 iOS，扫码或点击按钮即可下载",
      "mail-name": "BindMail 必得邮箱",
      "mail-ver": "极速 · 安全 · 智能邮件客户端",
      "mail-desc": "多账号统一管理，智能分类，重要邮件实时提醒。垃圾邮件零打扰，让每一封邮件都更快到达。",
      "mail-f1": "多账号聚合 · 一键切换",
      "mail-f2": "智能分类 · 重要邮件提醒",
      "mail-f3": "智能垃圾过滤 · 零打扰",
      "meet-name": "BindMeet 必得会议",
      "meet-ver": "高清 · 流畅 · 多人视频会议",
      "meet-desc": "一键发起高清视频会议，通过链接快速邀请参会。智能降噪与弱网自适应，任何网络环境都清晰流畅。",
      "meet-f1": "高清视频会议 · 支持多人",
      "meet-f2": "一键入会 · 链接邀请",
      "meet-f3": "智能降噪 · 弱网自适应",
      "android-download": "Android 下载",
      "ios-download": "iOS 下载",
      "qr-btn": "查看下载二维码",
      "app-foot": "支持 Android 8.0+ / iOS 16+",
      "app-foot-meet": "支持 Android 8.0+ / iOS 15+",
      "app-tag": "官方渠道",
      "feat-title": "为什么选择 BindOffice",
      "feat-sub": "企业级安全能力，个人级使用体验",
      "feat-deploy-title": "私有化部署",
      "feat-deploy-desc": "应用直连自建服务器，数据全程留在企业内网，安全可控，不依赖第三方云服务。",
      "feat1-title": "极速稳定",
      "feat1-desc": "企业内网直连，邮件秒级送达；会议自适应码率，弱网环境同样清晰流畅。",
      "feat2-title": "全端同步",
      "feat2-desc": "手机、平板、电脑多端实时同步，邮件、会议与日程无缝衔接，随时随地办公。",
      "footer-tagline": "让每一封邮件更快，让每一场会议更清晰。",
      "footer-rights": "· 保留所有权利",
      "modal-title-mail": "扫码下载 BindMail 必得邮箱",
      "modal-title-meet": "扫码下载 BindMeet 必得会议",
      "modal-sub": "使用手机相机或扫码工具扫描下载",
      "copy-btn": "复制链接",
      "copied": "已复制 ✓",
      "qr-error": "二维码组件加载失败，请直接点击下方链接下载",
      "page-title": "BindOffice 下载中心 | 邮箱 & 会议",
      "page-desc": "BindOffice 官方下载中心 —— 高效邮箱与高清视频会议应用，支持 Android 与 iOS，扫码即刻下载。",
      "brand-aria": "BindOffice 首页",
      "close-aria": "关闭"
    },
    en: {
      "nav-apps": "Downloads",
      "nav-mail": "Mail",
      "nav-meet": "Meetings",
      "lang-switch-aria": "Switch to Chinese",
      "hero-badge": "Official Download Center · Safe & Fast",
      "hero-title": "Work smarter with <span class=\"gradient-text\">BindOffice</span>",
      "hero-sub": "One account for mail and meetings.<br>Fast delivery, HD audio & video — simpler teamwork.",
      "hero-download": "Download Now",
      "hero-browse": "Explore Apps",
      "sec-apps-title": "Choose Your App",
      "sec-apps-sub": "Available on Android & iOS — scan the QR code or tap to download",
      "mail-name": "BindMail Mail",
      "mail-ver": "Fast · Secure · Smart Mail Client",
      "mail-desc": "Manage multiple accounts with smart sorting and real-time alerts for important mail. Zero spam interruptions — every email arrives faster.",
      "mail-f1": "Multiple accounts · One-tap switch",
      "mail-f2": "Smart sorting · Important mail alerts",
      "mail-f3": "Smart spam filter · Zero interruption",
      "meet-name": "BindMeet Meetings",
      "meet-ver": "HD · Smooth · Multi-party Video",
      "meet-desc": "Start HD video meetings in one tap and invite participants with a simple link. Smart noise cancellation and adaptive bitrate keep you clear on any network.",
      "meet-f1": "HD video meetings · Multi-party",
      "meet-f2": "One-tap join · Link invite",
      "meet-f3": "Noise cancellation · Adaptive to weak networks",
      "android-download": "Android Download",
      "ios-download": "iOS Download",
      "qr-btn": "View Download QR Code",
      "app-foot": "Supports Android 8.0+ / iOS 16+",
      "app-foot-meet": "Supports Android 8.0+ / iOS 15+",
      "app-tag": "Official",
      "feat-title": "Why BindOffice",
      "feat-sub": "Enterprise-grade reliability, consumer-grade experience",
      "feat-deploy-title": "Private Deployment",
      "feat-deploy-desc": "Apps connect directly to your self-hosted servers. Data stays within your enterprise network — secure, controllable, no third-party cloud dependency.",
      "feat1-title": "Fast & Stable",
      "feat1-desc": "Direct intranet connection delivers email in seconds; adaptive bitrate keeps meetings smooth even on weak networks.",
      "feat2-title": "Sync Everywhere",
      "feat2-desc": "Real-time sync across phone, tablet, and desktop. Mail, meetings, and schedules stay perfectly in sync.",
      "footer-tagline": "Faster emails, clearer meetings.",
      "footer-rights": "· All rights reserved",
      "modal-title-mail": "Scan to download BindMail Mail",
      "modal-title-meet": "Scan to download BindMeet Meetings",
      "modal-sub": "Scan with your phone camera or any QR tool to download",
      "copy-btn": "Copy Link",
      "copied": "Copied ✓",
      "qr-error": "QR component failed to load. Please tap the link below to download.",
      "page-title": "BindOffice Download Center | Mail & Meetings",
      "page-desc": "BindOffice Official Download Center — fast email and HD video meeting apps for Android and iOS. Scan to download.",
      "brand-aria": "BindOffice Home",
      "close-aria": "Close"
    }
  };

  // ---------------- 状态 ----------------
  var currentLang = "zh";

  // ---------------- DOM 引用 ----------------
  var modal = document.getElementById("qrModal");
  var qrAndroid = document.getElementById("qrAndroid");
  var qrIos = document.getElementById("qrIos");
  var qrAndroidLink = document.getElementById("qrAndroidLink");
  var qrIosLink = document.getElementById("qrIosLink");
  var currentApp = null;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.zh[key] || key;
  }

  // ---------------- 语言切换 ----------------
  function updateLangSwitcher() {
    var btn = document.getElementById("langSwitch");
    if (!btn) return;
    if (currentLang === "zh") {
      btn.textContent = "EN";
      btn.setAttribute("aria-label", I18N.en["lang-switch-aria"]);
    } else {
      btn.textContent = "中文";
      btn.setAttribute("aria-label", I18N.zh["lang-switch-aria"]);
    }
  }

  function applyLang(lang) {
    currentLang = lang === "en" ? "en" : "zh";
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.title = t("page-title");

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("page-desc"));

    // 文本翻译（data-i18n-html 的元素按 HTML 注入，其余按纯文本）
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!I18N[currentLang][key]) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = I18N[currentLang][key];
      } else {
        el.textContent = I18N[currentLang][key];
      }
    });

    // 属性翻译（如 aria-label）
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var attr = el.getAttribute("data-i18n-attr");
      var key = el.getAttribute("data-i18n-attr-key");
      if (attr && key && I18N[currentLang][key]) {
        el.setAttribute(attr, I18N[currentLang][key]);
      }
    });

    updateLangSwitcher();
    try {
      localStorage.setItem("bindoffice-lang", currentLang);
    } catch (e) {}
  }

  var langSwitchBtn = document.getElementById("langSwitch");
  if (langSwitchBtn) {
    langSwitchBtn.addEventListener("click", function () {
      applyLang(currentLang === "zh" ? "en" : "zh");
    });
  }

  // 初始语言：localStorage 优先，其次浏览器语言
  var savedLang = null;
  try {
    savedLang = localStorage.getItem("bindoffice-lang");
  } catch (e) {}
  var browserLang = (navigator.language || navigator.userLanguage || "zh").toLowerCase();
  var initialLang = savedLang === "zh" || savedLang === "en"
    ? savedLang
    : (browserLang.indexOf("zh") === 0 ? "zh" : "en");
  applyLang(initialLang);

  // ---------------- 卡片下载按钮：填充真实链接 ----------------
  document.querySelectorAll("[data-app-link]").forEach(function (a) {
    var links = DOWNLOAD_LINKS[a.getAttribute("data-app-link")];
    var platform = a.getAttribute("data-platform");
    if (links && links[platform]) {
      a.setAttribute("href", links[platform]);
    }
  });

  // ---------------- 二维码渲染 ----------------
  function renderQr(container, text) {
    container.innerHTML = "";
    if (typeof QRCode === "undefined") {
      var msg = document.createElement("p");
      msg.className = "qr-error";
      msg.textContent = t("qr-error");
      container.appendChild(msg);
      return;
    }
    new QRCode(container, {
      text: text,
      width: 168,
      height: 168,
      colorDark: "#0a2a6e",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  // ---------------- 弹窗开关 ----------------
  function openModal(appKey) {
    var links = DOWNLOAD_LINKS[appKey];
    if (!links) return;
    currentApp = appKey;
    document.getElementById("qrModalTitle").textContent = appKey === "mail" ? t("modal-title-mail") : t("modal-title-meet");

    renderQr(qrAndroid, links.android);
    renderQr(qrIos, links.ios);

    qrAndroidLink.href = links.android;
    qrAndroidLink.textContent = links.android;
    qrIosLink.href = links.ios;
    qrIosLink.textContent = links.ios;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-open"));
    });
  });

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---------------- 复制链接 ----------------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (err) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var links = DOWNLOAD_LINKS[currentApp];
      if (!links) return;
      var text = links[btn.getAttribute("data-copy")];
      if (!text) return;
      copyText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = t("copied");
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 1600);
      });
    });
  });

  // ---------------- 头部滚动效果 / 进度条 / 导航高亮 ----------------
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("progressBar");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var spyIds = ["apps", "mail", "meet"];

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? doc.scrollTop / max : 0;
    if (progressBar) progressBar.style.width = ratio * 100 + "%";
    if (header) header.classList.toggle("scrolled", doc.scrollTop > 10);

    var current = "apps";
    spyIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) current = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------------- 滚动显现动画 ----------------
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ---------------- 页脚年份 ----------------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
