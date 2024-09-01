import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
	server: {
		proxy: {
			'/api': {
				target: 'https://openapi.koreainvestment.com:9443', // 실전
				// target:'https://openapivts.koreainvestment.com:29443',  // 모의
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
