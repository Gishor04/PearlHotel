import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Dynamically read PORT from backend/.env so Vite proxy target NEVER mismatches!
let backendPort = 5000;
try {
  const envPath = path.resolve(__dirname, '../backend/.env');
  if (fs.existsSync(envPath)) {
    const envText = fs.readFileSync(envPath, 'utf-8');
    const match = envText.match(/PORT=(\d+)/);
    if (match) {
      backendPort = parseInt(match[1], 10);
    }
  }
} catch (e) {
  console.warn('Could not read backend/.env PORT, defaulting to 5000');
}

console.log(`[Vite Config]: Proxying /api to http://127.0.0.1:${backendPort}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${backendPort}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
