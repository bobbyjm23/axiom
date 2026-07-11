(function () {
  var config = window.SW_SITE_CONFIG || {};
  var pageUrl = encodeURIComponent(window.location.href);
  var pageTitle = encodeURIComponent(document.title);

  var networks = {
    linkedin: {
      label: "LinkedIn",
      url: function () {
        return "https://www.linkedin.com/sharing/share-offsite/?url=" + pageUrl;
      },
      icon: '<path d="M4.5 3.5A2 2 0 1 1 .5 3.5a2 2 0 0 1 4 0zM.5 7h4v12h-4V7zm6 0h3.8v1.7h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.8H6.5V7z"/>'
    },
    twitter: {
      label: "X (Twitter)",
      url: function () {
        return "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
      },
      icon: '<path d="M18.9 4.5h3.5l-7.6 8.7 9 11.8h-7l-5.5-7.2-6.3 7.2H2.6l8.1-9.3L2 4.5h7.2l5 6.6 5.7-6.6zM17.7 19h1.9L7.6 6.4H5.5l12.2 12.6z"/>'
    },
    facebook: {
      label: "Facebook",
      url: function () {
        return "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl;
      },
      icon: '<path d="M15 3h3V0h-3c-3.3 0-5 2-5 5v3H7v3h3v9h3v-9h3.2l.8-3H13V5c0-1 .3-2 2-2z"/>'
    },
    email: {
      label: "Email",
      url: function () {
        return "mailto:?subject=" + pageTitle + "&body=" + pageUrl;
      },
      icon: '<path d="M2 4h12v8H2V4zm1 1.3v.4l5 3.1 5-3.1v-.4L8 8.4 3 5.3zM3 12.7l4.6-2.8L3 7.1v5.6zm10 0V7.1l-4.6 2.8L13 12.7z"/>'
    },
    whatsapp: {
      label: "WhatsApp",
      url: function () {
        return "https://wa.me/?text=" + pageTitle + "%20" + pageUrl;
      },
      icon: '<path d="M8 0a8 8 0 0 0-6.9 12l-1.1 4 4.1-1.1A8 8 0 1 0 8 0zm0 14.5a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2.4.6.6-2.3-.2-.2a6.5 6.5 0 1 1 5.5 3zm3.6-4.9c-.2-.1-1.2-.6-1.4-.7s-.3-.1-.5.1-.6.7-.7.9-.3.2-.5.1a4 4 0 0 1-1.2-.7 4.4 4.4 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1 0-.2 0-.3s-.5-1.3-.7-1.8-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.3c.5.2 1 .4 1.3.3s.7-.3.9-.5.4-.4.5-.6.1-.3 0-.3-.2-.2-.4-.3z"/>'
    },
    reddit: {
      label: "Reddit",
      url: function () {
        return "https://www.reddit.com/submit?url=" + pageUrl + "&title=" + pageTitle;
      },
      icon: '<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.9 9.5c0 .2-.2.4-.4.4H9.8v1.1c0 .7-.6 1.3-1.3 1.3H5.5c-.7 0-1.3-.6-1.3-1.3V9.9H3.5c-.2 0-.4-.2-.4-.4s.2-.4.4-.4h.7V7.8c0-.7.6-1.3 1.3-1.3h3c.7 0 1.3.6 1.3 1.3v1.3h.7c.2 0 .4.2.4.4zm-5.7 2.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7zm3.6 0c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7z"/>'
    }
  };

  function renderShareBar(container) {
    if (!container) return;

    var list = document.createElement("ul");
    list.className = "share-bar__list";

    Object.keys(networks).forEach(function (key) {
      var net = networks[key];
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = net.url();
      a.target = key === "email" ? "_self" : "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "Share on " + net.label);
      a.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true">' + net.icon + "</svg>";
      li.appendChild(a);
      list.appendChild(li);
    });

    var copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "share-bar__copy";
    copyBtn.setAttribute("aria-label", "Copy link");
    copyBtn.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h7a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 2v8h7V4H5zm-2 1v6h1V5H3z"/></svg>';
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        copyBtn.classList.add("is-copied");
        setTimeout(function () { copyBtn.classList.remove("is-copied"); }, 2000);
      });
    });

    var copyLi = document.createElement("li");
    copyLi.appendChild(copyBtn);
    list.appendChild(copyLi);

    container.appendChild(list);
  }

  function renderSocialLinks(container, variant) {
    if (!container || !config.social) return;

    var list = document.createElement("ul");
    list.className = variant === "footer" ? "c-social" : "c-social";

    var icons = {
      linkedin: '<path d="M4.5 3.5A2 2 0 1 1 .5 3.5a2 2 0 0 1 4 0zM.5 7h4v12h-4V7zm6 0h3.8v1.7h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.8H6.5V7z"/>',
      twitter: '<path d="M18.9 4.5h3.5l-7.6 8.7 9 11.8h-7l-5.5-7.2-6.3 7.2H2.6l8.1-9.3L2 4.5h7.2l5 6.6 5.7-6.6zM17.7 19h1.9L7.6 6.4H5.5l12.2 12.6z"/>',
      facebook: '<path d="M15 3h3V0h-3c-3.3 0-5 2-5 5v3H7v3h3v9h3v-9h3.2l.8-3H13V5c0-1 .3-2 2-2z"/>',
      youtube: '<path d="M15.3 4.2a2 2 0 0 0-1.4-1.4C12.5 2.5 8 2.5 8 2.5s-4.5 0-5.9.3A2 2 0 0 0 .7 4.2 21 21 0 0 0 .4 8a21 21 0 0 0 .3 3.8 2 2 0 0 0 1.4 1.4c1.4.3 5.9.3 5.9.3s4.5 0 5.9-.3a2 2 0 0 0 1.4-1.4A21 21 0 0 0 15.6 8a21 21 0 0 0-.3-3.8zM6.5 10.3V5.7L10.7 8l-4.2 2.3z"/>',
      instagram: '<path d="M8 2.2c2.1 0 2.4 0 3.2.1.8 0 1.2.2 1.5.3.4.1.7.3 1 .6.3.3.5.6.6 1 .1.3.3.7.3 1.5.1.8.1 1.1.1 3.2s0 2.4-.1 3.2c0 .8-.2 1.2-.3 1.5-.1.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.7.3-1.5.3-.8.1-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.2-.2-1.5-.3-.4-.1-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.3-.7-.3-1.5-.1-.8-.1-1.1-.1-3.2s0-2.4.1-3.2c0-.8.2-1.2.3-1.5.1-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.7-.3 1.5-.3.8-.1 1.1-.1 3.2-.1zM8 0C5.8 0 5.5 0 4.7.1 3.9.1 3.3.3 2.8.5 2.2.8 1.8 1.2 1.5 1.8.3 2.3.1 2.9.1 3.7 0 4.5 0 4.8 0 7s0 2.5.1 3.3c0 .8.2 1.4.4 1.9.3.6.7 1 1.3 1.3.5.2 1.1.4 1.9.4.8.1 1.1.1 3.3.1s2.5 0 3.3-.1c.8 0 1.4-.2 1.9-.4.6-.3 1-.7 1.3-1.3.2-.5.4-1.1.4-1.9.1-.8.1-1.1.1-3.3s0-2.5-.1-3.3c0-.8-.2-1.4-.4-1.9-.3-.6-.7-1-1.3-1.3-.5-.2-1.1-.4-1.9-.4C10.5 0 10.2 0 8 0zm0 3.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.4-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>',
      github: '<path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.6-.2.6-.4v-1.4c-2.5.5-3-1.2-3-1.2-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.2-.4-1 .1-2.1 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.1.2 1.9.1 2.1.6.6 1 1.4 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8 8 0 0 0 8 0z"/>'
    };

    Object.keys(config.social).forEach(function (key) {
      var url = config.social[key];
      if (!url) return;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", key);
      a.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true">' + (icons[key] || icons.github) + "</svg>";
      li.appendChild(a);
      list.appendChild(li);
    });

    container.appendChild(list);
  }

  window.SWShare = {
    renderShareBar: renderShareBar,
    renderSocialLinks: renderSocialLinks
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-share-bar]").forEach(renderShareBar);
    document.querySelectorAll("[data-social-links]").forEach(function (el) {
      renderSocialLinks(el, el.getAttribute("data-social-links"));
    });
  });
})();
