let app = getApp();
let wsTools = require('../../utils/wshoto');
let esTools = require('../../utils/eshop/tools');
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
const loginflag = require('../../config').loginflag;
Page({
  data: {
    windowHeight: 0,  //显示屏高度
    windowWidth: 0,  //显示屏宽度
    animationData: {}
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  loginState: function () {
    if (loginflag){
      // 登陆页面，自动获取token。
      wx.setStorageSync('sessionKey', null);
      wx.setStorageSync('apiToken', null);
      // 其他页面，根据自行考虑是否执行。
      wsTools.fn.getApiToken(function (res) {
        if (app.globalData.debug === true) {
          console.log('strap.js onLoad getApiToken');
          console.log(res);
        }
        // if (res.statusCode === 1) {
        esTools.fn.getSession(function (rex) {
          console.log(rex.statusCode === 1);
          // console.log('rex r');
          // console.log(rex);
          wx.hideLoading();
          if (rex.statusCode === 1) {
            wx.switchTab({
              url: '../index/index'
            });
          } else {
            wx.redirectTo({
              url: '../login/login'
            });
          }
        });
        // }
      })
    }else{
      wx.switchTab({
        url: '../index/index'
      });
    }
    
  },
  onLoad(options) {
    this.loginState();
  },
  onShow() {
    // 获取显示屏宽高
    /*let _this = this;
    // 获取显示屏宽高
    wx.getSystemInfo({
      success: function (res) {
        let height = `height:${res.windowHeight}px;`;
        let width = `width:${res.windowWidth}px;`
        _this.setData({
          windowHeight: height,
          windowWidth: width
        })
      }
    });
    let animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })
    _this.animation = animation

    animation.scale(1, 1).step();

    _this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(0).step();
      _this.setData({
        animationData: animation.export()
      })
      wx.showLoading({
        title: '加载中',
      })
      let that = this;
      setTimeout(function () {
        wx.hideLoading();
        that.loginState();
      }, 2000)
    }.bind(this), 3500)*/
  }
})
