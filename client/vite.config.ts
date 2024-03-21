import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import dotenv from 'dotenv'

dotenv.config();
const react_env_key = [
    "REACT_APP_THEME_COLOR",
    "REACT_APP_AUTH0_DOMAIN", 
    "REACT_APP_AUTH0_CLIENT_ID",  
    "REACT_APP_AUTH0_API_TOKEN", 
    "REACT_APP_FIREBASE_APIKEY",
    "REACT_APP_FIREBASE_AUTHDOMAIN",
    "REACT_APP_FIREBASE_PROJECTID",
    "REACT_APP_FIREBASE_STORAGEBUCKET",
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    "REACT_APP_FIREBASE_APPID",
    "REACT_APP_PDFJS_WORKER_URL",
    "REACT_APP_DO_ACCESS_KEY_ID",
    "REACT_APP_DO_SECRET_ACCESS_KEY",
    "REACT_APP_DO_BUCKET",  
    "REACT_APP_DO_ENDPOINT",
    "REACT_APP_DO_REGION"
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const processEnv: Record<string, any> = {}; // Use Record<string, any> for indexing
    react_env_key.forEach(key => processEnv[key] = env[key] as any); // Type assertion
    return {
        define: {'process.env' : processEnv},
        plugins: [react(), mkcert()],
        server: {
            https: true,
            host: true,
            port: 5173,
            proxy: {
                '/api/': {
                    target: process.env.REACT_APP_SERVER_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '/api')
                },
                '/py/': {
                    target: process.env.REACT_APP_PY_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/py/, '/py')
                }
            }
        }
    }
})
