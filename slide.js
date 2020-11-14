//遵从amd规范

define(['jquery'], function ($) {
    //获取sild，json的数据
    function download() {
        $.ajax({
            url: '../data/slide.json',
            success: function (result) {
                //alert(result)  输出成功
                //获取数据
                var slidearr = result.data.list.list
                //console.log(slidearr)  长度为26

                //遍历出元素并且添加到页面上
                for (var i = 0; i < slidearr.length; i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slidearr[i].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>${slidearr[i].goods_name}</h3>
                            <p class = 'desc'>${slidearr[i].desc}</p>
                            <p class = 'price'>
                                <span>${slidearr[i].seckill_Price}</span>元
                                <del>${slidearr[i].goods_price}</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo('#J_flashSaleList .swiper-wrapper')

                }

            },
            error: function (msg) {
                console.log(error)
            }
        })
    }




    // 封装运动函数
    function slidemove() {
        //获取到当前的所有按钮
        var aspans = $('.swiper-controls').find('span')
        //设置图片4个一组  
        var inow = 0
        var count = Math.ceil(26 / 4) - 1  //最后两张单独处理
        //7console.log(count)

        //设置定时器让他动起来
        var timer = setInterval(function () {
            inow++
            tab()//设置一个运动函数
            //当运动到最后时停止定时器
            if (inow == count) {
               inow=0
            }

        }, 2000)

        //给按钮添加点击事件让图片左右按照组去运动
         aspans.click(function(){
            if($(this).index()==0){
                inow--;
                inow=Math.max(0,inow)
            }else{
                inow++;
                inow=Math.min(count,inow)
            }
            tab();
        })
        
        //添加移入移出事件

        $('#J_flashSaleList').mouseenter(function(){
            clearInterval(timer)
        }).mouseleave(function(){
            timer = setInterval(function () {
                inow++
                tab()//设置一个运动函数
                //当运动到最后时停止定时器
                if (inow == count) {
                    inow=0
                }
    
            }, 2000)
        })
   

        //设置运动函数
        function tab() {
            //当现实第一组图片的时候，第一个按钮变为不可选中
            //最后一组的时候，最后一个按钮不可选中
            inow == 0 ? aspans.eq(0).addClass("swiper-button-disabled") : aspans.eq(0).removeClass("swiper-button-disabled");
            inow == count ? aspans.eq(1).addClass("swiper-button-disabled") : aspans.eq(1).removeClass("swiper-button-disabled")

            //var iTarget = inow == count ? inow * -992 + 496 :inow * -992 + 496;
            var iTarget//计算移动的距离
            if (inow == count) {
                iTarget = inow * -992 + 496
            } else {
                iTarget = inow * -992
            }
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })

        }
       
       

    }

    return {
        download: download,
        slidemove: slidemove
    }
})