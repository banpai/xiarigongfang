//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
    data:{},
    onLoad: function(options){
        //添加尾部技术支持的信息
        getFooter.call(this);
        this.data.flag = options.flag;
        this.data.id = options.id;
    },
    onShareAppMessage: function(res){
        //首页初始化可转发
        var data = onloadstart.call(this, res);
        return data;
      },
    endbp: function(){
        var url = '../state/state?flag=' + this.data.flag + '&id=' + this.data.id;
        wx.redirectTo({
            url: url
        })
    }
});