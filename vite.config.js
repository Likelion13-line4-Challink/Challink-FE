import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // 새 버전 생기면 자동 업데이트
      includeAssets: [
        "favicons/favicon.ico",
        "favicons/apple-touch-icon.png",
        "favicons/favicon-96x96.png",
        "favicons/favicon.svg",
      ],
      manifest: {
        name: "Challink",
        short_name: "Challink",
        description: "멋쟁이사자처럼 13기 4호선톤 Challink 웹사이트",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: { port: 5137 },
  preview: { port: 5137 },
  build: { outDir: "dist" },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@apis", replacement: "/src/apis" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@types", replacement: "/src/types" },
      { find: "@mocks", replacement: "/src/mocks" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@store", replacement: "/src/store" },
    ],
  },
});
