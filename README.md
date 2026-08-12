# TypeScript Study · 2026

一个基于 **TypeScript 7** 的现代中文学习项目。项目同时提供可搜索的 Demo 站和 Storybook 详细文档；旧版 `stage01`–`stage12` 保留为历史对照材料。

## 现在包含什么

- 11 个系统章节、58 个独立 Demo
- 基础类型、函数、对象、接口、联合类型与收窄
- 类、泛型、类型操作、模板字面量、条件类型与 `infer`
- 内置工具类型、ESM、异步结果、`using` 与声明文件
- `satisfies`、const 泛型、标准装饰器和 TypeScript 7 迁移基线
- TSConfig 严格模式、模块解析、产物策略与项目引用
- 全文搜索、难度筛选、代码复制和类型推断实验台
- Storybook 自动文档与可独立托管的静态产物

> “每个 API 都有 Demo”在这里指课程覆盖的每个语言特性与高频类型 API 都有独立示例。TypeScript Compiler API 是另一套用于构建工具的低层 API；TypeScript 7 已将它迁移到新的不稳定原生 API 路径，因此本项目不把不稳定接口混入入门课程。

## 本地运行

环境要求：Node.js 20+、npm 10+。

```bash
npm install
npm run dev
```

Demo 站默认位于 <http://localhost:5173>。

另开一个终端启动 Storybook：

```bash
npm run storybook
```

Storybook 默认位于 <http://localhost:6006>。

## 验证与构建

```bash
# TypeScript 7 严格类型检查
npm run typecheck

# 只生成 Demo 站到 dist/
npm run build

# 只生成 Storybook 到 storybook-static/
npm run build-storybook

# 生成一个可整体部署的 dist/（Storybook 位于 dist/storybook/）
npm run build:all
```

`npm run build:all` 后可将整个 `dist/` 发布到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或任意静态文件服务器。Vite 使用相对资源路径，因此部署到仓库子路径也能正常加载。

## 项目结构

```text
.
├── .storybook/            # Storybook 10 配置
├── src/
│   ├── components/        # Demo 卡片、章节视图、类型实验台
│   ├── content/           # 课程与全部示例的单一数据源
│   ├── stories/           # Storybook 欢迎页、课程和工具故事
│   └── App.tsx            # 可搜索的静态 Demo 站
├── stage01 ... stage12/   # 原项目历史示例（不参与现代构建）
├── tsconfig.app.json      # 浏览器应用严格配置
└── tsconfig.node.json     # Vite / Storybook 配置文件检查
```

## 学习建议

1. 初学者按 01 → 11 顺序学习，并亲手修改卡片里的代码。
2. 有经验的开发者可从“类型操作”“现代实践”和“TSConfig”开始。
3. 复制示例到 `src/` 中实验，然后运行 `npm run typecheck` 查看 TypeScript 7 的真实诊断。
4. 对照旧 `stage` 示例观察 `var`、CommonJS、ES5 target 和旧装饰器写法为什么不再适合作为现代默认值。

## 技术基线

- TypeScript 7.0.2
- Storybook 10.5.7
- React 19.2.8
- Vite 8.2.1

参考：[TypeScript 文档](https://www.typescriptlang.org/docs/)、[Storybook 文档](https://storybook.js.org/docs/)、[Vite 文档](https://vite.dev/guide/)。
