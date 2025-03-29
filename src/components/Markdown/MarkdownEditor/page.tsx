"use client";

import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const plugins = [gfm(), highlight(), breaks()];

export function MarkdownEditor({ value = "", onChange }: MarkdownEditorProps) {
  const handleChange = (newValue: string) => {
    onChange?.(newValue);
  };

  return (
    <>
      <style>
        {`
        /* Estilo do editor */

        .bytemd-toolbar-icon[bytemd-tippy-path="5"] {
          display: none !important;
        }
        .bytemd-toolbar-icon[bytemd-tippy-path="13"] {
          display: none !important;
        }
        .bytemd-status {
          display: none !important;
        }
        .bytemd-body {
          min-height: auto !important;
          max-height: 100vh !important;
          overflow: auto;
          border-radius: 4px;
        }
        
        /* Estilo markdown */

        .markdown-body h1 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
        }

        .markdown-body h2 {
          font-size: 2rem;
          font-weight: bold;
          color: #444;
        }

        .markdown-body h3 {
          font-size: 1.75rem;
          font-weight: bold;
          color: #555;
        }

        .markdown-body p {
          font-size: 1rem;
          line-height: 1.6;
          margin: 1rem 0;
        }

        .markdown-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }

        .markdown-body ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }

        .markdown-body a {
          color: #0070f3;
          text-decoration: underline;
        }

        .markdown-body img {
          width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }

        .markdown-body code {
          background-color: #f5f5f5;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.95rem;
        }

        .markdown-body pre code {
          font-size: 100%;
        }

        .markdown-body pre > code {
          padding: 0;
          margin: 0;
          word-break: normal;
          white-space: pre;
          background: transparent;
          border: 0;
        }

        .markdown-body .highlight {
          margin-bottom: 16px;
        }

        .markdown-body .highlight pre {
          margin-bottom: 0;
          word-break: normal;
        }

        .markdown-body .highlight pre,
        .markdown-body pre {
          padding: 16px;
          overflow: auto;
          font-size: 85%;
          line-height: 1.45;
          background-color: #f6f8fa;
          border-radius: 6px;
        }
        .markdown-body .math {
          overflow: auto;
        }
        .markdown-body pre code,
        .markdown-body pre tt {
          display: inline;
          max-width: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          line-height: inherit;
          word-wrap: normal;
          background-color: transparent;
          border: 0;
        }

        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .markdown-body table, .markdown-body th, .markdown-body td {
          border: 1px solid #ddd;
        }

        .markdown-body th, .markdown-body td {
          padding: 0.75rem;
          text-align: left;
        }

        .markdown-body th {
          background-color: #f0f0f0;
        }

        .markdown-body blockquote {
          background-color: #f9f9f9;
          border-left: 4px solid #0070f3;
          padding: 1rem;
          font-style: italic;
          color: #555;
          margin: 1.5rem 0;
        }
          .markdown-body .task-list-item {
          list-style-type: none;
        }

        .markdown-body .task-list-item label {
          font-weight: 400;
        }

        .markdown-body .task-list-item.enabled label {
          cursor: pointer;
        }

        .markdown-body .task-list-item + .task-list-item {
          margin-top: 3px;
        }

        .markdown-body .task-list-item .handle {
          display: none;
        }

        .markdown-body .task-list-item-checkbox {
          margin: 0 0.2em 0.25em -1.6em;
          vertical-align: middle;
        }

        .markdown-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
          margin: 0 -1.6em 0.25em 0.2em;
        }
        `}
      </style>

      <div className="border rounded-md">
        <Editor value={value} plugins={plugins} onChange={handleChange} />
      </div>
    </>
  );
}
