import type { Meta, StoryObj } from '@storybook/react-vite';
import { chapters, demoCount } from '../content/curriculum';

function Welcome() {
  return (
    <div className="docs-welcome">
      <div className="docs-hero">
        <span className="kicker">TypeScript Study · 2026 Edition</span>
        <h1>TypeScript 7<br />现代中文学习手册</h1>
        <p>这不是 API 名称的堆砌，而是一套可以直接运行、观察和复制的课程。左侧“课程”目录包含从基础类型到 TSConfig 的 {chapters.length} 章、{demoCount} 个独立示例。</p>
      </div>
      <div className="docs-guide">
        <div><strong>01</strong><h2>怎么学习</h2><p>按左侧章节顺序阅读；每张卡片先看目标，再运行或修改代码。遇到陌生的类型操作，可以回到“类型操作与类型体操”章节。</p></div>
        <div><strong>02</strong><h2>怎么运行</h2><p><code>npm run storybook</code> 启动文档；<code>npm run dev</code> 启动可搜索 Demo 站；<code>npm run build-storybook</code> 生成纯静态文档。</p></div>
        <div><strong>03</strong><h2>版本边界</h2><p>新课程使用 TypeScript 7、ESM、严格模式与现代浏览器目标。原 stage01–12 是历史示例，保留用于对照，不参与根项目类型检查。</p></div>
      </div>
      <div className="docs-path">
        {chapters.map(chapter => (
          <div key={chapter.slug}><span>{String(chapter.order).padStart(2, '0')}</span><strong>{chapter.title}</strong><small>{chapter.demos.length} DEMOS · {chapter.level}</small></div>
        ))}
      </div>
      <style>{`
        .docs-welcome{min-height:100vh;padding:clamp(32px,7vw,100px);background:#f4f1e9;color:#172033}.docs-hero{max-width:1000px}.docs-hero h1{margin:18px 0 30px;font-size:clamp(48px,8vw,108px);line-height:.95;letter-spacing:-.065em}.docs-hero p{max-width:760px;color:#586276;font-size:17px;line-height:1.9}.docs-guide{margin:70px 0;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(23,32,51,.2);border-left:1px solid rgba(23,32,51,.2)}.docs-guide>div{padding:30px;border-right:1px solid rgba(23,32,51,.2);border-bottom:1px solid rgba(23,32,51,.2)}.docs-guide strong,.docs-path span{color:#ff6b35;font:600 12px 'IBM Plex Mono',monospace}.docs-guide h2{font-size:20px}.docs-guide p{color:#667085;font-size:13px;line-height:1.7}.docs-guide code{background:#d9f99d;padding:2px 4px}.docs-path{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(23,32,51,.15)}.docs-path>div{padding:18px 22px;display:grid;grid-template-columns:38px 1fr auto;gap:12px;background:white}.docs-path small{color:#788195;font:10px 'IBM Plex Mono',monospace}@media(max-width:760px){.docs-guide{grid-template-columns:1fr}.docs-path{grid-template-columns:1fr}.docs-path>div{grid-template-columns:30px 1fr}.docs-path small{grid-column:2}}
      `}</style>
    </div>
  );
}

const meta = {
  title: '开始/欢迎',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'TypeScript Study 的课程入口、学习方式、版本边界与完整目录。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 课程首页: Story = {};
