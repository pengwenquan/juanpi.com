require.config({
    paths:{
        jquery: '../lib/jquery-3.3.1'
       
    }
})
define(['jquery'], function($){
    $('#btn_login').click(function(){
        let $_phonenum = $('#username').val();
        let $_pwd = $('#pwd').val();
        let autoLogin
        ajax({
            url:'../api/login.php',
            data:{
                phonenum:$_phonenum,
                password:$_pwd,

            },
            success:function(data){
                if(data == 'success'){
                    window.location.href = '../index.html';
                    $('.tips').html('');
                }else{
                    $('.tips').html('帐号或者密码错误，请重新填写');
                    $('.tips').css('color','red');
                }
            }
        });
    })
});