const tsImportPluginFactory = require('ts-import-plugin');
const { merge } = require('webpack-merge');

function dateFormat(date, format) {
    var dateTime = new Date(date)
    var o = {
        'M+': dateTime.getMonth() + 1, //month
        'd+': dateTime.getDate(), //day
        'h+': dateTime.getHours(), //hour
        'm+': dateTime.getMinutes(), //minute
        's+': dateTime.getSeconds(), //second
        'q+': Math.floor((dateTime.getMonth() + 3) / 3), //quarter
        S: dateTime.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

module.exports = {
  chainWebpack: (config) => {
    const date = dateFormat(new Date().getTime(), 'yyyyMMddhhmm')
    config.output.filename(`js_${date}/[name].[hash:8].js`).chunkFilename(`js_${date}/[name].[hash:8].js`)  
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        });
        return options;
      });
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/sys': {
        target: 'http://192.168.1.8:20000',
        changeOrigin: true,
      },
    },
  },
};
