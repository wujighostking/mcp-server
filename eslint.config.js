import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: true,
    pnpm: true,
    typescript: true,
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
)
