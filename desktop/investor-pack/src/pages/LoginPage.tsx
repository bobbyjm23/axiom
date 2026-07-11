import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/assets/logo.png");

  useEffect(() => {
    window.investorPack.getLogoPath().then((res) => {
      if (res.ok && res.path) setLogoSrc(res.path);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError("You must accept the Confidentiality Agreement to continue");
      return;
    }
    setError("");
    setLoading(true);
    const token = await login(email, password);
    setLoading(false);
    if (token) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="page page--centered">
      <div className="login-panel">
        <img
          src={logoSrc}
          alt="Sovereign Warden"
          className="login-panel__logo"
        />

        <form className="card login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <label className="login-form__checkbox">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              I have read and agree to the{" "}
              <Link to="/confidentiality" className="login-form__link">
                Confidentiality Agreement
              </Link>
            </span>
          </label>

          {error && <p className="login-form__error">{error}</p>}

          <button
            type="submit"
            className="pill pill--primary login-form__submit"
            disabled={loading || !acceptedTerms}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
