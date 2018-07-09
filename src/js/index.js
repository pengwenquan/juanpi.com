require.config({
    paths:{
        jquery: '../lib/jquery-3.3.1',
    }
})
define(['jquery'], function($){
    // 轮播图
    var slide = document.querySelector('.slide');
    var imgbox = document.querySelector('.imgbox');
    var imglist = document.querySelectorAll('.imgbox li');
    var dottedlist = document.querySelectorAll('.dottedbox li a');
    var btnPre=document.querySelector('.btnPre');
    var btnNext = document.querySelector('.btnNext');
    var index = 0;
    slide.onmouseout = function(){
        var timer = setInterval(function(){
            index++;
        if(index >= 5){
            index = 0;
        }
            changImg();
        },2000)
        slide.onmouseover = function(){
            clearInterval(timer);
        }
    }
    slide.onmouseout();
    function dottedClick(){
        for(var j = 0;j < dottedlist.length;j++){
            dottedlist[j].index = j;
            dottedlist[j].onclick = function(){
                for(var k =0;k < dottedlist.length;k++){
                    dottedlist[k].className = '';
                }
                this.className = 'actived'; 
                var idx = this.index;
                imgbox.style.transform =`translateX(${idx * 700 * -1}px)`;
           }
       } 
    }
    dottedClick();
    btnNext.onclick=function(){
        index++;
        if(index >= 5){
            index = 0;
        }
        changImg();
    }
    btnNext.onmouseover=function(){
        this.style.opacity='1';
    }
    btnNext.onmouseout=function(){
        this.style.opacity='0.6';
    }
    btnPre.onclick = function(){
        index--;
        if(index < 0){
            index = 4;
        }
        changImg();
    }
    btnPre.onmouseover=function(){
        this.style.opacity='1';
    }
    btnPre.onmouseout=function(){
        this.style.opacity='0.6';
    }
    //封装图片以及圆点改变的函数；
    function changImg(){
        for(var i = 0;i < dottedlist.length;i++){
            dottedlist[i].className = '';
        }
        imgbox.style.transform = `translateX(${index * 700 * -1}px)`;
        dottedlist[index].className = 'actived';
        
    }
    ajax({
        url:'./api/idx.php',
        success:function(data){
            let main_b = document.querySelector('#main .main_b');
            for(let i=1;i<=5; i++){
                let ul = document.createElement('ul');
                main_b.appendChild(ul);
                data.data.map(function(item,idx){
                    let li = document.createElement('li');
                    ul.appendChild(li);
                     li.innerHTML =
                     `<a href="./html/goodsInfo.html?a=${item.goodsid}">
                        <img src="./img/good${item.goodsid}.jpg" />
                        <i class="iconfont icon-xinheart118" title="加入收藏"></i>
                     </a>
                    <span class="salePrice">￥${item.salePrice}</span><span class="normalPrice">￥${item.normalPrice}</span>
                    <a href="./html/goodsInfo.html?a=${item.goodsid}">${item.goodsname}</a>`;

                })
            }
            let pageQty = Math.ceil(data.total/data.qty);
            let pagelen = document.querySelector('.pagelen');
            for(let k = 1; k<=pageQty; k++){
                let pageSpan = document.createElement('span');
                pageSpan.innerText = k;
                pagelen.appendChild(pageSpan);
                pageSpan.className = 'pagenum';
                if(k === data.page){
                    pageSpan.className = 'active';
                }
            }

            console.log(data);
        }
    });

    let pagelen = document.querySelector('.pagelen');
    pagelen.onclick = function(e){
        if(e.target.tagName.toLowerCase() === 'span'){
            let pageNo = e.target.innerText;
            console.log(pageNo);
            ajax({
                url:'./api/idx.php',
                type:'get',
                data:{
                    page:pageNo,
                },
                success:function(data){
                    $('.main_b').html('');
                    $('.pagelen').html('');
                    let main_b = document.querySelector('#main .main_b');
                    for(let i=1;i<=5; i++){
                        let ul = document.createElement('ul');
                        main_b.appendChild(ul);
                        data.data.map(function(item,idx){
                            let li = document.createElement('li');
                            ul.appendChild(li);
                             li.innerHTML =
                             `<a href="./html/goodsInfo.html?a=${item.goodsid}">
                                <img src="./img/good${item.goodsid}.jpg" />
                                <i class="iconfont icon-xinheart118" title="加入收藏"></i>
                             </a>
                            <span class="salePrice">￥${item.salePrice}</span><span class="normalPrice">￥${item.normalPrice}</span>
                            <a href="./html/goodsInfo.html?a=${item.goodsid}">${item.goodsname}</a>`;

                        })
                    }
                    let pageQty = Math.ceil(data.total/data.qty);
                    let pagelen = document.querySelector('.pagelen');
                    for(let k = 1; k<=pageQty; k++){
                        let pageSpan = document.createElement('span');
                        pageSpan.innerText = k;
                        pagelen.appendChild(pageSpan);
                        pageSpan.className = 'pagenum';
                        if(k === data.page){
                            pageSpan.className = 'active';
                        }
                    }

                    console.log(data);
                }
            })
        }
    }
});