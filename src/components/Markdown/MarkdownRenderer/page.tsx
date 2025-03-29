import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import type { Pluggable } from "unified";

const safeRemarkBreaks = remarkBreaks as unknown as Pluggable;

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[safeRemarkBreaks]}>{content}</ReactMarkdown>
  );
};

export default MarkdownRenderer;
