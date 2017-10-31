var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
// 获取公共的方法
let utils = app.utils
const api = require('../../config');
//分页配置
var pagesize = 10;

Page({
    data: {
        
    },
    onShareAppMessage: function (res) {
        //首页初始化可转发
        var data = utils.onloadstart.call(this, res);
        return data;
    },
    onLoad: function () {
        //添加尾部技术支持的信息
        utils.getFooter.call(this);
        var that = this;   
    }
});