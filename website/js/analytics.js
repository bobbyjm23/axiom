(function () {
  var config = window.SW_SITE_CONFIG || {};
  var gtmId = config.gtmId;

  if (!gtmId || gtmId === "GTM-XXXXXXX") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(gtmId);
  document.head.appendChild(script);

  var noscript = document.createElement("noscript");
  var iframe = document.createElement("iframe");
  iframe.src = "https://www.googletagmanager.com/ns.html?id=" + encodeURIComponent(gtmId);
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
})();
