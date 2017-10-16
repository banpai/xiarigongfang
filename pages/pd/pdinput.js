//获取应用实例
var app = getApp()
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取排队的接口
const setqueue =  require('../../config').setqueue;
const ajax = require('../../utils/util.js').ajax;

//封装tusi
function tusi(str, flag, fun) {
  var icon = 'loading';
  if (flag) {
    icon = 'success';
  }
  wx.showToast({
    title: str,
    icon: icon,
    duration: 2000,
    complete: function () {
      if (fun) {
        fun();
      }
    }
  });
};

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    tel: '',
    usercount: ''
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    this.data.queueid = options.id;
  },
  savemsg: function(){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (this.data.usercount === '') {
      tusi('请填写客人数量');
    } else if (this.data.tel === '') {
      tusi('请填写手机号');
    } else{
      var data = {
        queueid: that.data.queueid,
        usercount: that.data.usercount,
        mobile: that.data.tel
      };
      ajax(setqueue, data, function(m){
        console.log(m);
        wx.redirectTo({
          url: 'pdstate'
        })
      }, true);
    }
  },
  //电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //客人数量
  usercount: function (e) {
    this.setData({
      usercount: e.detail.value
    })
  }
});