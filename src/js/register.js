
require.config({
    paths:{
        jquery: '../lib/jquery-3.3.1'
       
    }
})

define(['jquery'], function($){
    $('#phonenum').blur(function() {
        let $_phonenum = $('#phonenum').val();
        // 验证手机号码
        if($_phonenum){
            //符合正则格式，发出ajax请求验证是否已被注册，否则直接提示格式不对
            if(/^1[3-9]\d{9}$/.test($_phonenum)){
                ajax({
                    url:'../api/reg.php',
                    data:{phonenum:$_phonenum},
                    success:function(data){
                        // data：fail,success
                        if(data === 'success'){
                            $('#phonenum').next().html('手机号码可注册');
                            $('#phonenum').next().css('color','green');
                        }else{
                            $('#phonenum').next().html('手机号码已被注册');
                            $('#phonenum').next().css('color','red');
                        }
                    }
                });
            }else{
                $('#phonenum').next().html('手机号码格式不正确');
                $('#phonenum').next().css('color','red');
            }
        }
    });
    //验证密码
    var psword = document.querySelector('#createpwd');
    var iOne=document.querySelector('.strength div i:nth-child(1)');
    var iTwo=document.querySelector('.strength div i:nth-child(2)');
    var iThree=document.querySelector('.strength div i:nth-child(3)');
    var spanTxt=document.querySelector('.ibox span');
    //密码强度：
    psword.oninput=function(){
      //判断是否含有数字：match方法返回的数组长度来判断；
        var res=(psword.value.match(/[0-9]/ig));
        //数组有值则返回长度，无则赋值-1；
          if(res){
            res=res.length;
          }else{
            res=-1;
          }
        //判断是否含有字母；
        var res1=(psword.value.match(/[a-z]/ig));
            if(res1){
            res1=res1.length;
          }else{
            res1=-1;
          }
        //判断是否含有特殊字符：非数字&非字母；
        var res2=(psword.value.match(/[^\da-z]/ig));
            if(res2){
            res2=res2.length;
          }else{
            res2=-1;
          }
        //弱强度：只含有数字或者字母：res>0&&res1<0&&res2<0;
        if((res>0&&res1<0&&res2<0)||(res<0&&res1>0&&res2<0)){
          iOne.className='weak';
          iTwo.className='first';
          iThree.className='first';
          spanTxt.innerText='弱';
          spanTxt.style.color='red';
        }
        //一般强度：数字、字母、特殊符号仅有两方出现：(res>0&&res1>0&&res2<0)||(res>0&&res1<0&&res2>0)||(res<0&&res1>0&&res2>0);
        else if((res>0&&res1>0&&res2<0)||(res>0&&res1<0&&res2>0)||(res<0&&res1>0&&res2>0)){
          iOne.className='normal';
          iTwo.className='normal';
          iThree.className='first';
          spanTxt.innerText='一般';
          spanTxt.style.color='yellow';
        }
        //强：三者同时出现：res>0&&res1>0&&res2>0;
        else if(res>0&&res1>0&&res2>0){
          iOne.className='strong';
          iTwo.className='strong';
          iThree.className='strong';
          spanTxt.innerText='强';
          spanTxt.style.color='green';
        }
        else{
          iOne.className='first';
          iTwo.className='first';
          iThree.className='first';
          spanTxt.innerText='';
        }
    }
    //失去焦点验证密码
    $('#createpwd').blur(function(){
        let $_createpwd = $('#createpwd').val();
        if(/^[\da-z][^\s]{5,19}$/i.test($_createpwd)){
            $('#createpwd').next().html('密码格式正确');
            $('#createpwd').next().css('color','green');
        }else{
            $('#createpwd').next().html('密码格式不正确');
            $('#createpwd').next().css('color','red');
        }
    });
    $('#confirmpwd').blur(function(){
        let $_createpwd = $('#createpwd').val();
         let $_confirmpwd = $('#confirmpwd').val();
         if($_confirmpwd === $_createpwd){
            $('#confirmpwd').next().html('密码设置正确');
            $('#confirmpwd').next().css('color','green');
         }else{
            $('#confirmpwd').next().html('两次密码输入不一致');
            $('#confirmpwd').next().css('color','red');
         }
    });
    //验证码
    // var code = document.querySelector('.code');
    // code.innerHTML = showCode(5);
    $('.code').html(showCode(5));
    $('.code').click(function(){
        $('.code').html(showCode(5));
    });
    $('#verification').blur(function(){
        let code = $('.code').html();
        let verification = $('#verification').val();
        if(code == verification){
            $('.code').next().next().html('验证码正确');
            $('.code').next().next().css('color','green');
        }else{
            $('.code').next().next().html('验证码不正确');
            $('.code').next().next().css('color','red');
        }
    });
    // 验证是否勾选用户条款
    var rules = document.querySelector('.rules');
    var checked;
    rules.oninput = function(){
        checked = rules.checked;
        return checked;
    }
    //点击注册操作
    $('.btn').click(function(){

        if(checked){
            let $_phonenum = $('#phonenum').val();
            let $_pwd = $('#confirmpwd').val();
            ajax({
                url:'../api/reg.php',
                data:{
                    phonenum:$_phonenum,
                    password:$_pwd,
                    type:'reg'

                },
                success:function(data){
                    console.log(data)
                    if(data == 'success'){
                        window.location.href = '../html/login.html';
                    }
                }
            });
        }else{
            $('.btn').next().html('请确认条款！');
            $('.btn').next().css('color','red');
        }
    });
});