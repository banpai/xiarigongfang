//index.js
//获取点餐数据接口
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取排队的接口
const reservationindex = require('../../config').reservationindex;
const ajax = require('../../utils/util.js').ajax;
//获取应用实例
var app = getApp()
Page({
  data: {
    falg: false,
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (o) {
    var that = this;
    //获取数据
    var postdata = {};
    ajax(reservationindex, postdata, function (res) {
      console.log(res.data.store.begintime);
      var btime = res.data.store.begintime;
      var endtime =  res.data.store.endtime;
      var begintime = btime + '-' + endtime;
      console.log(res.data);
      that.setData({
        data: res.data,
        begintime: begintime,
        btime: btime,
        endtime: endtime
      });
    }, true);
    //添加尾部技术支持的信息
    getFooter.call(this);
    this.setData({
      riqi: o.riqi
    });
  },
  skipyd: function(o){
    var timeid = o.currentTarget.dataset.timeid;
    console.log(this.data.riqi);
    var url = 'ydinput?timeid=' + timeid + '&riqi=' + this.data.riqi +  '&begintime=' + this.data.begintime +  '&btime=' + this.data.btime +  '&endtime=' + this.data.endtime;
    wx.navigateTo({
      url: url
    });
  }
})
