import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;
                    if (id.includes("react-dom") || id.includes("react-router")) {
                        return "react-vendor";
                    }
                    if (id.includes("@reduxjs") || id.includes("/redux")) {
                        return "redux-vendor";
                    }
                    if (id.includes("firebase")) {
                        return "firebase-vendor";
                    }
                    if (id.includes("chart.js") || id.includes("react-chartjs")) {
                        return "charts-vendor";
                    }
                    if (id.includes("swiper")) {
                        return "swiper-vendor";
                    }
                    return "vendor";
                },
            },
        },
    },
});
