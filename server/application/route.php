<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

Route::get('api/v1/banner/:id', 'api/v1.Banner/getBanner');

/**
 * 举报信息的接口路由设置
 */
Route::post('/api/report/getYzm', 'api/report.Yzm/getYzm');
Route::post('/api/report/addData', 'api/report.Add/addData');
Route::post('/api/report/upload', 'api/report.Upload/uploadImg');
Route::post('/api/report/openid', 'api/report.Openid/getOpenid');
Route::get('/report/index', 'api/report.Report/startReport');
Route::post('/api/report/login', 'api/report.Cms/login');
Route::get('/api/report/getData', 'api/report.Cms/getData');
Route::get('/api/report/exit', 'api/report.Cms/drop');

/**
 * 夏日工坊
 */
Route::get('/api/summer/qrcode', 'api/summer.Qrcode/qrcode');
//
Route::get('/api/summer/init', 'api/summer.Init/qrcode');