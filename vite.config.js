import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 1,
          features: {},
        }),
      ],
    },
  },
  base: '/vitaforge/',
});
