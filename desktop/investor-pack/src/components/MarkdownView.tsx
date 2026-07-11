import { useMemo, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";

interface MarkdownViewProps {
  content: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

function resolveLink(href: string, currentPath: string): string | null {
  if (!href || href.startsWith("http://") || href.startsWith("https://")) {
    return null;
  }
  if (href.startsWith("#")) return null;

  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;

  if (clean.endsWith(".md") || clean.endsWith(".html")) {
    if (clean.startsWith("/")) return clean.slice(1);
    if (clean.startsWith("../")) {
      const parts = currentPath.split("/");
      parts.pop();
      const segments = clean.split("/");
      for (const seg of segments) {
        if (seg === "..") parts.pop();
        else if (seg !== ".") parts.push(seg);
      }
      return parts.join("/");
    }
    if (clean.includes("/")) return clean;
    const dir = currentPath.includes("/")
      ? currentPath.slice(0, currentPath.lastIndexOf("/") + 1)
      : "";
    return `${dir}${clean}`;
  }

  return null;
}

export function MarkdownView({
  content,
  currentPath,
  onNavigate,
}: MarkdownViewProps) {
  const { token } = useAuth();

  const components = useMemo(
    () => ({
      a: ({ href, children }: { href?: string; children?: ReactNode }) => {
        const resolved = href ? resolveLink(href, currentPath) : null;
        if (resolved) {
          return (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(resolved);
              }}
            >
              {children}
            </a>
          );
        }
        if (href?.startsWith("http")) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        }
        return <a href={href}>{children}</a>;
      },
    }),
    [currentPath, onNavigate]
  );

  if (!token) {
    return <div className="markdown-body__error">Not authenticated</div>;
  }

  return (
    <article className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
