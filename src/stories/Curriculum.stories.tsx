import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChapterView } from '../components/ChapterView';
import { findChapter } from '../content/curriculum';

const meta = {
  title: '课程/完整课程',
  component: ChapterView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChapterView>;

export default meta;
type Story = StoryObj<typeof meta>;

function lesson(slug: string, why: string): Story {
  const chapter = findChapter(slug);
  return {
    name: `${String(chapter.order).padStart(2, '0')} · ${chapter.title}`,
    args: { chapter, compact: true },
    parameters: {
      docs: {
        description: {
          story: `${chapter.description}\n\n**学习目标：** ${why}`,
        },
      },
    },
  };
}

export const 基础类型 = lesson('basic-types', '能为 JavaScript 值选择正确类型，理解 unknown、never、字面量联合与只读数据。');
export const 函数 = lesson('functions', '掌握函数边界、回调、重载、this 参数，以及泛型如何保存输入输出关系。');
export const 对象接口 = lesson('objects', '能在 interface 与 type 之间做合适选择，并用 satisfies 校验配置而不丢失推断。');
export const 类型收窄 = lesson('narrowing', '使用控制流分析、自定义谓词、断言函数与 never 穷尽检查构建可靠分支。');
export const 类 = lesson('classes', '理解类的实例侧与静态侧、访问控制、override、抽象成员和泛型类。');
export const 泛型 = lesson('generics', '从“任意类型”转向“类型关系”，熟练使用约束、键参数、默认值与 const 泛型。');
export const 类型操作 = lesson('type-operators', '使用 keyof、typeof、索引访问、映射、条件、模板字面量与 infer 派生类型。');
export const 工具类型 = lesson('utility-types', '把标准工具类型应用于更新入参、公共模型、联合运算、函数与构造器反射。');
export const 模块异步 = lesson('modules-async', '以 ESM 组织类型和值，建立异步结果模型，并了解显式资源管理与声明文件。');
export const 现代实践 = lesson('modern-features', '识别近代 TypeScript 的关键能力，并使用适合 TypeScript 7 的项目习惯。');
export const 工程配置 = lesson('tsconfig', '理解关键编译选项的职责，为浏览器应用、Node.js 项目和 npm 库选择不同配置。');
