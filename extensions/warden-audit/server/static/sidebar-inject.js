/**
 * Injects "AI Readiness Audit" into AnythingLLM settings sidebar (Docker/stock UI).
 * Skips when integrated frontend already includes the nav item.
 */
(function () {
  const AUDIT_PATH = "/settings/audit/";
  const ALLOWED_ROLES = ["admin", "manager"];

  function userRole() {
    try {
      return JSON.parse(localStorage.getItem("anythingllm_user") || "{}").role || null;
    } catch {
      return null;
    }
  }

  function alreadyPresent() {
    if (document.querySelector("[data-warden-audit-nav]")) return true;
    return [...document.querySelectorAll("a[href]")].some((a) => {
      const href = a.getAttribute("href") || "";
      return href === "/settings/audit" || href === AUDIT_PATH;
    });
  }

  function shieldIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "h-5 w-5 flex-shrink-0");
    svg.setAttribute("viewBox", "0 0 256 256");
    svg.setAttribute("fill", "currentColor");
    svg.innerHTML =
      '<path d="M208,40H48A16,16,0,0,0,32,56v58.8c0,89.2,75.6,119.1,91.1,124.5a8,8,0,0,0,5.8,0C144.4,234.1,224,204.2,224,114.8V56A16,16,0,0,0,208,40Zm0,74.8c0,76.9-66.1,103.4-80,108.2-13.7-4.7-80-31.3-80-108.2V56l160,0Zm-42.6-25.7-58.7,56a8,8,0,0,1-11,0l-29.3-28a8,8,0,0,1,11-11.6L97,125.3l53.3-50.9a8,8,0,0,1,11,11.6Z"></path>';
    return svg;
  }

  function createNavItem() {
    const active = window.location.pathname.startsWith("/settings/audit");
    const root = document.createElement("div");
    root.setAttribute("data-warden-audit-nav", "true");

    const row = document.createElement("div");
    row.className = `flex items-center justify-between w-full transition-all duration-300 rounded-[6px] ${
      active
        ? "bg-theme-sidebar-subitem-selected font-medium border-outline"
        : "hover:bg-theme-sidebar-subitem-hover"
    }`;

    const link = document.createElement("a");
    link.href = AUDIT_PATH;
    link.className =
      "flex flex-grow items-center px-[12px] h-[32px] font-medium text-white light:text-black";

    link.appendChild(shieldIcon());

    const label = document.createElement("p");
    label.className = `text-sm leading-loose whitespace-nowrap overflow-hidden ml-2 ${
      active ? "text-white font-semibold" : "text-white light:text-black"
    }`;
    label.textContent = "AI Readiness Audit";
    link.appendChild(label);
    row.appendChild(link);
    root.appendChild(row);
    return root;
  }

  function findSidebar() {
    const header = [...document.querySelectorAll("div")].find(
      (el) =>
        el.className.includes("uppercase") && /instance settings/i.test(el.textContent.trim())
    );
    if (!header) return null;
    return (
      header.parentElement?.querySelector(".flex.flex-col.gap-y-2") ||
      header.parentElement?.querySelector(".flex.flex-col.gap-y-4") ||
      header.parentElement
    );
  }

  function findTopLevelOption(sidebar, labelText) {
    for (const label of sidebar.querySelectorAll("p")) {
      if (label.textContent.trim() !== labelText) continue;
      let node = label;
      for (let i = 0; i < 6 && node; i++) {
        if (node.parentElement === sidebar) return node;
        node = node.parentElement;
      }
      return label.closest("div")?.parentElement || null;
    }
    return null;
  }

  function inject() {
    if (!ALLOWED_ROLES.includes(userRole())) return;
    if (alreadyPresent()) return;

    const sidebar = findSidebar();
    if (!sidebar) return;

    const navItem = createNavItem();
    const aiProvidersOption = findTopLevelOption(sidebar, "AI Providers");

    if (aiProvidersOption && aiProvidersOption.parentElement === sidebar) {
      sidebar.insertBefore(navItem, aiProvidersOption);
    } else {
      sidebar.prepend(navItem);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }

  const observer = new MutationObserver(inject);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
