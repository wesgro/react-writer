import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/**/*.ts', 'lib/**/*.tsx', '!lib/**/*.test.ts', '!lib/**/*.test.tsx'],
  format: ['esm'],
  dts: {
    build: true,
  },
  outDir: 'dist/lib',
  clean: true,
  external: ['react', 'react-dom'],
  target: 'es2022',
  platform: 'browser',
})
