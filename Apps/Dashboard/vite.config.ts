
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@packages": path.resolve(__dirname, "../../Packages"),
    },
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  }
})
