import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // tailwindcss() scans your files for class names and generates the CSS for them.
  plugins: [react(), tailwindcss()],
})
