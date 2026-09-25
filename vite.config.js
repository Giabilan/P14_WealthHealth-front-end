import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      // Le package local ../Modal résout React depuis le frontend
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * Sépare les gros vendors pour un cache long-terme
         * et pour que TanStack ne soit pas dans le JS initial de Create Employee.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("@tanstack")) {
            return "tanstack-table";
          }

          if (
            id.includes("@reduxjs") ||
            id.includes("react-redux") ||
            id.includes("/redux") ||
            id.includes("immer") ||
            id.includes("reselect")
          ) {
            return "redux";
          }

          if (id.includes("react-router")) {
            return "router";
          }

          if (
            id.includes("/react-dom") ||
            id.includes("/react/") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
