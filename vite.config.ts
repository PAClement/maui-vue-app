import { ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { copyAssetsPlugin, addFrameworkPlugin } from "./vite.plugins";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
    const outDir: string = "../BlazorMaui.Core/wwwroot";
    return {
        plugins: [
            vue(),
            tailwindcss(),
            copyAssetsPlugin(outDir),
            addFrameworkPlugin(config.mode === "production")
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url))
            }
        },
        build: {
            emptyOutDir: true,
            outDir: outDir,
            sourcemap: true,
            target: "esnext",
            rollupOptions: {
                external: /.*blazor[.]webview[.]js.*/gm,
                output: {
                    entryFileNames: "assets/js/[hash].js",
                    assetFileNames: (assetInfo) => {
                        const fileName = assetInfo.name.match(/([a-zA-Z0-9\s_.\-():])+\.\w+$/);
                        if (fileName && fileName[0].match("favicon.ico")){ 
                            return "favicon.ico";
                        }
                        let extType = assetInfo.name.split(".")[1];
                        if (/png|jpg|jpeg|svg|gif|bmp|tiff|tif/i.test(extType)) {
                            extType = "img";
                        }
                        return `assets/${extType}/[name][extname]`;
                    },
                    chunkFileNames: "assets/js/[hash].js"
                }
            }  
        }
    };
});
