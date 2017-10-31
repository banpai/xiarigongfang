//index.js
//获取点餐数据接口
const time_api = require('../../config').time_api
//添加尾部技术支持信息的方法
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
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  nextbp: function (o) {
    var url = 'ydxq?riqi=' + o.currentTarget.dataset.riqi;
    wx.navigateTo({
      url: url
    });
  },
  onLoad: function(o){
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    //获取数据
    var postdata = {};
    ajax(reservationindex, postdata, function (res) {
      console.log(res.data.dates);
      that.setData({
        tarray:  res.data.dates,
        time: res.data.dates[0]
      })
      // that.setData({
      //   m: res.data
      // });
    }, true);
    //添加尾部技术支持的信息
    getFooter.call(this);
    this.setData({
      riqi: o.riqi
    });
    
    // app.ajax(time_api, {}, function(res){
    //   that.setData({
    //     tarray:  res.data,
    //     time: res.data[0]
    //   })
    //   // that.data.tarray = res.data;
    //   console.log(that.data.tarray);
    // }, true);
  },
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.tarray,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            time: that.data.tarray[res.tapIndex]
          });
        }
      }
    });
  }
})
