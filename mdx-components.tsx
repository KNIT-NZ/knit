import type { MDXComponents } from "mdx/types";
import { FootnoteRef, Footnotes } from "@/components/Footnotes";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 id={slugifyText(props.children)} {...props} />,
    h3: (props) => <h3 id={slugifyText(props.children)} {...props} />,
    p: (props) => <p {...props} />,
    a: (props) => <a {...props} />,
    ul: (props) => <ul {...props} />,
    ol: (props) => <ol {...props} />,
    li: (props) => <li {...props} />,
    blockquote: (props) => <blockquote {...props} />,
    code: (props) => <code {...props} />,
    pre: (props) => <pre {...props} />,
    FootnoteRef,
    Footnotes,
    ...components,
  };
}

function slugifyText(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  if (Array.isArray(children)) {
    const text = children
      .map((child) => (typeof child === "string" ? child : ""))
      .join(" ");
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  return "";
}