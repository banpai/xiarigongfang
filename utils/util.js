//获取应用实例
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断手机号
function checkMobile(mobile) {
  var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;
  if (reg.test(mobile)) {
    return true;
  }
  return false;
}

class utils {
  //判断空值，包括{}和[]，空为true，否则为false
  judgeNull(value) {
    if (value == null || value == undefined) return true
    if (this.judgeString(value)) {
      if (value.trim().length == 0) return true
    } else if (this.judgeArray(value)) {
      if (value.length == 0) return true
    } else if (this.judgeObject(value)) {
      for (let name in value) return false
      return true
    }
    return false;
  }
  //判断是否为字符串类型，是为true，否则为false
  judgeString(value) {
    return value != null && value != undefined && value.constructor == String
  }
  //判断是否为数字类型，是为true，否则为false
  judgeNumber(value) {
    return value != null && value != undefined && value.constructor == Number
  }
  //判断是否为布尔类型，是为true，否则为false
  judgeBoolean(value) {
    return value != null && value != undefined && value.constructor == Boolean
  }
  //判断是否为数组类型，是为true，否则为false
  judgeArray(value) {
    return value != null && value != undefined && value.constructor == Array
  }
  //判断是否为对象类型，是为true，否则为false
  judgeObject(value) {
    return value != null && value != undefined && value.constructor == Object
  }
  //判断是否为方法类型，是为true，否则为false
  judgeFunction(value) {
    return value != null && value != undefined && value.constructor == Function
  }
  //合并对象，深层克隆
  mergeObject() {
    let newObject = {}
    for (let a = 0; a < arguments.length; a++) {
      let mergeObject = arguments[a]
      for (let prototype in mergeObject) {
        let mergeObjectPrototype = mergeObject[prototype]
        if (this.judgeObject(mergeObjectPrototype)) {
          newObject[prototype] = this.mergeObject({}, mergeObjectPrototype)
        } else if (this.judgeArray(mergeObjectPrototype) && this.judgeObject(mergeObjectPrototype[0])) {
          let newArray = []
          for (let b = 0; b < mergeObjectPrototype.length; b++) {
            newArray.push(this.mergeObject({}, mergeObjectPrototype[a]))
          }
          newObject[prototype] = newArray
        } else {
          newObject[prototype] = mergeObjectPrototype
        }
      }
    }
    return newObject
  }

  getApp() {
    return getApp()
  }
  getCurrentPages() {
    return getCurrentPages()
  }
  //获取当前页
  getCurrentPage() {
    let pages = this.getCurrentPages()
    return pages[pages.length - 1]
  }
  //获取当前页路径
  getCurrentPath() {
    return this.getCurrentPage().__route__
  }
  //getRelativePath的简易封装，不需要当前路径，只需要目标路径
  getPath(targetPath) {
    let currentPath = this.getCurrentPath()
    return this.getRelativePath(currentPath, targetPath)
  }
  //获取两个路径之间相对路径
  getRelativePath(currentPath, targetPath) {
    let currentPathArray = currentPath.split('/')
    let targetPathArray = targetPath.split('/')
    let samePath = false
    let levelNumber = 0
    let relativePath = ''
    for (let a = 0; a < currentPathArray.length; a++) {
      let currentPathData = currentPathArray[a]
      for (let b = 0; b < targetPathArray.length; b++) {
        let targetPathData = targetPathArray[b]
        if (targetPathData == currentPathData) {
          levelNumber = currentPathArray.length - b - 1
          samePath = true
          break
        }
      }
    }
    if (samePath) {
      for (let a = 0; a < levelNumber - 1; a++) {
        relativePath += '../'
      }
      for (let a = levelNumber; a > 0; a--) {
        let targetPathData = targetPathArray[a]
        if (a == 1) relativePath += targetPathData
        else relativePath += targetPathData + '/'
      }
    } else {
      levelNumber = currentPathArray.length - 1
      for (let a = 0; a < levelNumber; a++) {
        relativePath += '../'
      }
      for (let a = 0; a < targetPathArray.length; a++) {
        let targetPathData = targetPathArray[a]
        if (a == targetPathArray.length - 1) relativePath += targetPathData
        else relativePath += targetPathData + '/'
      }
    }
    return relativePath
  }
  //获取时间戳
  getTimestamp() {
    return Date.parse(new Date())
  }
  //获取class的方法，使用方法同ng，比较方便多class生成
  getClassName(params) {
    if (this.judgeNull(params)) return ''
    if (!this.judgeObject(params)) {
      console.error('expect object params')
      return ''
    }
    let className = ''
    for (var name in params) {
      if (params[name]) className += ' ' + name
    }
    return className.replace(/ /, '')
  }
  //页面初始化统一分享设置
  onloadstart(res) {
    var app = getApp()
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var imageUrl = '';
    if (app.globalData.showdata.index_img) {
      imageUrl = app.globalData.showdata.index_img;
    }
    return {
      title: false,
      path: '/pages/index/index',
      imageUrl: imageUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  //封装的底部的方法
  getFooter() {
    var name = '微盛网络技术支持';
    var website = 'wshoto.com';

    // wx.request({
    //     url: '',
    //     data: {},
    //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     complete: function(res) {
    //         this.setData({
    //             tecSupport:{
    //                 name: name,
    //                 website: website
    //             }
    //         });
    //     }
    // })

    this.setData({
      tecSupport: {
        name: name,
        website: website
      }
    });
  }
  //封装获取数据的方式
  ajax(url, data, fun, post) {
    wx.showLoading({
      title: '加载中',
    });
    var method = "POST";
    var header = {
      'content-type': 'application/json'
    };
    if (post) {
      method = "POST";
      header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }
    if (wx.getStorageSync('sessionKey')) {
      data.sessionkey = wx.getStorageSync('sessionKey').sessionkey;
    }
    var datachuli = JSON.stringify(data);
    //获取数据
    wx.request({
      url: url,
      method: method,
      data: datachuli,
      dataType: 'json',
      // header: header,
      success: function (res) {
        if (res.data.status == 1) {
          wx.hideLoading();
          var data = res.data.message;
          if(res.data.result){
            data = res.data.result;
          }
          var data = {
            errcode: '0',
            data: data
          }
          fun(data);
        } else {
          wx.hideLoading();
          var message = "获取数据失败";
          if (res.data.message) {
            message = res.data.message;
          }
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '接口调用失败',
          icon: 'loading',
          duration: 2000
        })
      }
    });
  }
}
//页面初始化统一分享设置
function onloadstart(res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  var imageUrl = '';
  if (app.globalData.showdata.index_img) {
    imageUrl = app.globalData.showdata.index_img;
  }
  return {
    title: false,
    path: '/pages/index/index',
    imageUrl: imageUrl,
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
}
//封装获取数据的方式
function ajax(url, data, fun, post) {
  console.log(url);
  wx.showLoading({
    title: '加载中',
  });
  var method = "POST";
  var header = {
    'content-type': 'application/json'
  };
  if (post) {
    method = "POST";
    header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  if (wx.getStorageSync('sessionKey')) {
    data.sessionkey = wx.getStorageSync('sessionKey').sessionkey;
  }
  var datachuli = JSON.stringify(data);
  //获取数据
  wx.request({
    url: url,
    method: method,
    data: datachuli,
    dataType: 'json',
    // header: header,
    success: function (res) {
      if (res.data.status == 1) {
        wx.hideLoading();
        var data = {
          errcode: '0',
          data: res.data.message
        }
        fun(data);
      } else {
        wx.hideLoading();
        var message = "获取数据失败";
        if (res.data.message) {
          message = res.data.message;
        }
        wx.showToast({
          title: message,
          icon: 'loading',
          duration: 2000
        })
      }
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '接口调用失败',
        icon: 'loading',
        duration: 2000
      })
    }
  });
}

module.exports = {
  formatTime: formatTime,
  onloadstart: onloadstart,
  ajax: ajax,
  utils: utils
}
