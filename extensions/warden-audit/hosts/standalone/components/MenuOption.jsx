import React, { useEffect, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { isPathActive } from "../settingsPaths";

function NavLink({ href, className, onClick, children }) {
  const isAuditRoute = href === "/settings/audit/" || href.startsWith("/settings/audit/#");
  const isSettingsRoute = href.startsWith("/settings/") && !href.startsWith("/settings/audit");

  if (isSettingsRoute || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  const to = isAuditRoute ? href.replace("/settings/audit/#", "").replace("/settings/audit/", "/") || "/" : href;
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function hasVisibleOptions(user, childOptions = []) {
  return childOptions.some((opt) => {
    if (opt.hidden) return false;
    if (!opt.flex && !opt.roles?.includes(user?.role)) return false;
    if (opt.flex && user && !opt.roles?.includes(user?.role)) return false;
    return true;
  });
}

function generateStorageKey({ key = "" }) {
  return `anything_llm_menu_${key.replace(/\s+/g, "_").toLowerCase()}_expanded`;
}

export default function MenuOption({
  btnText,
  icon,
  href = "#",
  childOptions = [],
  flex = false,
  user = null,
  roles = [],
  hidden = false,
  isChild = false,
}) {
  const storageKey = generateStorageKey({ key: btnText });
  const location = useLocation();
  const hasChildren = childOptions.length > 0;
  const hasVisibleChildren = hasVisibleOptions(user, childOptions);
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) return JSON.parse(stored);
    return childOptions.some((child) => isPathActive(child.href));
  });

  useEffect(() => {
    if (hasChildren && childOptions.some((child) => isPathActive(child.href)) && !isExpanded) {
      setIsExpanded(true);
      localStorage.setItem(storageKey, JSON.stringify(true));
    }
  }, [location.pathname, location.hash]);

  if (hidden) return null;

  if (!isChild) {
    if (!hasChildren) {
      if (!flex && !roles.includes(user?.role)) return null;
      if (flex && user && !roles.includes(user?.role)) return null;
    }
    if (hasChildren && !hasVisibleChildren) return null;
  } else {
    if (!flex && !roles.includes(user?.role)) return null;
    if (flex && user && !roles.includes(user?.role)) return null;
  }

  const isActive = hasChildren
    ? (!isExpanded && childOptions.some((child) => isPathActive(child.href))) || isPathActive(href)
    : isPathActive(href);

  const handleClick = (e) => {
    if (!hasChildren) return;
    e.preventDefault();
    const next = !isExpanded;
    setIsExpanded(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between w-full transition-all duration-300 rounded-[6px] ${
          isActive
            ? "bg-theme-sidebar-subitem-selected font-medium border-outline"
            : "hover:bg-theme-sidebar-subitem-hover"
        }`}
      >
        <NavLink
          href={href}
          className={`flex flex-grow items-center px-[12px] h-[32px] font-medium ${
            isChild ? "hover:text-white" : "text-white light:text-black"
          }`}
          onClick={hasChildren ? handleClick : undefined}
        >
          {icon}
          <p
            className={`${isChild ? "text-xs" : "text-sm"} leading-loose whitespace-nowrap overflow-hidden ml-2 ${
              isActive ? "text-white font-semibold" : "text-white light:text-black"
            } ${!icon ? "pl-5" : ""}`}
          >
            {btnText}
          </p>
        </NavLink>
        {hasChildren && (
          <button type="button" onClick={handleClick} className="p-2 text-white">
            <CaretRight
              size={16}
              weight="bold"
              className={`transition-transform text-white light:text-black ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-1 rounded-r-lg w-full">
          {childOptions.map((childOption, index) => (
            <MenuOption key={index} {...childOption} user={user} isChild />
          ))}
        </div>
      )}
    </div>
  );
}
