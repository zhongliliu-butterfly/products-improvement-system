module.exports = {
  plugins: {
    autoprefixer: {},
    // 'postcss-px-to-viewport': {
    //   unitToConvert: 'px', // 要转化的单位
    //   viewportWidth: 1920, // UI设计稿的宽度
    //   unitPrecision: 6, // 转换后的精度，即小数点位数
    //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
    //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
    //   selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
    //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //   replace: true, // 是否转换后直接更换属性值
    //   exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    //   landscape: false, // 是否处理横屏情况
    // },
    // 'postcss-pxtorem': {
    //   rootValue: 37.5, // 设计稿宽度的1/10，代表 1rem=37.5px
    //   propList: ['*'], // 需要做转化处理的css属性  * 就是所有属性都要转换，如`hight`、`width`、`margin`等，`*`表示全部
    //   exclude: /node_modules/i, // 这里表示不处理node_modules文件下的css
    // },
  },
}
