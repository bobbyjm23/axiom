(function () {
  var header = null;
  var burger = null;
  var mobileNav = null;
  var navLinks = [];

  function setHeaderState() {
    if (!header) return;
    var hero = document.querySelector(".block-hero");
    var scrollY = window.scrollY;
    var pastHero = hero ? scrollY > hero.offsetHeight - 120 : scrollY > 80;

    header.classList.toggle("is-scrolled", scrollY > 20);
    header.classList.toggle("is-light", pastHero && !document.body.classList.contains("page-article"));
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

  function closeMobileNav() {
    if (!mobileNav || !burger) return;
    mobileNav.classList.remove("is-open");
    burger.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!mobileNav || !burger) return;
    mobileNav.classList.add("is-open");
    burger.classList.add("is-open");
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

    setHeaderState();
    setActiveNav();
  }

  document.addEventListener("DOMContentLoaded", initNav);
})();
