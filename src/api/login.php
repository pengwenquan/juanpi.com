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

    $sql = "select * from user where phonenum = '$phonenum' and pwd = '$password'";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo "success";
    }else{
        echo "fail";
    }
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

?>