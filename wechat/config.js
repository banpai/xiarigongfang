/**
 * 小程序配置文件
 */

// flag 1:是测试, 2是友回忆炸串炒饭，3是王兴记，4是花甲
const flag = 2;

var host, storeid, ids, apiname, apipass;
if(flag === 1){
    host = "https://ws7xcx-test.wshoto.com/";
    storeid = '&i=2&storeid=5&weid=2';
    ids = '&i=2&id=5&weid=2';
    apiname = 'ws7test';
    apipass = '69534b32ab51f8cb802720d30fedb523';
}else if(flag === 2){
    host = "https://diancan.wshoto.com/";
    storeid = '&i=3&storeid=6&weid=3';
    ids = '&i=3&id=6&weid=3';
    apiname = 'diancan-yhy';
    apipass = '69534b32ab51f8cb802720d30fedb523';
}else if(flag === 3){
    host = "https://diancan.wshoto.com/";
    storeid = '&i=9&storeid=5&weid=9';
    ids = '&i=9&id=5&weid=9';
    apiname = 'diancan-wxj';
    apipass = '69534b32ab51f8cb802720d30fedb523';
}else if(flag === 4){
    host = "https://diancan.wshoto.com/";
    storeid = '&i=10&storeid=2&weid=10';
    ids = '&i=10&id=2&weid=10';
    apiname = 'diancan-hjhj';
    apipass = '69534b32ab51f8cb802720d30fedb523';
}

var config = {
    // 下面的地址配合云端 Server 工作
    host,
    storeid,
    ids,
    //是否走登录流程
    loginflag: false,
    apiname: apiname,
    apipass: apipass,
    //主页信息接口
    index: `${host}app/index.php?c=entry${ids}&do=detail_api&m=weisrc_dish`,
    //菜单信息
    menu: `${host}app/index.php?c=entry${storeid}&mode=4&do=menu_api&m=weisrc_dish`,
    //状态接口
    wd: `${host}app/index.php?c=entry&do=order_api&m=weisrc_dish${storeid}`,
    //获取我的订单数据
    state:`${host}app/index.php?c=entry&do=orderdetail_api&m=weisrc_dish${storeid}`,
    //支付页面
    payment:`${host}app/index.php?c=entry${ids}&do=orderdetail_api&m=weisrc_dish${storeid}`,
    //待支付页面
    dcxz: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/dcxz",
    //post点菜数据接口
    podc: `${host}app/index.php?c=entry${storeid}&mode=4&do=addtoorder_api&m=weisrc_dish`,
    //取消订单接口
    cancelorder_api: `${host}app/index.php?c=entry${storeid}&mode=4&do=cancelorder_api&m=weisrc_dish`,
    //获取时间
    time_api: `${host}app/index.php?c=entry${storeid}&mode=4&do=time_api&m=weisrc_dish`,
    //支付接口
    order_payment: `${host}app/index.php?c=entry${storeid}&mode=4&do=order_payment&m=weisrc_dish`,
    //查询排队接口
    tablelist: `${host}app/index.php?c=entry${storeid}&mode=4&do=tablelist&m=weisrc_dish`,
    //排队的查询接口
    queue: `${host}app/index.php?c=entry${storeid}&mode=4&do=queue&m=weisrc_dish`,
    //保存的接口
    setqueue:`${host}app/index.php?c=entry${storeid}&mode=4&do=setqueue&m=weisrc_dish`,
    //预约的接口
    reservationindex:`${host}app/index.php?c=entry${storeid}&mode=4&do=reservationindex&m=weisrc_dish`,
    //预约的接口3
    reservationdetail:`${host}app/index.php?c=entry${storeid}&mode=4&do=reservationdetail&m=weisrc_dish`,
    //预约接口4
    addtoorder:`${host}app/index.php?c=entry${storeid}&mode=4&do=addtoorder&m=weisrc_dish`
};

module.exports = config;