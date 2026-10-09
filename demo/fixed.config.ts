import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['demo/fixed.test.ts'],
  },
})
