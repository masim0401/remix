import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "pathe";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "app/components"),
      "@utils": path.resolve(__dirname, "app/utils"),
      "@routes": path.resolve(__dirname, "app/routes"),
      "@context": path.resolve(__dirname, "app/context"),
      "@features": path.resolve(__dirname, "app/features"),
    }
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
