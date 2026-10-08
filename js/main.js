/* =====================================================
 * BindOffice 下载中心
 * 1. 修改下载链接：编辑 downloads.json
 * 2. 修改文案：编辑 js/i18n.js
 * ===================================================== */

(function () {
  "use strict";

  var DOWNLOAD_LINKS = {};

  // ---------------- 状态 ----------------
  var currentLang = "zh";

  // ---------------- DOM 引用 ----------------
  var modal = document.getElementById("qrModal");
  var macosModal = document.getElementById("macosModal");
  var qrAndroid = document.getElementById("qrAndroid");
  var qrIos = document.getElementById("qrIos");
  var qrAndroidLink = document.getElementById("qrAndroidLink");
  var qrIosLink = document.getElementById("qrIosLink");
  var currentApp = null;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.zh[key] || key;
  }

  // ---------------- 语言切换 ----------------

  function langMeta(code) {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === code) return LANGS[i];
    }
    return LANGS[0];
  }

  function closeLangMenu() {
    var list = document.getElementById("langList");
    var btn = document.getElementById("langSwitch");
    if (list) list.hidden = true;
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function updateLangSwitcher() {
    var btn = document.getElementById("langSwitch");
    var list = document.getElementById("langList");
    if (!btn || !list) return;
    var meta = langMeta(currentLang);
    btn.textContent = meta.label;
    btn.setAttribute("aria-label", t("lang-switch-aria"));
    list.innerHTML = "";
    LANGS.forEach(function (item) {
      var li = document.createElement("li");
      var option = document.createElement("button");
      option.type = "button";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", item.code === currentLang ? "true" : "false");
      option.textContent = item.label;
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        applyLang(item.code);
        closeLangMenu();
      });
      li.appendChild(option);
      list.appendChild(li);
    });
  }

  function applyLang(lang) {
    if (!I18N[lang]) lang = "zh";
    currentLang = lang;
    var meta = langMeta(currentLang);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
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
    langSwitchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var list = document.getElementById("langList");
      if (!list) return;
      var open = list.hidden;
      list.hidden = !open;
      langSwitchBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.addEventListener("click", function (e) {
    var menu = document.querySelector(".lang-menu");
    if (menu && !menu.contains(e.target)) closeLangMenu();
  });

  function matchLang(tag) {
    var value = (tag || "").toLowerCase().replace("_", "-");
    if (!value) return null;
    if (value === "zh-hant" || value.indexOf("zh-tw") === 0 || value.indexOf("zh-hk") === 0 || value.indexOf("zh-mo") === 0) {
      return "zh-Hant";
    }
    if (value.indexOf("zh") === 0) return "zh";
    var prefix = value.split("-")[0];
    return I18N[prefix] ? prefix : null;
  }

  // 初始语言：localStorage 优先，其次浏览器语言
  var savedLang = null;
  try {
    savedLang = localStorage.getItem("bindoffice-lang");
  } catch (e) {}
  var browserLang = navigator.language || navigator.userLanguage || "zh";
  applyLang(matchLang(savedLang) || matchLang(browserLang) || "en");

  // ---------------- 下载配置与按钮链接 ----------------
  function applyDownloadLinks() {
    document.querySelectorAll("[data-app-link]").forEach(function (a) {
      var links = DOWNLOAD_LINKS[a.getAttribute("data-app-link")];
      var platform = a.getAttribute("data-platform");
      if (links && links[platform]) {
        a.setAttribute("href", links[platform]);
      }
    });
  }

  fetch("downloads.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("downloads.json " + response.status);
      return response.json();
    })
    .then(function (links) {
      DOWNLOAD_LINKS = links;
      applyDownloadLinks();
    })
    .catch(function (error) {
      console.error("下载配置读取失败", error);
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

  function openMacosModal() {
    macosModal.classList.add("open");
    document.body.style.overflow = "hidden";
    var closeBtn = macosModal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeMacosModal() {
    macosModal.classList.remove("open");
    document.body.style.overflow = "";
    if (window.location.hash === "#macosModal") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search + "#office");
    }
  }

  document.querySelectorAll("[data-open-macos]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openMacosModal();
    });
  });

  macosModal.querySelectorAll("[data-close-macos]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      closeMacosModal();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLangMenu();
      closeModal();
      closeMacosModal();
    }
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
  var spyIds = ["apps", "office", "server", "mail", "meet"];

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
