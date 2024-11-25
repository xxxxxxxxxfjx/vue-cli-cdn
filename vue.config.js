const { defineConfig } = require('@vue/cli-service')

const externals = {}
let cdn = {
  js: [],
}
const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  Object.assign(externals, {
    xlsx: 'XLSX',
    echarts: 'echarts',
  })
  cdn = {
    js: [
      'https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js',
      'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
    ],
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals,
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // args[0] 是当前 HtmlWebpackPlugin 的配置对象
      // 添加或修改配置参数
      args[0].title = 'My Custom Title' // 修改页面标题
      args[0].cdn = cdn
      return args
    })
  },
})
