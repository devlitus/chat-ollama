// vite.config.ts
/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    alias: {
      "@components": "/src/components",
      "@libs": "/src/libs",
      "@utils": "/src/utils",
      "@handlers": "/src/handlers",
      "@tests": "/src/tests",
    },
  },
});
