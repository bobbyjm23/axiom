import { useEffect, useState } from "react";
import { LogoutButton } from "./LogoutButton";

export function AppHeader() {
  const [logoSrc, setLogoSrc] = useState("/assets/logo.png");

  useEffect(() => {
    window.investorPack.getLogoPath().then((res) => {
      if (res.ok && res.path) setLogoSrc(res.path);
    });
  }, []);

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <img src={logoSrc} alt="Sovereign Warden" className="app-header__logo" />
        <span className="app-header__title">Sovereign Warden</span>
      </div>
      <div className="app-header__user">
        <LogoutButton />
      </div>
    </header>
  );
}
