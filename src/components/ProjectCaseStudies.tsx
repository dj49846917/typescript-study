import { useMemo, useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { projectCases, type CaseCategory } from '../content/projectCases';

const categories = ['全部', 'API 边界', '领域建模', 'React 状态', '类型安全工具'] as const;

export function ProjectCaseStudies() {
  const [category, setCategory] = useState<'全部' | CaseCategory>('全部');
  const cases = useMemo(
    () => category === '全部' ? projectCases : projectCases.filter(item => item.category === category),
    [category],
  );

  return (
    <section className="project-cases" id="project-cases">
      <div className="project-cases-heading">
        <div>
          <span className="kicker">真实项目复盘 / Payment Admin</span>
          <h2>同一段业务，<br />两种类型安全等级。</h2>
        </div>
        <div>
          <p>案例来自 <code>payment-admin/src/api</code> 与 <code>src/pages</code> 的真实模式。左侧保留原写法的核心结构，右侧给出可渐进迁移的高级写法。</p>
          <div className="audit-stats"><strong>251</strong><span>处 any 线索</span><strong>{projectCases.length}</strong><span>个代表案例</span></div>
        </div>
      </div>

      <div className="case-filters" aria-label="实战案例分类">
        {categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
      </div>

      <div className="case-list">
        {cases.map((item, index) => (
          <article className="case-study" key={item.id}>
            <header>
              <span className="case-index">CASE {String(index + 1).padStart(2, '0')}</span>
              <div><span className="case-category">{item.category}</span><h3>{item.title}</h3><code>{item.source}</code></div>
              <p>{item.problem}</p>
            </header>
            <div className="comparison-grid">
              <div className="comparison-side before"><div className="comparison-label"><span>Before</span>当前模式</div><CodeBlock code={item.before} label="当前写法" /></div>
              <div className="comparison-arrow" aria-hidden="true">→</div>
              <div className="comparison-side after"><div className="comparison-label"><span>After</span>改进模式</div><CodeBlock code={item.after} label="高级写法" /></div>
            </div>
            <div className="case-outcome">
              <div><span>获得什么</span><ul>{item.gains.map(gain => <li key={gain}>{gain}</li>)}</ul></div>
              <p><span>不过度设计</span>{item.boundary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
