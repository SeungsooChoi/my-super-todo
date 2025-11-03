import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    '../app/components/**/*.stories.@(ts|tsx|js|jsx)', // ✅ 컴포넌트 스토리 추가
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ]
};
export default config;