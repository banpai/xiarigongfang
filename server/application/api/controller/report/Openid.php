<?php
/**
 * Created by PhpStorm.
 * User: 29423
 * Date: 2017/10/28 0028
 * Time: 8:46
 */

namespace app\api\controller\report;
use app\lib\Qcloud\Openid as OpenidModel;
use think\Cache;
class Openid
{
    public function getOpenid (){
        // 获取头部信息
        if(!input('code')){
            $redirect_uri = config('host').'dist/html/index.html';
            $appId = config('we_appId');
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appId.'&redirect_uri='.$redirect_uri.'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
            $data = [
                'code' => '1',
                'url' => $url
            ];
            return json($data);
        }else{
            $openid = Cache::get('openid');
            if(!$openid){
                $code = input('code');
                $openid = OpenidModel::get($code);
                if($openid){
                    Cache::set('openid', $openid);
                }
            }
            $data = [
                'code' => '0',
                'url' => ''
            ];
            return json($data);
        }
    }
}