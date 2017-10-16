//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取应用实例
var app = getApp()
//获取提交订单详情数据接口地址
const podcurl = require('../../config').podc

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
}

Page({
  data: {
    name: '',
    tel: '',
    bz: '',
    sex: "1",
    zh:"",
    endtime: '08:30',
    xzdzname: '请选择收货地址',
    radioItems: [
      { name: '先生', value: '0' },
      { name: '女士', value: '1', checked: true }
    ],
    array: ['08:30', '09:00', '09:30', '10:00'],
    index: 0,
    time: '00:00'
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  //单列时间选择器
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value,
      endtime: that.data[e.detail.value]
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //打电话
  tapCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.info.tel
    })
  },
  //初始化
  onLoad: function () {
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this
    //获取数据
    wx.getStorage({
      key: 'letdata',
      success: function (res) {
        var infodata = JSON.parse(res.data);
        that.setData({
          dcxz: infodata
        })
      }
    });
    //获取缓存数据
    wx.getStorage({
      key: 'mymsgwm',
      success: function (res) {
        var infodata = JSON.parse(res.data);
        // var radioItems = that.data.radioItems;
        // for (var i = 0, len = radioItems.length; i < len; ++i) {
        //   radioItems[i].checked = radioItems[i].value == infodata.sex;
        // }
        var xzdzname = "请选择收货地址";
        if (infodata.address && infodata.address != '') {
          if (infodata.addrdetail && infodata.addrdetail != '') {
            xzdzname = infodata.address + infodata.addrdetail;
          }
        }
        that.setData({
          name: infodata.name,
          tel: infodata.tel,
          sex: infodata.sex,
          address: infodata.address,
          addrdetail: infodata.addrdetail,
          xzdzname: xzdzname
        });
      }
    })
  },
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
      sex: e.detail.value
    });
  },
  //请选择收货地址
  skipdz: function () {
    var url = "dcxzinput"
    wx.redirectTo({
      url: 'dcxzinput'
    })
  },
  //提交订单
  sub: function (e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (this.data.name === '') {
      tusi('请填写姓名');
    } else if (this.data.tel === '') {
      tusi('请填写手机号');
    } else if (!myreg.test(that.data.tel)) {
      tusi('请输入有效的手机号');
    } else {
      //整理post的提交数据
      var postData = that.data.dcxz;
      app.getAppid(function (appid) {
        postData.appid = appid;
        postData.flag = "2";
        postData.userinfo = {
          name: that.data.name,
          tel: that.data.tel,
          sex: that.data.sex,
          address: that.data.address,
          addrdetail:  that.data.addrdetail,
          bz: that.data.bz,
          zh: that.data.zh,
          servicetime: that.data.time,
          appid: appid
        };
        var postdatastr = JSON.stringify(postData);
        app.ajax(podcurl, postData, function (m) {
          
          //这边支付接口传回的参数需要重新处理
          var id = m.data.orderid;
          var url = '../payment/payment?id=' + id;
          tusi('提交成功', true, function () {
            wx.redirectTo({
              url: url
            })
          }, true);
        }, true);
      });
    }
  },
  //同步姓名
  wname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //同步备注
  bindTextAreaBlur: function (e) {
    this.setData({
      bz: e.detail.value
    })
  }
})