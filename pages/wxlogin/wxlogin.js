let app = getApp();
let util = require('../../utils/util');
let esTools = require('../../utils/eshop/tools');
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
// wxlogin.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      isShow:false
    },
    onShareAppMessage: function(res){
        //首页初始化可转发
        var data = onloadstart.call(this, res);
        return data;
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(app.globalData.debug === true){
            console.log('wxlogin.js onLoad running.');
        }

        wx.showLoading({
            title: '用户自动登录中',
            mask : true
        });

        this.setSetting();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    setSetting: function () {

        let that = this;

        app.authorize('scope.userInfo', {
            success() {
                wx.login({
                    success: function (res) {
                        if (app.globalData.debug === true) {
                            console.log('wxlogin.js setSetting authorize success');
                            console.log(res);
                        }
                        let loginData = {
                            'code' : res.code
                        };
                        console.log('code=========' + res.code);
                        esTools.fn.setEmpty().setHeader({
                            'content-type': 'application/x-www-form-urlencoded'
                        }).signData(loginData).setMethod('post').setExtraUrl('SessionCode').login(function(res){
                            if(res.statusCode === 1){
                                let sessionkey = res.data;
                                app.getUserInfo(function(userInfo){
                                    if (app.globalData.debug === true) {
                                        console.log('wxlogin.js app.getUserInfo success');
                                        console.log(userInfo);
                                    }
                                    if(userInfo.errMsg === "getUserInfo:ok"){
                                        let userData = {
                                            'rawData' : userInfo.rawData,
                                            'signature' : userInfo.signature,
                                            'encryptedData' : userInfo.encryptedData,
                                            'iv' : userInfo.iv,
                                            'sessionkey' : sessionkey.sessionkey
                                        };
                                        esTools.fn.setEmpty().signData(userData).setMethod('post').setExtraUrl('UserInfo').login(function(res){
                                            wx.hideLoading();
                                            if(res.statusCode === 1){
                                                wx.setStorageSync('sessionKey', sessionkey);
                                                wx.reLaunch({
                                                    url: '/pages/index/index'
                                                })
                                            }
                                        });
                                    }else{
                                        console.log("getUserInfo fail.");
                                        that.setSetting();

                                    }
                                    // console.log(userInfo);
                                });
                            }else {
                                wx.hideLoading();
                                wx.showToast({
                                  title: '访问微信接口错误',
                                  icon: 'loading',
                                  duration: 2000,
                                  complete: function(){
                                    wx.reLaunch({
                                        url: '/pages/index/index'
                                    })
                                  }
                                });
                            }
                        });

                    },
                    fail : function(){
                        console.log('wxlogin fail running.');
                    }
                });
            },
            fail() {
                wx.hideLoading();
                wx.showModal({
                    title: '授权提醒',
                    content: '为更好的提供服务，需要您为我们授权部分功能，保证软件运行友好。',
                    showCancel: false,
                    success() {
                        that.openSetting();
                    }
                })
            }
        });

    },

    openSetting: function () {
        let that = this;

        wx.openSetting({
            success: function (res) {
                if (app.globalData.debug === true) {
                    console.log('wxlogin.js openSetting success');
                    console.log(res);
                }

                if (res.authSetting['scope.userInfo'] === true) {
                    wx.showLoading({
                        title: '用户自动登录中',
                        mask : true
                    });
                    that.setData({
                        isShow : false
                    })
                    that.setSetting();

                    /*wx.reLaunch({
                        url : '/pages/index/index'
                    })*/
                }else{
                    wx.hideLoading();
                    that.setData({
                      isShow:true,
                    })
                }

            },
            fail: function (res) {
                if (app.globalData.debug === true) {
                    console.log('wxlogin.js openSetting fail');
                    console.log(res);
                }
            }
        });
    },



    buttonTap: function () {
        console.log('run.');
    }
})
