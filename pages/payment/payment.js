//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
var app = getApp()
//获取支付页面信息的接口
const paymenturl = require('../../config').payment;
//获取制度信息
const order_payment = require('../../config').order_payment;

Page({
  data: {
    logs: []
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (options) {
    this.data.options = options;
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    app.getAppid(function (appid) {
      var postdata = {
        appid: appid,
        orderid: options.id,
        type: 'wechatapp',
        ordersn: ''
      };
      var postdatastr = JSON.stringify(postdata);
      //获取数据
      app.ajax(paymenturl, postdata, function (res) {
        console.log(res);
        that.setData({
          xs: res.data,
          flag: options.flag,
          id: options.id
        })
        postdata.ordersn = res.data.order.ordersn;
        //获取数据
        app.ajax(order_payment, postdata, function (m) {
          console.log(m);
          that.data.paymentm = m.data;
        });
      });
      
      //获取商户名称
      that.setData({
        name: app.globalData.showdata.name
      });
    });
  },
  //支付按钮
  pay: function () {
    // var options = this.data.options;
    // app.getAppid(function (appid) {
    //   var postdata = {
    //     appid: appid,
    //     orderid: options.id,
    //     type: 'wechatapp',
    //     ordersn: ''
    //   };
    //   var postdatastr = JSON.stringify(postdata);
    //   //获取数据
    //   app.ajax(paymenturl, postdata, function (res) {
    //     console.log(res);
    //     postdata.ordersn = res.data.order.ordersn;
    //     //获取数据
    //     app.ajax(order_payment, postdata, function (res) {
    //       that.setData({
    //         xs: res.data,
    //         flag: options.flag,
    //         id: options.id
    //       })
    //     });
    //   });
    // })
    var that = this;
    var successurl = 'msg_success?flag=1&id=' + this.data.id;
    var failurl = 'msg_fail?flag=0&id=' + this.data.id;
    wx.requestPayment({
      'timeStamp': that.data.paymentm.timeStamp,
      'nonceStr': that.data.paymentm.nonceStr,
      'package': that.data.paymentm.package,
      'signType': 'MD5',
      'paySign': that.data.paymentm.paySign,
      'success': function (res) {
        wx.redirectTo({
          url: successurl
        })
      },
      'fail': function (res) {
        wx.redirectTo({
          url: failurl
        })
      }
    })
  }
});
