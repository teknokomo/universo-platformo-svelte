import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 5173
    },
    ssr: {
        // Ensure workspace TypeScript packages are bundled/transpiled by Vite
        // rather than externalized (which would fail since they expose .ts source)
        noExternal: ['@universo/auth-srv', '@universo/start-srv', '@universo/start-frt']
    }
})
