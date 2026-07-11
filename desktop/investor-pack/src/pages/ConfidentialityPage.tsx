import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ConfidentialityPage() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.investorPack.getConfidentiality().then((res) => {
      if (res.ok && res.content) {
        setContent(res.content);
      } else {
        setError(res.error || "Unable to load confidentiality agreement");
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="confidentiality-page">
      <div className="confidentiality-page__bar">
        <Link to="/login" className="pill pill--ghost">
          ← Back to sign in
        </Link>
      </div>
      <main className="confidentiality-page__content card">
        {loading && <p className="markdown-body__loading">Loading…</p>}
        {error && <p className="markdown-body__error">{error}</p>}
        {!loading && !error && (
          <article className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        )}
      </main>
    </div>
  );
}
