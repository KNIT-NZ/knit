import React from "react";

const LINK_REGEX =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\[(https?:\/\/[^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?)\]])/g;

function formatBareUrlLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function parseText(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = LINK_REGEX.exec(text)) !== null) {
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    const [
      fullMatch,
      markdownText,
      markdownUrl,
      reversedUrl,
      reversedText,
      bareUrl,
    ] = match;

    if (markdownText && markdownUrl) {
      nodes.push(
        <a
          key={`${matchIndex}-${fullMatch}`}
          href={markdownUrl}
          target="_blank"
          rel="noreferrer"
        >
          {markdownText}
        </a>,
      );
    } else if (reversedUrl && reversedText) {
      nodes.push(
        <a
          key={`${matchIndex}-${fullMatch}`}
          href={reversedUrl}
          target="_blank"
          rel="noreferrer"
        >
          {reversedText}
        </a>,
      );
    } else if (bareUrl) {
      nodes.push(
        <a
          key={`${matchIndex}-${fullMatch}`}
          href={bareUrl}
          target="_blank"
          rel="noreferrer"
        >
          {formatBareUrlLabel(bareUrl)}
        </a>,
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function linkifyNode(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    return parseText(node);
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <React.Fragment key={index}>{linkifyNode(child)}</React.Fragment>
    ));
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;

    if (element.type === "a") {
      return element;
    }

    return React.cloneElement(element, {
      ...element.props,
      children: linkifyNode(element.props.children),
    });
  }

  return node;
}

export function FootnoteRef({ id }: { id: string }) {
  return (
    <sup className="footnoteRef">
      <a href={`#fn-${id}`} id={`fnref-${id}`}>
        [{id}]
      </a>
    </sup>
  );
}

export function Footnotes({
  items,
}: {
  items: { id: string; children: React.ReactNode }[];
}) {
  return (
    <section className="footnotesSection">
      <h2>Notes</h2>
      <ol className="footnotesList">
        {items.map((item) => (
          <li key={item.id} id={`fn-${item.id}`}>
            <div>{linkifyNode(item.children)}</div>
            <a href={`#fnref-${item.id}`} className="footnoteBacklink">
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
