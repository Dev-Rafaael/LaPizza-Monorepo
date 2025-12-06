import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@packages": path.resolve(__dirname, "../../Packages")
    },
    dedupe: ["react", "react-dom"]
  }
})
