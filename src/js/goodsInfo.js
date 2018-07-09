require.config({
    paths:{
        jquery: '../lib/jquery-3.3.1',
    }
})
define(['jquery'], function($){
    let _goodsid = GetQueryString('a');
    ajax({
        url: '../api/goodsInfo.php',
        data: {
            goodsid: _goodsid
        },
        success:function(data){
            let goodscolor = data[0].color.split(',');
            let goodssize = data[0].size.split(',');
            $('.itemInfo_b_m h4').html(data[0].goodsname);
            $('.itemInfo_b_m li:nth-child(2) span:first-child').html(`￥${data[0].salePrice}`);
            $('.itemInfo_b_m li:nth-child(2) span:last-child').html(`参考价：￥${data[0].normalPrice}`);
            goodscolor.map(function(item){
                $('.itemInfo_b_m li:nth-child(4)').append(`<span>${item}</span>`);
            });
            goodssize.map(function(item){
                $('.itemInfo_b_m li:nth-child(5)').append(`<span>${item}</span>`);
            })
            $('.itemInfo_b_l ul li:nth-child(1)').html(`<img src = "../img/good${data[0].goodsid % 4}/box1.jpg"/>`);
            $('.itemInfo_b_l ul li:nth-child(2)').html(`<img src = "../img/good${data[0].goodsid % 4}/box2.jpg"/>`);
            $('.itemInfo_b_l ul li:nth-child(3)').html(`<img src = "../img/good${data[0].goodsid % 4}/box3.jpg"/>`);
            $('.itemInfo_b_l ul li:nth-child(4)').html(`<img src = "../img/good${data[0].goodsid % 4}/box4.jpg"/>`);
            $('.itemInfo_b_l ul li:nth-child(5)').html(`<img src = "../img/good${data[0].goodsid % 4}/box5.jpg"/>`);
            $('.itemInfo_b_l ul li:nth-child(6)').html(`<img src = "../img/good${data[0].goodsid % 4}/box6.jpg"/>`);
            $('.itemInfo_b_l .smallimg').html(`<img src = "../img/good${data[0].goodsid % 4}/box1.jpg"/>`);
            $('.itemInfo_b_l .bigImg').html(`<img src = "../img/good${data[0].goodsid % 4}/box1.jpg"/>`);
            //图片切换
            let boxlist = document.querySelectorAll('.itemInfo_b_l ul.fl li');
            boxlist.forEach(function(item){
                item.onmouseover = function(){
                    this.style.borderColor = '#FF464E';
                    $('.itemInfo_b_l .smallimg').html(this.innerHTML);
                    return $('.itemInfo_b_l .bigImg').html(this.innerHTML);
                }
                 item.onmouseout = function(){
                    this.style.borderColor = '#ccc';
                 }
            })
        //放大镜
            let mark = document.querySelector('.mark'),
               smallImg = document.querySelector('.smallimg'),
               bigImg = document.querySelector('.bigImg');
            let imgB = bigImg.children[0]; //大图中的图片
            console.log(imgB);
            let scale = 4;        //缩放倍数  可调整
            let w = smallImg.offsetWidth; //小图的宽高
            let h = smallImg.offsetHeight;
            mark.style.width = w / scale + "px";
            mark.style.height = h / scale + "px";

            imgB.style.width = w * scale + "px";
            imgB.style.height = h * scale + "px";
            smallImg.onmouseover = function(){
               mark.style.display = "block";
               bigImg.style.display = "block";
            }    
            smallImg.onmouseout = function(){
               mark.style.display = "none";
               bigImg.style.display = "none";
            }
            smallImg.onmousemove = function(e){
               e = e || event;
               let x = e.clientX - mark.offsetWidth/2;
               let y = e.clientY - mark.offsetHeight/2;
               if(x <= 0){            //左侧边界判断
                   x = 0;
               }
               if(y <= 0){            //顶部边界判断
                   y = 0;
               }
               if(x >= smallImg.offsetWidth - mark.offsetWidth ){
                   x = smallImg.offsetWidth - mark.offsetWidth        //右侧边界判断
               }
               if(y >= smallImg.offsetHeight - mark.offsetHeight ){
                   y = smallImg.offsetHeight - mark.offsetHeight        //底部边界判断
               }
               mark.style.left = x + "px";
               mark.style.top = y + "px";
               imgB.style.left = -x*scale + "px";    //图片默认位置为0 0左上角位置 需要反向才能两者相对显示
               imgB.style.top = -y*scale + "px";
            }
            
        }
        
    });
    //数量
    $('.goodsQty').click(function(e){
        e = e.target || window.event;
        let qty = $('.goodsQty input').val()*1;
        qty = qty;
        if(e.innerText == '-'){
            qty = qty-1;
            if(qty < 1){
              qty = 1;
            }
            $('.goodsQty input').val(qty);
        }
        if(e.innerText == '+'){
            qty = qty+1;
            if(qty > 100){
              qty = 100;
            }
            $('.goodsQty input').val(qty);
        }
    })
    $('.goodsQty input').blur(function(){
        if($('.goodsQty input').val()*1 < 1){
            $('.goodsQty input').val('1');
        }
        if($('.goodsQty input').val()*1 > 100){
            $('.goodsQty input').val('100');
        }
    });
    //选择商品信息
    var colors = document.querySelector('.itemInfo_b_m li:nth-child(4)');
    console.log(colors.children);
    colors.onclick = function(e){
        e = e.target || window.event;
        console.log(e);
        e.className = '';
        if(e.tagName.toLowerCase() == 'span'){
          e.className = 'checked';
        }
    }  
});