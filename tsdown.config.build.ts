import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import { config } from './tsdown.config.dev.ts'

export default defineConfig((config as UserConfig[]).map((option: UserConfig) => ({ ...option, minify: true, watch: false })))
