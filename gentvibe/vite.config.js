import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // enables PWA during `npm run dev`
      },
      manifest: {
        name: "Icloud",
        short_name: "Icloud",
        description: "Apple products selling platform ",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [  
          {
            src: "/public/icons/appstore.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pubic/icons/playstore.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
});
