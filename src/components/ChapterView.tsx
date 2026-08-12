import type { Chapter } from '../content/curriculum';
import { DemoCard } from './DemoCard';

interface ChapterViewProps {
  chapter: Chapter;
  compact?: boolean;
}

export function ChapterView({ chapter, compact = false }: ChapterViewProps) {
  return (
    <section className={compact ? 'chapter chapter-compact' : 'chapter'} id={chapter.slug}>
      <div className="chapter-heading">
        <div className="chapter-index">{String(chapter.order).padStart(2, '0')}</div>
        <div>
          <div className="chapter-meta"><span>{chapter.level}</span>{chapter.eyebrow}</div>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </div>
      </div>
      <div className="demo-grid">
        {chapter.demos.map((demo, index) => <DemoCard key={demo.id} demo={demo} index={index} />)}
      </div>
    </section>
  );
}
