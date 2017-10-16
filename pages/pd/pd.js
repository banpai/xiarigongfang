//获取应用实例
var app = getApp()
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取排队的接口
const queue = require('../../config').queue;
const ajax = require('../../utils/util.js').ajax;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onShareAppMessage: function (res) {
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function () {
    var that = this;
    var data = wx.getStorageSync('queue');
    this.setData({
      m: data
    });
  },
  shuax: function () {
    var that = this;
    //获取数据
    var postdata = {};
    ajax(queue, postdata, function (res) {
      console.log(res);
      that.setData({
        m: res.data
      });
    }, true);
  }
});