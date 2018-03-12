//  pages/weather/weather.js

// 获取当前小程序实例，方便使用全局方法和属性
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  // 1、页面数据部分,将绑定到视图wxml中
  // 设置页面数据，后面空值将在页面显示时通过请求服务器获取
  data: {
    cur_id: app.curid,
    basic: "",
    now: ""
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // 设置加载模态框
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    // 回调函数，根据数据设置页面data，更新到视图
    that.getNow(function(d){
      // 隐藏加载框
      wx.hideToast(); 
      d.now.cond.src = "http://files.heweather.com/cond_icon/" + d.now.cond.code + ".png";
      // 更新数据，视图将同步更新
      that.setData({ basic: d.basic, now: d.now })
    })
  },
  // 3、自定义页面方法：获取当前天气API
  getNow: function(fn) {
    // 请求服务器，类似ajax
    wx.request({
      url: 'https://free-api.heweather.com/v5/now',
      // 和风天气提供用户key，可自行注册获得
      data: {
        city: app.curid,
        key: '01a7798b060b468abdad006ea3de4713',
        header: { 'Content-Type': 'application/json' },
        // 成功后将数据传给回调函数执行
        success: function(res) {
          fn(res.data.HeWeather5[0]);
        }
      }
    })
  },
  // 4、页面事件绑定部分
  bindViewTap: function() {
    // 跳转菜单页面 
    wx.switchTab({
      url: '../city/city'
    })
  }
})