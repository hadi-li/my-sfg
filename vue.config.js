module.exports = {
  lintOnSave: false,
  devServer: {
    // proxy: 'http://localhost:3000/'
    proxy: {
      '/api': {
        target: 'http://111.229.12.178:3000', // 配置目标的地址
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      }
    } // 配置多个代理
  },
}