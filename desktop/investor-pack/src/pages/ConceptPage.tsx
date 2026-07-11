import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ConceptPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    window.investorPack.getConceptPath(token).then((res) => {
      if (res.ok && res.path) {
        setDeckUrl(res.path);
      } else {
        setError(res.error || "Concept deck not available");
      }
    });
  }, [token]);

  return (
    <>
      <button
        type="button"
        className="pill pill--ghost back-home-fixed"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>
      {error && (
        <div className="page page--centered">
          <p className="markdown-body__error">{error}</p>
        </div>
      )}
      {deckUrl && !error && (
        <iframe
          title="Sovereign Warden Concept Deck"
          src={deckUrl}
          className="pitch-frame"
        />
      )}
    </>
  );
}
