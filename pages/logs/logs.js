//logs.js
var util = require('../../utils/util.js')
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
  data: {
    logs: []
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
