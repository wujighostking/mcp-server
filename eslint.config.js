import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: true,
    pnpm: true,
    typescript: true,
    ignores: ['packages/nest'],
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
)
