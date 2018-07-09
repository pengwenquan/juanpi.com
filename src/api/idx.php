<?php
    // INSERT INTO `juanpi`.`goodslist` (`goodsname`,`normalPrice`,`salePrice`,`color`,`size`) VALUES ('复古长裙',360,200,'藏青色','M');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'juanpi';
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
    $sql = "select * from goodslist";
    $conn->set_charset('utf8');
    $res=$conn -> query($sql);
    $row=$res->fetch_all(MYSQLI_ASSOC);

    $arr = array(
        "total" => count($row),
        "data" => array_slice($row,$qty*($page-1),$qty),
        "qty" => $qty*1,
        "page" => $page*1
    );
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    // for($i=1; $i<=50; $i++){
    //     echo json_encode($row,JSON_UNESCAPED_UNICODE);
    // }
    
?>