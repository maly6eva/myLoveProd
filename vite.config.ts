import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // нужно для тестов React
        globals: true,        // чтобы не импортировать describe/it/expect
        setupFiles: './src/setupTests.ts', // файл для jest-dom
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://social-network.samuraijs.com/api/1.0',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },

})