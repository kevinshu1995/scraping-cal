import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/scrape_api": {
                target: "https://scraping-cal-backend-lab.vercel.app",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/scrape_api/, ""),
            },
        },
    },
});

