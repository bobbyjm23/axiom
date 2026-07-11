import { useState } from "react";
import type { DocTreeNode } from "../types";

interface DocTreeProps {
  tree: DocTreeNode[];
  selectedPath: string | null;
  onSelect: (path: string) => void;
}

function FolderNode({
  node,
  selectedPath,
  onSelect,
  depth = 0,
}: {
  node: DocTreeNode;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth < 1);

  if (node.path && !node.children) {
    return (
      <button
        type="button"
        className={`doc-tree__item${selectedPath === node.path ? " doc-tree__item--active" : ""}`}
        onClick={() => onSelect(node.path!)}
      >
        {node.label}
      </button>
    );
  }

  if (node.children) {
    return (
      <div className="doc-tree__folder">
        <button
          type="button"
          className="doc-tree__folder-btn"
          onClick={() => setOpen(!open)}
        >
          <span className="doc-tree__chevron">{open ? "▼" : "▶"}</span>
          {node.label}
        </button>
        {open && (
          <div className="doc-tree__children">
            {node.children.map((child) =>
              child.children || child.path ? (
                <FolderNode
                  key={child.id}
                  node={child}
                  selectedPath={selectedPath}
                  onSelect={onSelect}
                  depth={depth + 1}
                />
              ) : null
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export function DocTree({ tree, selectedPath, onSelect }: DocTreeProps) {
  return (
    <nav className="doc-tree">
      {tree.map((node) => (
        <FolderNode
          key={node.id}
          node={node}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}
