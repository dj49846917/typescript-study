import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

const experiments = [
  {
    name: 'satisfies',
    question: '为什么不直接写类型注解？',
    code: `type Palette = Record<'primary' | 'danger', string | number[]>;\n\nconst palette = {\n  primary: '#3178c6',\n  danger: [220, 38, 38],\n} satisfies Palette;\n\npalette.primary.toUpperCase();`,
    inference: 'palette.primary → string',
    explanation: 'satisfies 只验证兼容性，不会把每个属性都扩宽为 string | number[]，所以仍可直接调用字符串方法。',
  },
  {
    name: 'const 泛型',
    question: '如何让库 API 保留字面量？',
    code: `function tuple<const T extends readonly unknown[]>(value: T): T {\n  return value;\n}\n\nconst route = tuple(['/home', 200, true]);`,
    inference: 'route → readonly ["/home", 200, true]',
    explanation: 'const 类型参数请求最窄推断。调用方无需额外书写 as const，适合路由、事件名与配置 API。',
  },
  {
    name: '条件类型',
    question: 'infer 是怎样提取内部类型的？',
    code: `type Item<T> = T extends readonly (infer Value)[]\n  ? Value\n  : never;\n\ntype User = Item<Array<{ id: string; name: string }>>;`,
    inference: 'User → { id: string; name: string }',
    explanation: '当 T 匹配数组结构时，infer Value 在匹配位置声明一个新类型变量，随后可在 true 分支中使用。',
  },
  {
    name: '可辨识联合',
    question: '如何让不合法状态无法表示？',
    code: `type State<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: Error };`,
    inference: 'status === "success" → data 一定存在',
    explanation: '每个状态只携带自己需要的数据，避免 loading=true、data 有值、error 也有值这类互相矛盾的组合。',
  },
] as const;

export function TypePlayground() {
  const [selected, setSelected] = useState(0);
  const experiment = experiments[selected] ?? experiments[0];

  return (
    <section className="playground-shell">
      <div className="playground-heading">
        <div>
          <span className="kicker">类型推断实验台</span>
          <h2>先猜类型，再看答案</h2>
        </div>
        <p>选择一个现代类型模式，先阅读问题和代码，再展开编译器会得到的类型。项目中的全部源码均由 TypeScript 7 严格检查。</p>
      </div>
      <div className="experiment-tabs">
        {experiments.map((item, index) => (
          <button key={item.name} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}>{item.name}</button>
        ))}
      </div>
      <div className="playground-grid">
        <div className="experiment-question">
          <span>思考题</span>
          <h3>{experiment.question}</h3>
          <p>在查看答案前，尝试说出最后一个变量或表达式的精确类型。</p>
        </div>
        <CodeBlock code={experiment.code} />
      </div>
      <details className="type-answer">
        <summary>查看类型答案</summary>
        <strong>{experiment.inference}</strong>
        <p>{experiment.explanation}</p>
      </details>
      <p className="playground-note">在本地修改源码后，运行 <code>npm run typecheck</code> 即可用 TypeScript 7 获得完整的跨文件语义检查。</p>
    </section>
  );
}
