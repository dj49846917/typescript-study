import type { Demo } from '../content/curriculum';
import { CodeBlock } from './CodeBlock';

interface DemoCardProps {
  demo: Demo;
  index: number;
}

export function DemoCard({ demo, index }: DemoCardProps) {
  return (
    <article className="demo-card" id={demo.id}>
      <header>
        <span className="demo-number">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3>{demo.title}</h3>
          <p>{demo.summary}</p>
        </div>
      </header>
      <CodeBlock code={demo.code} />
      <div className="result-row">
        <span>结果 / 类型</span>
        <strong>{demo.result}</strong>
      </div>
      {demo.note && <p className="note">提示：{demo.note}</p>}
    </article>
  );
}
