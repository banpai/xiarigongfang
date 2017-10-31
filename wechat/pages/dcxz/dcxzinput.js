//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取应用实例
var app = getApp()

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
    address: "",
    addrdetail: "",
    sex: "1",
    radioItems: [
      { name: '先生', value: '0' },
      { name: '女士', value: '1', checked: true }
    ]
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
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
    //从本地缓存获取数据
    wx.getStorage({
      key: 'mymsgwm',
      success: function (res) {
        var infodata = JSON.parse(res.data);
        var radioItems = that.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == infodata.sex;
        }
        that.setData({
          name: infodata.name,
          tel: infodata.tel,
          sex: infodata.sex,
          radioItems: radioItems,
          address: infodata.address,
          addrdetail: infodata.addrdetail
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
    } else if (this.data.address === '') {
      tusi('请输入地址');
    } else if (this.data.addrdetail === '') {
      tusi('请输入详细地址');
    } else {
      var mymsgwm = {
        name: that.data.name,
        tel: that.data.tel,
        sex: that.data.sex,
        address: that.data.address,
        addrdetail: that.data.addrdetail
      };
      var str = JSON.stringify(mymsgwm);
      //存本地缓存
      wx.setStorage({
        key: "mymsgwm",
        data: str,
        complete: function () {
          //差一个post提交数据
          var id = '0';
          var url = '../dcxz/dcxzwm?id=' + id;
          tusi('提交成功', true, function () {
            wx.redirectTo({
              url:url
            });
          });
        }
      })
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
  //同步姓名
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //电话
  addrdetail: function (e) {
    this.setData({
      addrdetail: e.detail.value
    })
  }
})