import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@habit-tracker/ui': resolve(rootDir, '../ui/src/index.ts')
    }
  },
  server: {
    port: 5173
  }
})
