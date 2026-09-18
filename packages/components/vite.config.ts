import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ include: ['src'], exclude: ['src/**/*.test.*', 'src/**/*.stories.*'] })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      // Single bundled CSS file (dist/style.css) and a single JS bundle,
      // traded for build reliability over per-component code splitting
      // (preserveModules + a fixed lib fileName proved unreliable together).
      cssFileName: 'style',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
