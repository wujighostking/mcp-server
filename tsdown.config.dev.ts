import type { UserConfig } from 'tsdown'
import { readdirSync } from 'node:fs'
import { defineConfig } from 'tsdown'

export const config: UserConfig[] = readdirSync('./packages').filter(dir => dir !== 'nest').map(dir => ({
  platform: 'node',
  format: 'esm',
  dts: { build: true },
  minify: false,
  clean: true,
  sourcemap: true,
  entry: `./packages/${dir}/src/index.ts`,
  outDir: `./packages/${dir}/dist`,
  watch: `./packages/${dir}/src`,
}))

export default defineConfig(config)
