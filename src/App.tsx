import { useMemo, useState } from 'react';
import { ChapterView } from './components/ChapterView';
import { TypePlayground } from './components/TypePlayground';
import { LiveCodeLab } from './components/LiveCodeLab';
import { ProjectCaseStudies } from './components/ProjectCaseStudies';
import { chapters, demoCount } from './content/curriculum';

const storybookUrl = import.meta.env.DEV ? 'http://localhost:6006' : './storybook/index.html';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<'全部' | '基础' | '进阶' | '工程' | '高级'>('全部');

  const visibleChapters = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('zh-CN');
    return chapters
      .filter(chapter => activeLevel === '全部' || chapter.level === activeLevel)
      .map(chapter => ({
        ...chapter,
        demos: keyword
          ? chapter.demos.filter(demo =>
              `${demo.title}${demo.summary}${demo.code}${demo.result}`.toLocaleLowerCase('zh-CN').includes(keyword),
            )
          : chapter.demos,
      }))
      .filter(chapter => !keyword || chapter.demos.length > 0 || `${chapter.title}${chapter.description}`.includes(keyword));
  }, [activeLevel, query]);

  const visibleDemoCount = visibleChapters.reduce((count, chapter) => count + chapter.demos.length, 0);

  return (
    <div className="site-shell">
      <header className="hero">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="返回顶部"><span>TS</span> LAB / 7</a>
          <div className="nav-links">
            <a href="#curriculum">课程</a>
            <a href="#playground">实验台</a>
            <a href="#live-code">写代码</a>
            <a href="#project-cases">项目实战</a>
            <a href={storybookUrl}>Storybook 文档</a>
          </div>
        </nav>
        <div className="hero-content" id="top">
          <div>
            <div className="kicker">A living TypeScript curriculum · 2026</div>
            <h1>从类型到工程，<br /><em>真正看见</em> TypeScript。</h1>
            <p className="hero-copy">为现代 TypeScript 重写的中文学习项目。每个知识点都有独立代码、类型结果和使用建议，既可按章节学习，也可作为日常速查手册。</p>
            <div className="hero-actions">
              <a className="primary-action" href="#curriculum">开始学习 <span>↘</span></a>
              <a className="secondary-action" href={storybookUrl}>阅读 Storybook 文档</a>
            </div>
          </div>
          <aside className="hero-stats" aria-label="课程统计">
            <div><strong>{chapters.length}</strong><span>系统章节</span></div>
            <div><strong>{demoCount}</strong><span>独立 Demo</span></div>
            <div><strong>7.0</strong><span>TypeScript</span></div>
            <div><strong>100%</strong><span>静态可访问</span></div>
          </aside>
        </div>
        <div className="marquee" aria-hidden="true"><span>STRICT BY DEFAULT</span><i>◆</i><span>LEARN BY RUNNING</span><i>◆</i><span>STATIC & PORTABLE</span><i>◆</i><span>STRICT BY DEFAULT</span></div>
      </header>

      <main>
        <section className="curriculum-intro" id="curriculum">
          <div>
            <span className="kicker">课程目录 / Curriculum</span>
            <h2>一条可搜索的学习路径</h2>
          </div>
          <p>从基础类型一路走到类型运算与工程配置。旧版 stage01–12 仍保留在仓库中，便于对照语言与最佳实践的变化。</p>
        </section>

        <div className="filter-bar">
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索 keyof、泛型、strict…" />
          </label>
          <div className="level-filter" aria-label="按难度筛选">
            {(['全部', '基础', '进阶', '工程', '高级'] as const).map(level => (
              <button key={level} className={activeLevel === level ? 'active' : ''} onClick={() => setActiveLevel(level)}>{level}</button>
            ))}
          </div>
          <span className="result-count">{visibleDemoCount} DEMOS</span>
        </div>

        <div className="chapters-list">
          {visibleChapters.map(chapter => <ChapterView key={chapter.slug} chapter={chapter} />)}
          {visibleChapters.length === 0 && <div className="empty-state">没有找到匹配的内容，换一个关键词试试。</div>}
        </div>

        <ProjectCaseStudies />

        <div id="playground"><TypePlayground /></div>
        <LiveCodeLab />
      </main>

      <footer>
        <div className="brand"><span>TS</span> LAB / 7</div>
        <p>类型不是负担，而是可执行的设计说明。</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </div>
  );
}
