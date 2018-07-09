<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'juanpi';
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset('utf8');
    $goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : null;
    $sql = "select * from goodslist where goodsid = '$goodsid'";
    $res=$conn -> query($sql);
    $row=$res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>