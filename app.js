// app.js
// 声明全局变量和监听处理小程序的生命周期函数
App({
  // 1. 系统事件部分
  // 小程序初始化时执行
  onLaunch: function () {
    var that = this;
    // API：获取本地缓存，若不存在设置为全局属性
    that.curid = wx.getStorageSync('curid') || that.curid;
    // 调用全局方法
    that.setLoacal('curid', that.curid);
  },
  // 2、自定义全局方法部分
  setLoacal: function(id, val) {
    // API：设置本地缓存
    wx.setStorageSync(id, val);
  },
  //3、自定义全局属性部分
  curid: "CN101010100",
  version: "1.0"
})