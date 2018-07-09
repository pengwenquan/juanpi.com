<?php
    // 连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'juanpi';
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);
    $phonenum = isset($_GET['phonenum']) ? $_GET['phonenum'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $sql = "select phonenum from user where phonenum ='$phonenum'";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo "fail";
    }else{
        if($type === 'reg'){

            // 注册（保存到数据库）
            $sql = "insert into user(phonenum,pwd) values('$phonenum','$password')";

            // 执行sql语句
            $res = $conn->query($sql);
            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        }else{
            // 验证用户名可注册
            echo "success";
        }
    }
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

?>