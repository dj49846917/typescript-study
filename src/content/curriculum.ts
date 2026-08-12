export type Level = '基础' | '进阶' | '工程';

export interface Demo {
  id: string;
  title: string;
  summary: string;
  code: string;
  result: string;
  note?: string;
}

export interface Chapter {
  slug: string;
  order: number;
  title: string;
  eyebrow: string;
  description: string;
  level: Level;
  demos: Demo[];
}

export const chapters: Chapter[] = [
  {
    slug: 'basic-types',
    order: 1,
    title: '类型系统起点',
    eyebrow: 'Types · Literals · unknown · never',
    description: '从 JavaScript 值出发，理解 TypeScript 如何描述值的集合，以及安全边界为什么应优先使用 unknown。',
    level: '基础',
    demos: [
      {
        id: 'primitives',
        title: '原始类型与推断',
        summary: '能推断时不重复标注；类型注解用于表达边界。',
        code: `const course = 'TypeScript 7'; // string\nconst lessons: number = 12;\nconst published: boolean = true;\nconst token: symbol = Symbol('lesson');\nconst huge: bigint = 9_007_199_254_740_991n;`,
        result: 'string · number · boolean · symbol · bigint',
      },
      {
        id: 'arrays-tuples',
        title: '数组、只读数组与元组',
        summary: '元组记录位置语义，readonly 阻止意外写入。',
        code: `const scores: number[] = [92, 88, 100];\nconst tags: ReadonlyArray<string> = ['type', 'safe'];\nconst point: readonly [x: number, y: number] = [12, 24];`,
        result: 'scores[0] → 92 · point.y → 24',
      },
      {
        id: 'literal-union',
        title: '字面量与联合类型',
        summary: '把可选状态收窄为有限集合，编辑器可自动补全。',
        code: `type Theme = 'light' | 'dark' | 'system';\nlet theme: Theme = 'system';\n\ntype Id = string | number;\nconst lessonId: Id = 7;`,
        result: 'theme 只能是 3 个合法值之一',
      },
      {
        id: 'unknown-any',
        title: 'unknown 与 any',
        summary: 'unknown 要先检查才能使用；any 会关闭类型检查。',
        code: `function label(value: unknown): string {\n  if (typeof value === 'string') return value.toUpperCase();\n  if (typeof value === 'number') return value.toFixed(2);\n  return '未知值';\n}\n\nlabel(3.14159);`,
        result: '3.14',
        note: '在 API 响应、catch 变量和用户输入边界优先使用 unknown。',
      },
      {
        id: 'void-never',
        title: 'void 与 never',
        summary: 'void 表示忽略返回值，never 表示流程不可能正常结束。',
        code: `function log(message: string): void { console.log(message); }\n\nfunction unreachable(value: never): never {\n  throw new Error('未处理的状态: ' + value);\n}`,
        result: 'never 可用于联合类型的穷尽检查',
      },
      {
        id: 'enum-alternative',
        title: '枚举与对象替代方案',
        summary: '现代前端代码通常用 as const 对象获得更直接的运行时结果。',
        code: `const Status = {\n  Draft: 'draft',\n  Published: 'published',\n} as const;\n\ntype Status = (typeof Status)[keyof typeof Status];`,
        result: 'Status → "draft" | "published"',
      },
    ],
  },
  {
    slug: 'functions',
    order: 2,
    title: '函数的类型',
    eyebrow: 'Parameters · Overloads · this',
    description: '函数是最常见的类型边界。本章覆盖参数、返回值、回调、重载与 this 参数。',
    level: '基础',
    demos: [
      {
        id: 'parameters',
        title: '可选、默认与剩余参数',
        summary: '三种参数形式可以组合，但可选参数通常放在必选参数之后。',
        code: `function greet(name: string, prefix = '你好'): string {\n  return \`\${prefix}，\${name}\`;\n}\nfunction sum(...values: number[]): number {\n  return values.reduce((total, value) => total + value, 0);\n}`,
        result: 'greet("小明") → 你好，小明 · sum(1,2,3) → 6',
      },
      {
        id: 'function-type',
        title: '函数类型与回调',
        summary: '用类型别名描述行为，再让多个实现共享契约。',
        code: `type Formatter = (value: number, unit: string) => string;\nconst format: Formatter = (value, unit) => \`\${value} \${unit}\`;\n[1, 2, 3].map(value => format(value, 'px'));`,
        result: '["1 px", "2 px", "3 px"]',
      },
      {
        id: 'overloads',
        title: '函数重载',
        summary: '调用者看到精确签名，实现内部处理全部分支。',
        code: `function normalize(value: string): string;\nfunction normalize(value: string[]): string[];\nfunction normalize(value: string | string[]) {\n  return Array.isArray(value)\n    ? value.map(item => item.trim())\n    : value.trim();\n}`,
        result: '输入 string 得到 string；输入 string[] 得到 string[]',
      },
      {
        id: 'generic-function',
        title: '泛型函数',
        summary: '泛型保留输入与输出之间的类型关系。',
        code: `function first<T>(items: readonly T[]): T | undefined {\n  return items[0];\n}\nconst value = first(['TS', 'React']);`,
        result: 'value 的类型是 string | undefined',
      },
      {
        id: 'this-parameter',
        title: '显式 this 参数',
        summary: 'this 参数只参与类型检查，不会出现在生成的 JavaScript 中。',
        code: `interface Counter { value: number }\nfunction increment(this: Counter, step: number) {\n  this.value += step;\n}\nconst counter = { value: 1, increment };\ncounter.increment(2);`,
        result: 'counter.value → 3',
      },
    ],
  },
  {
    slug: 'objects',
    order: 3,
    title: '对象、接口与类型别名',
    eyebrow: 'interface · type · satisfies',
    description: '建立可靠的数据模型，理解可选/只读属性、索引签名、接口扩展以及结构化类型。',
    level: '基础',
    demos: [
      {
        id: 'object-shape',
        title: '对象形状',
        summary: 'readonly 约束重新赋值，? 表示属性可能不存在。',
        code: `interface Lesson {\n  readonly id: string;\n  title: string;\n  minutes?: number;\n}\nconst intro: Lesson = { id: '01', title: '类型起点' };`,
        result: 'intro.minutes → number | undefined',
      },
      {
        id: 'interface-extension',
        title: '接口扩展与声明合并',
        summary: '接口适合公开且可扩展的对象契约。',
        code: `interface Entity { id: string }\ninterface Timestamped { createdAt: Date }\ninterface Article extends Entity, Timestamped { title: string }\n\ninterface WindowState { theme: string }\ninterface WindowState { locale: string }`,
        result: 'Article 同时拥有 id、createdAt、title',
      },
      {
        id: 'type-composition',
        title: '联合与交叉类型',
        summary: '联合表示“或”，交叉表示“且”。',
        code: `type Success = { ok: true; data: string };\ntype Failure = { ok: false; error: Error };\ntype Response = Success | Failure;\n\ntype Audited = { createdAt: Date } & { updatedAt: Date };`,
        result: 'Response 只能处于成功或失败中的一个完整状态',
      },
      {
        id: 'index-signature',
        title: '索引签名与 Record',
        summary: '描述键名动态、值类型固定的字典。',
        code: `interface Scores { [student: string]: number }\nconst scores: Scores = { 小明: 95, 小红: 98 };\n\ntype Locale = 'zh-CN' | 'en-US';\nconst labels: Record<Locale, string> = {\n  'zh-CN': '你好', 'en-US': 'Hello'\n};`,
        result: 'Record 会检查每一个必需键',
      },
      {
        id: 'satisfies',
        title: 'satisfies 保留精确类型',
        summary: '验证表达式符合约束，同时保留表达式自身的窄类型。',
        code: `type Palette = Record<'primary' | 'danger', string | readonly number[]>;\nconst palette = {\n  primary: '#3178c6',\n  danger: [220, 38, 38],\n} satisfies Palette;\npalette.primary.toUpperCase();`,
        result: 'primary 仍被识别为 string，而不是宽泛的联合类型',
      },
    ],
  },
  {
    slug: 'narrowing',
    order: 4,
    title: '联合类型与收窄',
    eyebrow: 'Guards · Predicates · Exhaustiveness',
    description: '通过控制流分析让联合类型进入安全分支，并用 never 保证新增状态不会漏处理。',
    level: '进阶',
    demos: [
      {
        id: 'built-in-guards',
        title: '内置类型守卫',
        summary: 'typeof、instanceof、in 和相等判断都会触发控制流收窄。',
        code: `function size(value: string | string[] | Date): number {\n  if (typeof value === 'string') return value.length;\n  if (value instanceof Date) return value.getTime();\n  return value.length;\n}`,
        result: '每个分支中的 value 都拥有精确类型',
      },
      {
        id: 'discriminated-union',
        title: '可辨识联合',
        summary: '使用共同的字面量字段建立不会自相矛盾的状态模型。',
        code: `type LoadState =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: string[] }\n  | { status: 'error'; message: string };`,
        result: 'status === "success" 时 data 一定存在',
      },
      {
        id: 'type-predicate',
        title: '自定义类型谓词',
        summary: '谓词把业务判断结果告知类型系统。',
        code: `type User = { name: string };\nfunction isUser(value: unknown): value is User {\n  return typeof value === 'object' && value !== null\n    && 'name' in value && typeof value.name === 'string';\n}\nconst users = values.filter(isUser);`,
        result: 'users 的类型是 User[]',
      },
      {
        id: 'assertion-function',
        title: '断言函数',
        summary: '验证失败时抛错，成功后调用方变量被收窄。',
        code: `function assertDefined<T>(value: T): asserts value is NonNullable<T> {\n  if (value == null) throw new Error('值不能为空');\n}\nlet title: string | undefined = getTitle();\nassertDefined(title);\ntitle.toUpperCase();`,
        result: '断言后 title 是 string',
      },
      {
        id: 'exhaustive',
        title: '穷尽检查',
        summary: '新增联合成员时，让编译器指出所有未更新的分支。',
        code: `function assertNever(value: never): never { throw new Error(String(value)); }\nfunction render(state: LoadState): string {\n  switch (state.status) {\n    case 'idle': return '尚未加载';\n    case 'loading': return '加载中';\n    case 'success': return state.data.join(', ');\n    case 'error': return state.message;\n    default: return assertNever(state);\n  }\n}`,
        result: '遗漏任意 status 时 default 分支会产生类型错误',
      },
    ],
  },
  {
    slug: 'classes',
    order: 5,
    title: '类与面向对象',
    eyebrow: 'Classes · Accessors · abstract',
    description: '类同时存在于类型空间和运行时空间。本章展示字段、访问控制、继承、抽象类和实现接口。',
    level: '进阶',
    demos: [
      {
        id: 'parameter-properties',
        title: '参数属性与访问器',
        summary: '构造参数前的修饰符会同时声明并初始化字段。',
        code: `class Course {\n  #progress = 0;\n  constructor(public readonly title: string, private duration: number) {}\n  get progress() { return this.#progress; }\n  study(minutes: number) {\n    this.#progress = Math.min(100, this.#progress + minutes / this.duration * 100);\n  }\n}`,
        result: '#progress 是 JavaScript 运行时私有字段',
      },
      {
        id: 'inheritance',
        title: '继承与 override',
        summary: 'noImplicitOverride 要求覆盖父类成员时显式写 override。',
        code: `class Animal { move() { return '移动'; } }\nclass Bird extends Animal {\n  override move() { return '飞行'; }\n}\nnew Bird().move();`,
        result: '飞行',
      },
      {
        id: 'abstract-class',
        title: '抽象类',
        summary: '抽象类可共享实现，也可要求子类实现特定行为。',
        code: `abstract class Repository<T> {\n  abstract find(id: string): Promise<T | undefined>;\n  async exists(id: string) { return (await this.find(id)) !== undefined; }\n}`,
        result: '子类必须实现 find，同时自动获得 exists',
      },
      {
        id: 'implements',
        title: 'implements 与静态侧',
        summary: 'implements 只检查实例侧；构造函数等静态成员需单独描述。',
        code: `interface Serializable { toJSON(): string }\nclass Settings implements Serializable {\n  constructor(private theme: string) {}\n  toJSON() { return JSON.stringify({ theme: this.theme }); }\n}`,
        result: 'Settings 实例满足 Serializable 契约',
      },
      {
        id: 'generic-class',
        title: '泛型类',
        summary: '同一实现可以安全承载不同数据类型。',
        code: `class Store<T extends { id: string }> {\n  #items = new Map<string, T>();\n  save(item: T) { this.#items.set(item.id, item); }\n  find(id: string) { return this.#items.get(id); }\n}`,
        result: 'Store<User> 的 find 返回 User | undefined',
      },
    ],
  },
  {
    slug: 'generics',
    order: 6,
    title: '泛型与约束',
    eyebrow: 'Generics · Constraints · Variance',
    description: '泛型不是“任意类型”，而是建立可复用的类型关系；约束则规定这种关系的最低能力。',
    level: '进阶',
    demos: [
      {
        id: 'constraints',
        title: '泛型约束',
        summary: 'extends 让泛型参数至少拥有某些成员。',
        code: `function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\nlongest('Type', 'TypeScript');`,
        result: 'TypeScript',
      },
      {
        id: 'key-constraint',
        title: '键约束',
        summary: 'K extends keyof T 保证访问的键真实存在。',
        code: `function get<T extends object, K extends keyof T>(object: T, key: K): T[K] {\n  return object[key];\n}\nconst course = { title: 'TS', lessons: 12 };\nget(course, 'lessons');`,
        result: '返回值被推断为 number',
      },
      {
        id: 'defaults',
        title: '泛型参数默认值',
        summary: '调用方不提供类型参数时使用合理默认值。',
        code: `interface ApiResponse<Data = unknown, Meta = { requestId: string }> {\n  data: Data;\n  meta: Meta;\n}\ntype UserResponse = ApiResponse<{ name: string }>;`,
        result: 'Meta 自动使用 { requestId: string }',
      },
      {
        id: 'const-generics',
        title: 'const 类型参数',
        summary: '请求更窄的字面量推断，常用于路由、事件和配置 API。',
        code: `function defineRoutes<const T extends readonly string[]>(routes: T): T {\n  return routes;\n}\nconst routes = defineRoutes(['/home', '/settings']);`,
        result: 'routes → readonly ["/home", "/settings"]',
      },
      {
        id: 'generic-interface',
        title: '泛型接口与高阶关系',
        summary: '把分页、状态或容器结构与具体业务数据解耦。',
        code: `interface Page<T> {\n  items: T[];\n  page: number;\n  total: number;\n}\ntype UserPage = Page<{ id: string; name: string }>;`,
        result: '统一分页结构，items 保持具体业务类型',
      },
    ],
  },
  {
    slug: 'type-operators',
    order: 7,
    title: '类型操作与类型体操',
    eyebrow: 'keyof · typeof · mapped · conditional',
    description: '从已有类型派生新类型，减少重复声明，让数据模型随源类型自动演进。',
    level: '进阶',
    demos: [
      {
        id: 'keyof-typeof',
        title: 'keyof 与 typeof',
        summary: 'typeof 从值获取类型，keyof 再获取其键的联合。',
        code: `const defaults = { theme: 'system', pageSize: 20 };\ntype Settings = typeof defaults;\ntype SettingKey = keyof Settings;`,
        result: 'SettingKey → "theme" | "pageSize"',
      },
      {
        id: 'indexed-access',
        title: '索引访问类型',
        summary: '像访问值一样访问类型中的属性。',
        code: `type ApiResult = { users: Array<{ id: string; name: string }> };\ntype Users = ApiResult['users'];\ntype User = Users[number];\ntype UserName = User['name'];`,
        result: 'UserName → string',
      },
      {
        id: 'mapped-types',
        title: '映射类型与键重映射',
        summary: '遍历键，修改修饰符、值类型或键名。',
        code: `type Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]\n};\ntype Model = Getters<{ name: string; age: number }>;`,
        result: 'Model 拥有 getName(): string 与 getAge(): number',
      },
      {
        id: 'conditional-types',
        title: '条件类型与分配',
        summary: '类型层面的条件表达式会对裸类型参数的联合逐项计算。',
        code: `type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;\ntype A = ElementOf<string[]>;\ntype B = ElementOf<number | boolean[]>;`,
        result: 'A → string · B → number | boolean',
      },
      {
        id: 'template-literals',
        title: '模板字面量类型',
        summary: '由已有字面量联合组合出事件名、路径或 CSS 属性。',
        code: `type Field = 'name' | 'email';\ntype EventName = \`\${Field}Changed\`;\ntype Handler = \`on\${Capitalize<EventName>}\`;`,
        result: 'Handler → "onNameChanged" | "onEmailChanged"',
      },
      {
        id: 'infer',
        title: 'infer 提取类型',
        summary: '在条件类型中声明待推断部分。',
        code: `type AwaitedValue<T> = T extends Promise<infer Value> ? Value : T;\ntype Data = AwaitedValue<Promise<{ id: string }>>;`,
        result: 'Data → { id: string }',
      },
    ],
  },
  {
    slug: 'utility-types',
    order: 8,
    title: '内置工具类型',
    eyebrow: 'Partial · Pick · Awaited · ReturnType',
    description: 'TypeScript 标准库提供了一组高频类型变换。每个示例都从真实建模场景出发。',
    level: '进阶',
    demos: [
      {
        id: 'object-utilities',
        title: 'Partial / Required / Readonly',
        summary: '批量修改属性的可选与只读修饰符。',
        code: `type User = { id: string; name?: string };\ntype Patch = Partial<User>;\ntype CompleteUser = Required<User>;\ntype ImmutableUser = Readonly<User>;`,
        result: '适用于更新入参、标准化结果与不可变视图',
      },
      {
        id: 'select-utilities',
        title: 'Pick / Omit / Record',
        summary: '选择、排除或从键集合构造属性。',
        code: `type User = { id: string; name: string; password: string };\ntype PublicUser = Omit<User, 'password'>;\ntype UserLabel = Pick<User, 'id' | 'name'>;\ntype UserMap = Record<string, PublicUser>;`,
        result: 'PublicUser 不再暴露 password',
      },
      {
        id: 'union-utilities',
        title: 'Exclude / Extract / NonNullable',
        summary: '对联合成员做集合运算。',
        code: `type Value = string | number | null | undefined;\ntype Present = NonNullable<Value>;\ntype Text = Extract<Value, string>;\ntype NotText = Exclude<Value, string>;`,
        result: 'Present → string | number',
      },
      {
        id: 'function-utilities',
        title: 'Parameters / ReturnType / ThisParameterType',
        summary: '从函数签名提取参数、返回值和 this。',
        code: `function createUser(name: string, age: number) { return { id: crypto.randomUUID(), name, age }; }\ntype Args = Parameters<typeof createUser>;\ntype User = ReturnType<typeof createUser>;`,
        result: 'Args → [name: string, age: number]',
      },
      {
        id: 'constructor-utilities',
        title: 'ConstructorParameters / InstanceType',
        summary: '从类的静态侧提取构造参数或实例类型。',
        code: `class Point { constructor(public x: number, public y: number) {} }\ntype PointArgs = ConstructorParameters<typeof Point>;\ntype PointInstance = InstanceType<typeof Point>;`,
        result: 'PointArgs → [x: number, y: number]',
      },
      {
        id: 'awaited',
        title: 'Awaited',
        summary: '递归解包 PromiseLike，模拟 await 的类型行为。',
        code: `type Result = Awaited<Promise<Promise<{ ok: true }>>>;\nasync function load() { return { ok: true as const }; }\ntype Loaded = Awaited<ReturnType<typeof load>>;`,
        result: 'Result 与 Loaded 都得到内部值类型',
      },
    ],
  },
  {
    slug: 'modules-async',
    order: 9,
    title: '模块、异步与资源',
    eyebrow: 'ESM · type imports · Promise · using',
    description: '采用现代 ESM 组织代码，区分类型和值导入，并正确描述异步流程与可释放资源。',
    level: '工程',
    demos: [
      {
        id: 'type-imports',
        title: '类型导入与 verbatimModuleSyntax',
        summary: 'import type 明确导入仅供类型检查，编译后会被移除。',
        code: `import { createClient } from './client.js';\nimport type { ClientOptions, User } from './types.js';\n\nconst options: ClientOptions = { timeout: 3000 };\nconst client = createClient(options);`,
        result: '生成的 JavaScript 只保留 createClient 导入',
      },
      {
        id: 'dynamic-import',
        title: '动态导入',
        summary: 'import() 返回 Promise，并保留模块的完整类型。',
        code: `async function loadEditor() {\n  const { createEditor } = await import('./editor.js');\n  return createEditor();\n}`,
        result: '编辑器模块只在需要时加载',
      },
      {
        id: 'async-result',
        title: '异步结果建模',
        summary: '把成功和失败作为可辨识联合，避免调用方依赖异常文本。',
        code: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error };\nasync function safe<T>(task: Promise<T>): Promise<Result<T>> {\n  try { return { ok: true, value: await task }; }\n  catch (error) { return { ok: false, error: error instanceof Error ? error : new Error(String(error)) }; }\n}`,
        result: '调用方检查 ok 后即可安全访问 value 或 error',
      },
      {
        id: 'using',
        title: 'using 与 Disposable',
        summary: '离开作用域时自动释放资源，适合文件句柄、锁或临时连接。',
        code: `class Trace implements Disposable {\n  constructor(private name: string) { console.time(name); }\n  [Symbol.dispose]() { console.timeEnd(this.name); }\n}\n{\n  using trace = new Trace('parse');\n  // 离开此块时自动调用 trace[Symbol.dispose]()\n}`,
        result: '资源生命周期与词法作用域一致',
        note: '运行环境需要支持显式资源管理，或由构建工具提供降级转换。',
      },
      {
        id: 'declarations',
        title: '声明文件与模块扩充',
        summary: '.d.ts 描述已有 JavaScript 的公共类型，不会产生运行时代码。',
        code: `// analytics.d.ts\ndeclare module 'analytics' {\n  export interface Event { name: string; properties?: Record<string, unknown> }\n  export function track(event: Event): void;\n}`,
        result: '无类型的 JavaScript 包获得编辑器提示与编译检查',
      },
    ],
  },
  {
    slug: 'modern-features',
    order: 10,
    title: '现代 TypeScript 实践',
    eyebrow: 'TS 4.9 → 7.0 · Modern patterns',
    description: '聚焦近代版本中最值得带回项目的能力，以及面向 TypeScript 7 的迁移习惯。',
    level: '工程',
    demos: [
      {
        id: 'satisfies-modern',
        title: '配置校验：satisfies',
        summary: '配置对象既得到约束检查，又保留字面量信息。',
        code: `type Route = { path: \`/\${string}\`; auth: boolean };\nconst routes = {\n  home: { path: '/', auth: false },\n  profile: { path: '/profile', auth: true },\n} satisfies Record<string, Route>;`,
        result: 'routes.profile.path 保持字面量 "/profile"',
      },
      {
        id: 'const-generics-modern',
        title: 'API 设计：const 泛型',
        summary: '库作者无需要求调用方到处书写 as const。',
        code: `function event<const Name extends string, const Payload>(name: Name, payload: Payload) {\n  return { name, payload } as const;\n}\nconst saved = event('course:saved', { id: 'ts-7' });`,
        result: 'name 精确为 "course:saved"',
      },
      {
        id: 'decorators',
        title: '标准装饰器',
        summary: '现代装饰器使用 value + context 模型，不等同于旧 experimentalDecorators。',
        code: `function logged<This, Args extends unknown[], Return>(\n  target: (this: This, ...args: Args) => Return,\n  context: ClassMethodDecoratorContext<This>\n+) {\n  return function (this: This, ...args: Args) {\n    console.log(\`调用 \${String(context.name)}\`);\n    return target.call(this, ...args);\n  };\n}`,
        result: '方法签名被完整保留，调用时输出日志',
      },
      {
        id: 'safety-flags',
        title: '严格标志组合',
        summary: 'strict 之外，再启用三个对真实项目很有价值的检查。',
        code: `{\n  "noUncheckedIndexedAccess": true,\n  "exactOptionalPropertyTypes": true,\n  "noUncheckedSideEffectImports": true\n}`,
        result: '索引访问、可选属性与副作用导入更接近真实运行行为',
      },
      {
        id: 'ts7-migration',
        title: 'TypeScript 7 迁移基线',
        summary: '使用 bundler/NodeNext 解析、显式 ESM 和现代 target，清理已移除的旧选项。',
        code: `{\n  "target": "ES2024",\n  "module": "ESNext",\n  "moduleResolution": "bundler",\n  "verbatimModuleSyntax": true,\n  "strict": true,\n  "noEmit": true\n}`,
        result: '适合由 Vite 等构建器负责产物的现代浏览器项目',
      },
    ],
  },
  {
    slug: 'tsconfig',
    order: 11,
    title: 'TSConfig 工程配置',
    eyebrow: 'Compiler options · Project references',
    description: '编译选项决定类型系统与运行平台的边界。这里展示现代前端项目最关键的选项组合。',
    level: '工程',
    demos: [
      {
        id: 'runtime-boundary',
        title: 'target / lib / module',
        summary: 'target 控制语法输出，lib 描述可用运行时 API，module 控制模块格式。',
        code: `{\n  "target": "ES2024",\n  "lib": ["ES2024", "DOM", "DOM.Iterable"],\n  "module": "ESNext"\n}`,
        result: '类型环境与现代浏览器运行边界对齐',
      },
      {
        id: 'module-resolution',
        title: 'moduleResolution',
        summary: '前端打包器选 bundler；直接由 Node.js 执行的 ESM 选 NodeNext。',
        code: `// Vite / webpack / esbuild\n{ "moduleResolution": "bundler" }\n\n// Node.js 直接执行\n{ "module": "NodeNext", "moduleResolution": "NodeNext" }`,
        result: '不要把浏览器与 Node 两类解析规则混在一个配置中',
      },
      {
        id: 'strict-family',
        title: 'strict 家族',
        summary: 'strict 是一组安全检查的总开关，新项目应默认开启。',
        code: `{\n  "strict": true,\n  "noImplicitOverride": true,\n  "noFallthroughCasesInSwitch": true,\n  "noUncheckedIndexedAccess": true,\n  "exactOptionalPropertyTypes": true\n}`,
        result: '尽早暴露空值、隐式 any、索引越界和覆盖错误',
      },
      {
        id: 'emit-options',
        title: '类型检查与产物生成',
        summary: '应用常由 Vite 产出 JS，因此 tsc 只检查；库则需要声明文件。',
        code: `// 应用\n{ "noEmit": true }\n\n// npm 库\n{\n  "declaration": true,\n  "declarationMap": true,\n  "emitDeclarationOnly": true,\n  "outDir": "./dist"\n}`,
        result: '按项目角色选择输出策略',
      },
      {
        id: 'references',
        title: '项目引用',
        summary: '大型仓库可拆分配置、缓存构建并明确依赖方向。',
        code: `{\n  "files": [],\n  "references": [\n    { "path": "./tsconfig.app.json" },\n    { "path": "./tsconfig.node.json" }\n  ]\n}`,
        result: 'tsc -b 按引用图检查多个子项目',
      },
    ],
  },
];

export const demoCount = chapters.reduce((count, chapter) => count + chapter.demos.length, 0);

export function findChapter(slug: string): Chapter {
  const chapter = chapters.find(item => item.slug === slug);
  if (!chapter) throw new Error(`未知章节：${slug}`);
  return chapter;
}
