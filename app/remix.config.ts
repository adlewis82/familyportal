import { defineConfig } from "@remix-run/dev";

export default defineConfig({
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  ignoredRouteFiles: ["**/.*"],
});