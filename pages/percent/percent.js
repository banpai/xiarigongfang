// 获取实列
var app = getApp()
// 获取公共的方法
let utils = app.utils

Page({
    data: {
        avatarUrl: '',
        nickName: '',
        imageUrl: '',
        icon: ''
    },
    onShareAppMessage: function (res) {
        //首页初始化可转发
        var data = utils.onloadstart.call(this, res);
        return data;
    },
    //点击微微吗
    ewmdj: function(){
        console.log('ddddddddddddd');
        wx.navigateTo({
            url: '../menbercar/menbercar'
        })
    },
    //立即激活
    ljjh: function () {
        wx.showToast({
            title: '开发中',
            icon: 'loading',
            duration: 2000
        });
    },
    onLoad: function () {
        var that = this;
        console.log(utils.getTimestamp('2017-09-19 10:20'));
        app.getUserInfo((m) => {
            console.log(m.userInfo);
            that.setData({
                avatarUrl: m.userInfo.avatarUrl,
                nickName: m.userInfo.nickName
            });
        });
        if (app.globalData.showdata.index_img) {
            that.setData({
                imageUrl: app.globalData.showdata.index_img,
                icon: app.globalData.showdata.icon
            })
        }
        //添加尾部技术支持的信息
        utils.getFooter.call(this);
    },
    //会员权益start
    hyqy: function () {
        wx.showModal({
            showCancel: false,
            title: '会员权益',
            content: '开卡即送测试劵包功能100积分200成长值。积分底现，10积分=1元。',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
});