(function () {
  var config = window.SW_SITE_CONFIG || {};
  var gtmId = config.gtmId;
  var ga4Id = config.ga4MeasurementId;
  var hasGtm = gtmId && gtmId !== "GTM-XXXXXXX";
  var hasGa4 = ga4Id && ga4Id !== "G-XXXXXXXXXX";

  if (!hasGtm && !hasGa4) return;

  window.dataLayer = window.dataLayer || [];

  if (hasGtm) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(gtmId);
    document.head.appendChild(gtmScript);

    function injectNoscript() {
      if (!document.body) return;
      var noscript = document.createElement("noscript");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.googletagmanager.com/ns.html?id=" + encodeURIComponent(gtmId);
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }

    if (document.body) {
      injectNoscript();
    } else {
      document.addEventListener("DOMContentLoaded", injectNoscript);
    }
  }

  // Load GA4 directly when configured (also fine alongside a published GTM container).
  if (hasGa4) {
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", ga4Id);

    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4Id);
    document.head.appendChild(gaScript);
  }
})();
