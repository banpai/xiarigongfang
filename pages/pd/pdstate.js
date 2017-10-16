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
    userInfo: {},
    numkk: ''
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  skipmenu: function(){
    wx.redirectTo({
      url: '../dc/dc?flag=2'
    })
  },
  onLoad: function () {
    var that = this;
    //获取数据
    var postdata = {};
    ajax(queue, postdata, function (res) {
      var numkk = Number(res.data.cur_queue.num) - Number(res.data.wait_count);
      that.setData({
        m: res.data,
        numkk: numkk
      });
    }, true);
  },
  shuax: function () {
    var that = this;
    //获取数据
    var postdata = {};
    ajax(queue, postdata, function (res) {
      var numkk = Number(res.data.cur_queue.num) - Number(res.data.wait_count);
      that.setData({
        m: res.data,
        numkk: numkk
      });
    }, true);
  }
});