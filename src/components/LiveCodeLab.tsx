import { useCallback, useEffect, useRef, useState } from 'react';
import { initialize, transform } from 'esbuild-wasm';
import wasmUrl from 'esbuild-wasm/esbuild.wasm?url';

type EditorTab = 'typescript' | 'html' | 'css';

const INITIAL = {
  typescript: `type Skill = {\n  name: string;\n  level: '基础' | '进阶' | '高级';\n};\n\nconst skills: Skill[] = [\n  { name: '泛型', level: '进阶' },\n  { name: '类型体操', level: '高级' },\n  { name: 'React', level: '进阶' },\n];\n\nconst cards = skills.map(({ name, level }, index) => \`\n  <button class="skill-card" data-index="\${index}">\n    <span>0\${index + 1}</span>\n    <strong>\${name}</strong>\n    <small>\${level}</small>\n  </button>\n\`).join('');\n\nrender(\`<div class="skill-grid">\${cards}</div><p id="message">点击一张卡片</p>\`);\n\ndocument.querySelectorAll<HTMLButtonElement>('.skill-card').forEach(button => {\n  button.addEventListener('click', () => {\n    const skill = skills[Number(button.dataset.index)];\n    document.querySelector('#message')!.textContent =\n      skill ? \`正在学习：\${skill.name}（\${skill.level}）\` : '未知课程';\n  });\n});`,
  html: `<main class="demo-app">\n  <p class="eyebrow">LIVE TYPESCRIPT LAB</p>\n  <h1>今天学点什么？</h1>\n  <div id="app"></div>\n</main>`,
  css: `* { box-sizing: border-box; }\nbody { margin: 0; min-height: 100vh; padding: 42px; color: #172033; background: #f4f1e9; font-family: system-ui, sans-serif; }\n.demo-app { max-width: 720px; margin: auto; }\n.eyebrow { color: #ff6b35; font: 700 11px monospace; letter-spacing: .14em; }\nh1 { margin: 12px 0 30px; font-size: clamp(36px, 7vw, 68px); line-height: .95; letter-spacing: -.06em; }\n.skill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n.skill-card { min-height: 145px; padding: 18px; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; color: white; background: #172033; border: 0; cursor: pointer; transition: transform .2s, background .2s; }\n.skill-card:hover { transform: translateY(-4px); background: #2563eb; }\n.skill-card span, .skill-card small { color: #d9f99d; font: 11px monospace; }\n.skill-card strong { font-size: 21px; }\n#message { margin-top: 12px; padding: 15px; background: #d9f99d; font-weight: 700; }\n@media (max-width: 560px) { body { padding: 24px; } .skill-grid { grid-template-columns: 1fr; } .skill-card { min-height: 105px; } }`,
} as const;

let compilerReady: Promise<void> | undefined;

function prepareCompiler() {
  compilerReady ??= initialize({ wasmURL: wasmUrl, worker: true });
  return compilerReady;
}

function escapeScript(value: string) {
  return value.replaceAll('</script', '<\\/script');
}

export function LiveCodeLab() {
  const [activeTab, setActiveTab] = useState<EditorTab>('typescript');
  const [source, setSource] = useState({ ...INITIAL });
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('等待进入实验区…');
  const [autoRun, setAutoRun] = useState(true);
  const [activated, setActivated] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const labRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const buildId = useRef(0);

  const run = useCallback(async () => {
    const currentBuild = ++buildId.current;
    setStatus('编译中…');
    setLogs([]);
    try {
      await prepareCompiler();
      const result = await transform(source.typescript, {
        loader: 'ts',
        target: 'es2022',
        format: 'iife',
        sourcemap: false,
      });
      if (currentBuild !== buildId.current) return;

      const bridge = `
        const send = (type, value) => parent.postMessage({ source: 'ts-live-lab', type, value }, '*');
        const originalLog = console.log;
        console.log = (...args) => { originalLog(...args); send('log', args.map(String).join(' ')); };
        window.addEventListener('error', event => send('error', event.message));
        window.addEventListener('unhandledrejection', event => send('error', String(event.reason)));
        const app = document.querySelector('#app');
        const render = html => { if (app) app.innerHTML = html; };
      `;
      setPreview(`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${source.css}</style></head><body>${source.html}<script>${escapeScript(bridge + result.code)}<\/script></body></html>`);
      setStatus('运行成功');
    } catch (error) {
      if (currentBuild !== buildId.current) return;
      const message = error instanceof Error ? error.message : String(error);
      setStatus('编译失败');
      setLogs([message]);
    }
  }, [source]);

  useEffect(() => {
    if (!autoRun || !activated) return;
    const timer = window.setTimeout(() => void run(), 500);
    return () => window.clearTimeout(timer);
  }, [activated, autoRun, run]);

  useEffect(() => {
    const section = labRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setActivated(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function receive(event: MessageEvent<unknown>) {
      if (event.source !== iframeRef.current?.contentWindow || typeof event.data !== 'object' || event.data === null) return;
      const message = event.data as { source?: string; type?: string; value?: string };
      if (message.source !== 'ts-live-lab' || !message.value) return;
      setLogs(items => [...items.slice(-5), `${message.type === 'error' ? '错误' : '日志'}：${message.value}`]);
      if (message.type === 'error') setStatus('运行错误');
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);

  function update(value: string) {
    setSource(current => ({ ...current, [activeTab]: value }));
  }

  function reset() {
    setSource({ ...INITIAL });
    setActiveTab('typescript');
  }

  return (
    <section ref={labRef} className="live-lab" id="live-code">
      <div className="live-lab-heading">
        <div>
          <span className="kicker">动手练习 / Live code</span>
          <h2>左边写 TypeScript，<br />右边看真实效果。</h2>
        </div>
        <p>代码只在你的浏览器中编译，并运行在隔离的预览框里。可以同时修改 TypeScript、HTML 和 CSS，适合快速验证刚学到的写法。</p>
      </div>

      <div className="live-workbench">
        <div className="live-editor">
          <div className="live-toolbar">
            <div className="editor-tabs" role="tablist" aria-label="代码类型">
              {(['typescript', 'html', 'css'] as const).map(tab => (
                <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                  {tab === 'typescript' ? 'TypeScript' : tab.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="reset-code" type="button" onClick={reset}>恢复示例</button>
          </div>
          <label className="editor-textarea">
            <span className="sr-only">{activeTab} 代码</span>
            <textarea value={source[activeTab]} onChange={event => update(event.target.value)} spellCheck={false} aria-label={`${activeTab} 代码`} />
          </label>
          <div className="editor-status">
            <span className={status.includes('失败') || status.includes('错误') ? 'error' : ''}>● {status}</span>
            <label><input type="checkbox" checked={autoRun} onChange={event => setAutoRun(event.target.checked)} /> 自动运行</label>
            <button type="button" onClick={() => void run()}>运行 ▶</button>
          </div>
        </div>

        <div className="live-preview">
          <div className="preview-toolbar"><span>效果预览</span><i>隔离运行</i></div>
          <iframe ref={iframeRef} title="TypeScript 代码运行效果" sandbox="allow-scripts" srcDoc={preview} />
          {logs.length > 0 && <pre className="live-console">{logs.join('\n')}</pre>}
        </div>
      </div>
      <p className="live-lab-note">支持浏览器 API 和 TypeScript 语法；为保证静态站安全，预览区不支持 npm 包导入或访问主页面。完整工程仍建议在本地项目中运行。</p>
    </section>
  );
}
