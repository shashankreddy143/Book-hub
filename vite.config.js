import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to treat .js files as JSX (required for CCBP .js file convention)
function jsxInJsPlugin() {
  return {
    name: 'jsx-in-js',
    transform(src, id) {
      if (id.endsWith('.js') && !id.includes('node_modules')) {
        return {
          code: src,
          map: null,
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}',
    }),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
