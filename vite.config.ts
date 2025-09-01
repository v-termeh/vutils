import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            name: "vutils",
            entry: resolve(__dirname, "src", "index.ts"),
            fileName: (format) => `vutils.${format}.js`,
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            external: ["vue", "vue-router"],
            output: {
                globals: {
                    vue: "Vue",
                    "vue-router": "VueRouter",
                },
            },
        },
    },
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
    ],
});
