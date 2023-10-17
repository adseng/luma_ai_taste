// vite.config.js

import { defineConfig } from 'vite'
// import { glsl } from 'vite-plugin-glsl'

export default defineConfig({
    plugins: [
        // glsl()
    ],


    // 配置支持glb文件
    assetsInclude: ['**/*.glb','**/*.ply','**/*.zip'],

    // server: {
    //     fs: {
    //         strict: true
    //     }
    // }
})
