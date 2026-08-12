import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCaseStudies } from '../components/ProjectCaseStudies';

const meta = {
  title: '项目实战/Payment Admin 类型重构',
  component: ProjectCaseStudies,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '基于 payment-admin 的 API 与页面代码提炼的 TypeScript 对比案例。业务标识已概括，原项目文件不会被修改。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 完整对比案例: Story = {};
