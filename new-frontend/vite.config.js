import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        store: './store.html',
        blog: './blog/index.html'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})

