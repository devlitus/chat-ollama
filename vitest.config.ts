import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@handlers": "/src/handlers",
      "@libs": "/src/libs",
      "@tests": "/src/tests",
      "@utils": "/src/utils",
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
