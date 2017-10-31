<?php
/**
 * Created by PhpStorm.
 * User: 29423
 * Date: 2017/10/27 0027
 * Time: 11:23
 */

namespace app\api\model;

use think\Cache;
use think\Db;
use think\Session;

class AddReport
{
    public static function addData($data){
        $msg = [
            'code'=> '1',
            'msg'=> '失败'
        ];
        /**
         * 5分钟后验证码过气
         */
        if(session::has('yzm_date')){
            $now = time();
            $min = ($now - session::get('yzm_date'))/60;
            if($min > 5){
                $msg['msg'] = '验证码时间过期！';
                return $msg;
            }
        }
        /**
         * 判断openid
         */
        $openid = '';
        if(Cache::get('openid')){
            $openid = Cache::get('openid');
        }

        if(session::get('yzm') == $data['yzm']){
            $updateTime = time();
            $createTime = date("Y-m-d H:i:s", $updateTime);
            $data = [
                'openid' => $openid,
                'name' => $data['name'],
                'tel' => $data['tel'],
                'address' => $data['address'],
                'detail' => $data['detail'],
                'picpath' => $data['picpath'],
                'entkbn' => '0',
                'createTime' => $createTime
            ];
            $result = Db::table('t_tips')->insert($data);
            if($result){
                $msg['code'] = '0';
                $msg['msg'] = '成功';
            }
        }else{
            $msg['msg'] = '验证码错误！';
        }
        return $msg;
    }
}