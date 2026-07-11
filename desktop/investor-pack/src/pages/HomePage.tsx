import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const navigate = useNavigate();
  const { fullName } = useAuth();
  const [logoSrc, setLogoSrc] = useState("/assets/logo.png");
  const [packLabel, setPackLabel] = useState("investor pack");

  useEffect(() => {
    window.investorPack.getLogoPath().then((res) => {
      if (res.ok && res.path) setLogoSrc(res.path);
    });
    window.investorPack.getPackProfile().then((res) => {
      if (res.ok && res.packLabel) setPackLabel(res.packLabel);
    });
  }, []);

  const displayName = fullName || "there";

  return (
    <main className="page page--home">
      <LogoutButton className="logout-fixed" />
      <div className="home-grid">
        <div className="home-hero">
          <img
            src={logoSrc}
            alt="Sovereign Warden"
            className="home-hero__logo"
          />
          <p className="home-hero__welcome">
            Welcome {displayName} to the {packLabel}
          </p>
        </div>

        <button
          type="button"
          className="card home-card"
          onClick={() => navigate("/concept")}
        >
          <div className="home-card__icon-wrap">
            <img
              src="/assets/icons/concept.png"
              alt=""
              className="home-card__icon"
            />
          </div>
          <div className="home-card__body">
            <h2 className="home-card__title">Concept</h2>
            <p className="home-card__tagline">
              Start here — the idea behind the business
            </p>
            <span className="home-card__cta">Open deck →</span>
          </div>
        </button>

        <button
          type="button"
          className="card home-card"
          onClick={() => navigate("/pitch-deck")}
        >
          <div className="home-card__icon-wrap">
            <img
              src="/assets/icons/pitch-deck.png"
              alt=""
              className="home-card__icon"
            />
          </div>
          <div className="home-card__body">
            <h2 className="home-card__title">Pitch Deck</h2>
            <p className="home-card__tagline">
              17-slide angel bridge narrative
            </p>
            <span className="home-card__cta">Open deck →</span>
          </div>
        </button>

        <button
          type="button"
          className="card home-card"
          onClick={() => navigate("/explorer")}
        >
          <div className="home-card__icon-wrap">
            <img
              src="/assets/icons/business-plan.png"
              alt=""
              className="home-card__icon"
            />
          </div>
          <div className="home-card__body">
            <h2 className="home-card__title">Business Plan Explorer</h2>
            <p className="home-card__tagline">
              Due diligence documents and deep dives
            </p>
            <span className="home-card__cta">Browse documents →</span>
          </div>
        </button>
      </div>
    </main>
  );
}
