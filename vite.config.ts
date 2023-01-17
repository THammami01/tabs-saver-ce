import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
