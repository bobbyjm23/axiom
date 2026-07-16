(function () {
  var header = null;
  var burger = null;
  var mobileNav = null;
  var navLinks = [];

  function sectionIsDark(section) {
    if (!section) return true;

    var className = " " + (section.className || "") + " ";
    if (
      className.indexOf(" block-hero ") !== -1 ||
      className.indexOf(" block-bleed-text ") !== -1 ||
      className.indexOf(" section--dark ") !== -1 ||
      className.indexOf(" block-cta ") !== -1 ||
      className.indexOf(" article-hero ") !== -1
    ) {
      return true;
    }

    try {
      var bg = window.getComputedStyle(section).backgroundColor;
      var match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return false;
      var r = parseInt(match[1], 10);
      var g = parseInt(match[2], 10);
      var b = parseInt(match[3], 10);
      // Relative luminance — treat navy/dark as dark for light nav text
      var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.45;
    } catch (e) {
      return false;
    }
  }

  function setHeaderState() {
    if (!header) return;

    var probeY = header.offsetHeight / 2;
    var sections = document.querySelectorAll("main section, main .article-hero, .l-footer");
    var under = null;

    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom > probeY) {
        under = section;
      }
    });

    // Default: dark sections → white logo/links; light sections → navy logo/links
    var useLightChrome = !sectionIsDark(under);
    if (document.body.classList.contains("page-article") && !under) {
      useLightChrome = false;
    }

    header.classList.toggle("is-light", useLightChrome);
  }

  function setActiveNav() {
    var sections = document.querySelectorAll("main section[id]");
    var scrollPos = window.scrollY + 140;
    var current = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var isActive = href === "#" + current;
      link.classList.toggle("is-active", isActive);
    });
  }

  function observeInview(selector) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) { el.classList.add("is-inview"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { threshold: 0.35 }
    );
    nodes.forEach(function (el) { io.observe(el); });
  }

  function closeMobileNav() {
    if (!mobileNav || !burger) return;
    mobileNav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    if (mobileNav) mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!mobileNav || !burger) return;
    mobileNav.classList.add("is-open");
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function initNav() {
    header = document.querySelector(".l-header");
    burger = document.querySelector(".c-burger");
    mobileNav = document.querySelector(".l-nav");
    navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.l-header__menu a[href^="#"], .l-nav__menu a[href^="#"]')
    );

    if (burger) {
      burger.addEventListener("click", function () {
        if (mobileNav.classList.contains("is-open")) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });

    window.addEventListener("scroll", function () {
      setHeaderState();
      setActiveNav();
    }, { passive: true });

    window.addEventListener("resize", setHeaderState, { passive: true });

    setHeaderState();
    setActiveNav();
    observeInview(".sovereignty-compare, .product-orbit");
  }

  document.addEventListener("DOMContentLoaded", initNav);
})();
