import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// 전역 reset은 앱 전체 스타일을 바꾸므로 dist/style.css에 묶지 않고 dist/reset.css로 따로 내보낸다.
// 소비자 앱이 원할 때만 `@aninganing/react/reset.css`를 import한다.
const emitResetCss = (): Plugin => ({
  name: 'emit-reset-css',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'reset.css',
      source: readFileSync(new URL('./src/styles/reset.css', import.meta.url), 'utf8'),
    });
  },
});

// 런타임 의존성은 번들에 넣지 않고 소비자 앱이 설치/중복 제거하게 둔다.
// @aninganing/tokens는 CSS 변수만 쓰므로 dist/style.css에 번들한다(외부화하지 않음).
const external = [
  /^react($|\/)/,
  /^react-dom($|\/)/,
  'clsx',
  'class-variance-authority',
  '@aninganing/utils',
  /^@radix-ui\//,
];

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/**/*.test.*', 'src/**/*.stories.*'] }),
    emitResetCss(),
  ],
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
      external,
      output: {
        // 컴포넌트가 hook·이벤트 핸들러를 쓰므로 Next.js App Router 등 React Server Components 환경에서
        // 클라이언트 컴포넌트로 다뤄지도록 번들 맨 위에 지시문을 붙인다. 소스 파일에 직접 쓰면 Rollup이
        // 번들 과정에서 지운다.
        banner: "'use client';",
      },
    },
  },
});
