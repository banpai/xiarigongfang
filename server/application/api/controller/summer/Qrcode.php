<?php
/**
 * Created by PhpStorm.
 * User: 29423
 * Date: 2017/10/30 0030
 * Time: 22:15
 */

namespace app\api\controller\summer;


class Qrcode
{
    public function getWchatQrcode($users_id=1){
        //带LOGO
         $url = 'http://mydd.0317cn.net/index.php/Home/Logo/res/users_id/'.$users_id; //二维码内容
         $errorCorrectionLevel = 'L';//容错级别
         $matrixPointSize = 9;//生成图片大小
         //生成二维码图片
         Vendor('phpqrcode.phpqrcode');
         $object = new \QRcode();
         $ad = 'erweima/'.$users_id.'.jpg';
         $object->png($url, $ad, $errorCorrectionLevel, $matrixPointSize, 2);
         $logo = 'erweima/2.jpg';//准备好的logo图片
        // $QR = 'erweima/'.$users_id.'.jpg';//已经生成的原始二维码图

        // if ($logo !== FALSE) {
        //   $QR = imagecreatefromstring(file_get_contents($QR));
        //   $logo = imagecreatefromstring(file_get_contents($logo));
        //   $QR_width = imagesx($QR);//二维码图片宽度
        //   $QR_height = imagesy($QR);//二维码图片高度
        //   $logo_width = imagesx($logo);//logo图片宽度
        //   $logo_height = imagesy($logo);//logo图片高度
        //   $logo_qr_width = $QR_width / 5;
        //   $scale = $logo_width/$logo_qr_width;
        //   $logo_qr_height = $logo_height/$scale;
        //   $from_width = ($QR_width - $logo_qr_width) / 2;
        //   //重新组合图片并调整大小
        //   imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width,
        //   $logo_qr_height, $logo_width, $logo_height);
        // }
        //输出图片  带logo图片
        // imagepng($QR, 'erweima/'.$users_id.'.png');

        //不带LOGO
        Vendor('phpqrcode.phpqrcode');
        //生成二维码图片
        $object = new \QRcode();
        $url='http://www.shouce.ren/';//网址或者是文本内容
        $level=3;
        $size=4;
        $ad = ROOT_PATH . 'public' . DS . 'uploads/erweima/'.$users_id.'.jpg';
        $errorCorrectionLevel =intval($level) ;//容错级别
        $matrixPointSize = intval($size);//生成图片大小
        $object->png($url,  $ad, $errorCorrectionLevel, $matrixPointSize, 2);
        return json($object);
    }
    public function qrcode($url="www.banpai.com",$level=3,$size=4)
    {
        Vendor('phpqrcode.phpqrcode');
        $errorCorrectionLevel =intval($level) ;//容错级别
        $matrixPointSize = intval($size);//生成图片大小
        //生成二维码图片
        $object = new \QRcode();
        $ad = ROOT_PATH . 'public/' . DS . '/uploads/ewm/ddd.jpg';
        $object->png($url, $ad, $errorCorrectionLevel, $matrixPointSize, 2);
        return json($object);
    }
}