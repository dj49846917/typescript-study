import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  label?: string;
}

export function CodeBlock({ code, label = 'TypeScript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{label}</span>
        <button type="button" onClick={copy}>{copied ? '已复制' : '复制'}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
