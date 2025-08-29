//：导入 ESLint 的全局忽略配置功能
import { globalIgnores } from 'eslint/config'
//：导入 Vue TypeScript 配置工具
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
//：导入 Vue 文件的 ESLint 插件
import pluginVue from 'eslint-plugin-vue'
//：导入 Vitest 测试框架的 ESLint 插件
import pluginVitest from '@vitest/eslint-plugin'
//：导入跳过格式化配置（与 Prettier 配合使用）
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  //文件匹配规则：指定需要检查的文件类型
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  //忽略目录:忽略构建输出和测试覆盖目录
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  //Vue 基础配置：使用 Vue 插件的基础规则
  pluginVue.configs['flat/essential'],
  //使用 Vue + TypeScript 的推荐规则
  vueTsConfigs.recommended,
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index']
        }
      ],
      'vue/no-setup-props-destructure': ['off']
    }
  },
  //为测试文件应用 Vitest 推荐规则
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },
  //跳过格式化：与 Prettier 配合，避免 ESLint 与 Prettier 冲突
  skipFormatting
)
