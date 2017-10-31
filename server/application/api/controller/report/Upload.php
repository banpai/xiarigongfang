<?php
/**
 * Created by PhpStorm.
 * User: 29423
 * Date: 2017/10/27 0027
 * Time: 11:55
 */

namespace app\api\controller\report;

class Upload
{
    public function uploadImg(){
        $data = input();
        $base64_image_content = $data['fileVal'];
        $path = ROOT_PATH . 'public' . DS . 'uploads';
        //匹配出图片的格式
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
            $type = $result[2];
            $date = "/".date('Ymd',time())."/";
            $new_file = $path.$date;
            if(!file_exists($new_file)){
                //检查是否有该文件夹，如果没有就创建，并给予最高权限
                mkdir($new_file, 0700);
            }
            $now = time();
            $new_file = $new_file.$now.".{$type}";
            $path = '/uploads'.$date.$now.".{$type}";
            if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
                return json([
                    'path'=>$path
                ]);
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}