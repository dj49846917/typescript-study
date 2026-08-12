import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypePlayground } from '../components/TypePlayground';

const meta = {
  title: '工具/类型推断实验台',
  component: TypePlayground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '通过四个可切换实验先预测类型，再展开 TypeScript 7 的推断答案与原理说明。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypePlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 即时转译: Story = {};
