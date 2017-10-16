/**
 * 配置文件
 * 存放路径为：\utils\config.js
 * config.baseUri : 接口域名
 * config.header : 默认头部
 * config.passport : 交互通讯账号、密码
 * listsUri : 交互地址池
 */

const host = require('../config').host;
const apiname = require('../config').apiname;
const apipass = require('../config').apipass;

let config = {
    /**
     * 所使用域名
     */
  'baseUri': host,

    /**
     * 登陆账号信息
     */
    'passport' : {
        'uname': apiname,
        'upass': apipass
    },

    /**
     * 登陆类型1，小程序自动登录。
     * 登陆类型2，手机号码登陆。
     * 需要修改的话，手动改一下下面的值。
     */
    'loginType' : 1,

    'header' : {
        'content-type': 'application/json'
    },
};

let listsUri = {
    'ApiLogin' : config.baseUri + 'login/ApiLogin',
};

// 对外提供使用。
module.exports.baseUri = config.baseUri;
module.exports.header = config.header;
module.exports.passport = config.passport;
module.exports.loginType = config.loginType;

module.exports.listsUri = listsUri;
