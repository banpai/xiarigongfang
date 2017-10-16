//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;

var app = getApp()
//获取订单详情的接口
const stateurl = require('../../config').state;
//订单取消的接口
const cancelorder_apiurl =  require('../../config').cancelorder_api;

//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;

function _next(n, fun) {
  var that = this;
  if (this.data.progress >= n) {
    this.setData({
      disabled: false
    });
    if (fun) {
      fun();
    }
    return true;
  }
  this.setData({
    progress: ++this.data.progress
  });
  setTimeout(function () {
    _next.call(that, n, fun);
  }, 20);
}

function _next2(n) {
  var that = this;
  if (this.data.progress2 >= n) {
    this.setData({
      disabled2: false
    });
    return true;
  }
  this.setData({
    progress2: ++this.data.progress2
  });
  setTimeout(function () {
    _next2.call(that, n);
  }, 20);
}


//改变头部的状态
function cgheader(flag, that) {
  if (flag === '1') {
    that.setData({
      yq2: "background: #F1544E;"
    });
  } else if (flag === '2') {
    that.setData({
      yq2: "background: #F1544E;",
      yq3: "background: #F1544E;"
    });
  }
}

Page({
  data: {
    progress: 0,
    disabled: false,
    progress2: 0,
    disabled2: false,
    yq1: "background: #F1544E;"
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (options) {
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    //修改状态颜色
    cgheader(options.flag, this);
    that.setData({

    });
    //获取数据
    app.getAppid(function (appid) {
      var databp = {
        appid: appid,
        orderid: options.id
      };
      var postdata = JSON.stringify(databp);
      app.ajax(stateurl, databp, function (res) {
        that.setData({
          state: res.data,
          flag: options.flag,
          id: options.id
        });
      }, true);
    });
    //获取数据
    that.setData({
      name: app.globalData.showdata.name,
      tel: app.globalData.showdata.tel
    });
    if (this.data.disabled) return;
    this.setData({
      progress: 0,
      disabled: true
    });
    //修改动画状态
    if (options.flag == '0') {
      _next.call(this, 50);
    } else if (options.flag == '1') {
      _next.call(this, 100, function () {
        _next2.call(that, 50);
      });
    } else if (options.flag == '2') {
      _next.call(this, 100, function () {
        _next2.call(that, 100);
      });
    }
  },
  //取消订单
  cancle: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认取消！',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          //缺一个提交后台数据库的操作
          //获取数据
          app.getAppid(function (appid) {
            var databp = {
              appid: appid,
              id: that.data.id
            };
            var postdata = JSON.stringify(databp);
            app.ajax(cancelorder_apiurl, databp, function (res) {
              // 关闭当前页面返回上级页面
              wx.redirectTo({
                url: '../wd/wd'
              })
            }, true);
          });

        } else {
          
        }
      }
    });
  },
  //确认订单
  sure: function () {
    var url = '../payment/payment?flag=' + this.data.flag + '&id=' + this.data.id;
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      complete: function () {
        wx.redirectTo({
          url: url
        });
      }
    });
  },
  //查看地图
  seeMap: function () {
    var that = this;
    wx.openLocation({
      latitude: +that.data.info.latitude,
      longitude: +that.data.info.longitude,
      scale: 28
    })
  },
  //打电话
  tapCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.info.tel
    })
  }
});