module.exports = ({ file }) => {
  let vwUnit;
  if (file && file.dirname && file.dirname.indexOf('vant/lib') > -1) {
    vwUnit = 375
  } else {
    vwUnit = 750
  }
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: vwUnit,
        propList: ['*'],
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: ['ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false, // 允许在媒体查询中转换`px`
      },
      'postcss-write-svg': { utf8: false },
    },
  };
};
