// vite.config.ts
import react from "file:///C:/Users/Indeed/Desktop/Stuff/Repositories/WebJs/ReactMailing/client/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.1.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Indeed/Desktop/Stuff/Repositories/WebJs/ReactMailing/client/node_modules/.pnpm/vite@4.1.1/node_modules/vite/dist/node/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Indeed\\Desktop\\Stuff\\Repositories\\WebJs\\ReactMailing\\client";
var vite_config_default = defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  plugins: [react()],
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  resolve: {
    alias: [
      {
        find: "@/components",
        replacement: path.resolve(__vite_injected_original_dirname, "src/components")
      },
      { find: "@/shared", replacement: path.resolve(__vite_injected_original_dirname).replace("client", "shared") },
      { find: "@/scripts", replacement: path.resolve(__vite_injected_original_dirname, "src/scripts") }
    ]
  },
  server: { port: 3e3 },
  root: ""
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJbmRlZWRcXFxcRGVza3RvcFxcXFxTdHVmZlxcXFxSZXBvc2l0b3JpZXNcXFxcV2ViSnNcXFxcUmVhY3RNYWlsaW5nXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSW5kZWVkXFxcXERlc2t0b3BcXFxcU3R1ZmZcXFxcUmVwb3NpdG9yaWVzXFxcXFdlYkpzXFxcXFJlYWN0TWFpbGluZ1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0luZGVlZC9EZXNrdG9wL1N0dWZmL1JlcG9zaXRvcmllcy9XZWJKcy9SZWFjdE1haWxpbmcvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7ZGVmaW5lQ29uZmlnfSBmcm9tICd2aXRlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0b3B0aW1pemVEZXBzOiB7XG5cdFx0ZXNidWlsZE9wdGlvbnM6IHtcblx0XHRcdHRhcmdldDogJ2VzMjAyMCcsXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW3JlYWN0KCldLFxuXHRlc2J1aWxkOiB7XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy84NjQ0I2lzc3VlY29tbWVudC0xMTU5MzA4ODAzXG5cdFx0bG9nT3ZlcnJpZGU6IHsndGhpcy1pcy11bmRlZmluZWQtaW4tZXNtJzogJ3NpbGVudCd9LFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZmluZDogJ0AvY29tcG9uZW50cycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcblx0XHRcdH0sXG5cdFx0XHR7ZmluZDogJ0Avc2hhcmVkJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUpLnJlcGxhY2UoJ2NsaWVudCcsICdzaGFyZWQnKX0sXG5cdFx0XHR7ZmluZDogJ0Avc2NyaXB0cycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NjcmlwdHMnKX0sXG5cdFx0XSxcblx0fSxcblx0c2VydmVyOiB7cG9ydDogMzAwMH0sXG5cdHJvb3Q6ICcnLFxufSk7XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1osT0FBTyxXQUFXO0FBQ2xhLFNBQVEsb0JBQW1CO0FBQzNCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixjQUFjO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxNQUNmLFFBQVE7QUFBQSxJQUNUO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQTtBQUFBLElBRVIsYUFBYSxFQUFDLDRCQUE0QixTQUFRO0FBQUEsRUFDbkQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUN0RDtBQUFBLE1BQ0EsRUFBQyxNQUFNLFlBQVksYUFBYSxLQUFLLFFBQVEsZ0NBQVMsRUFBRSxRQUFRLFVBQVUsUUFBUSxFQUFDO0FBQUEsTUFDbkYsRUFBQyxNQUFNLGFBQWEsYUFBYSxLQUFLLFFBQVEsa0NBQVcsYUFBYSxFQUFDO0FBQUEsSUFDeEU7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRLEVBQUMsTUFBTSxJQUFJO0FBQUEsRUFDbkIsTUFBTTtBQUNQLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
