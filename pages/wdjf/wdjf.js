var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
// 获取公共的方法
let utils = app.utils
const api = require('../../config');
//分页配置
var pagesize = 10;

Page({
    data: {
        tabs: ["获得", "使用"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        list0: [],
        list1: [],
        list2: [],
        list0flag: true,
        list1flag: true,
        list2flag: true,
        page0: 1,
        page1: 1,
        page2: 1,
        status: 0,
        icon: ''
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
        //获取数据
        app.getAppid(function (appid) {
            var databp = {
                appid: appid,
                status: '0',
                page: that.data.page0,
                id: -1
            };
            var postdata = JSON.stringify(databp);
            app.ajax(api.wd, databp, function (res) {
                var tabs = that.tabs;
                var activeIndex = that.activeIndex;
                var sliderOffset = that.sliderOffset;
                var sliderLeft = that.sliderLeft;
                that.data.page0 = that.data.page0 + 1;
                that.setData({
                    tabs: tabs,
                    activeIndex: activeIndex,
                    sliderOffset: sliderOffset,
                    sliderLeft: sliderLeft,
                    state: res.data,
                    list0: res.data,
                    icon: app.globalData.showdata.icon
                });
            }, true);
        })
        this.getdata('1', -1, that.data.page1);
        this.getdata('2', -1, that.data.page1);
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            status: e.currentTarget.id
        });
    },
    getdata: function (status, id, page, cb) {
        var that = this;
        //获取数据
        app.getAppid(function (appid) {
            var databp = {
                appid: appid,
                status: status,
                id: id,
                page: page,
                psize: pagesize
            };
            var postdata = JSON.stringify(databp);
            if (status == 0) {
                app.ajax(api.wd, databp, function (res) {
                    if (res.data.length < pagesize) {
                        var carray = that.data.list0.concat(res.data);
                        that.setData({
                            list0: carray
                        });
                        that.data.page0 = that.data.page0 + 1;
                        that.data.list0flag = false;
                        if (cb) {
                            cb();
                        }
                    } else {
                        var carray = that.data.list0.concat(res.data);
                        that.setData({
                            list0: carray
                        });
                        that.data.page0 = that.data.page0 + 1;
                        if (cb) {
                            cb();
                        }
                    }
                }, true);
            } else if (status == 1) {
                app.ajax(api.wd, databp, function (res) {
                    if (res.data.length < pagesize) {
                        var carray = that.data.list1.concat(res.data);
                        that.setData({
                            list1: carray
                        });
                        that.data.page1 = that.data.page1 + 1;
                        that.data.list1flag = false;
                        if (cb) {
                            cb();
                        }
                    } else {
                        var carray = that.data.list1.concat(res.data);
                        that.setData({
                            list1: carray
                        });
                        that.data.page1 = that.data.page1 + 1;
                        if (cb) {
                            cb();
                        }
                    }
                }, true);
            } else if (status == 2) {
                app.ajax(api.wd, databp, function (res) {
                    if (res.data.length < pagesize) {
                        var carray = that.data.list2.concat(res.data);
                        that.setData({
                            list2: carray
                        });
                        that.data.page2 = that.data.page2 + 1;
                        that.data.list2flag = false;
                        if (cb) {
                            cb();
                        }
                    } else {
                        var carray = that.data.list2.concat(res.data);
                        that.setData({
                            list2: carray
                        });
                        that.data.page2 = that.data.page2 + 1;
                        if (cb) {
                            cb();
                        }
                    }
                }, true);
            }
        })
    },
    // 上拉加载回调接口
    onReachBottom: function () {
        var that = this;
        var id = 0;
        if (this.data.status == 0) {
            if(that.data.list0flag){
                wx.showToast({
                    title: '数据加载中',
                    icon: 'loading',
                    duration: 3000
                });
                var len = this.data.list0.length - 1;
                id = this.data.list0[len].id;
                that.getdata(this.data.status, id, that.data.page0);
            }
           
        } else if (this.data.status == 1) {
            if(that.data.list1flag){
                wx.showToast({
                    title: '数据加载中',
                    icon: 'loading',
                    duration: 3000
                });
                var len = this.data.list1.length - 1;
                id = this.data.list1[len].id;
                that.getdata(this.data.status, id, that.data.page1);
            }
        } else {
            if(that.data.list2flag){
                wx.showToast({
                    title: '数据加载中',
                    icon: 'loading',
                    duration: 3000
                });
                var len = this.data.list2.length - 1;
                id = this.data.list2[len].id;
                that.getdata(this.data.status, id, that.data.page2);
            }
        }

    },
    //会员权益start
    hyqy: function () {
        wx.showModal({
            showCancel: false,
            title: '积分规则',
            content: '积分抵现，10积分=1元',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
    // // 下拉刷新回调接口
    // onPullDownRefresh: function () {
    //     wx.showToast({
    //         title: '数据加载中……',
    //         icon: 'loading',
    //         duration: 3000
    //     });
    //     // do somthing
    // },
});