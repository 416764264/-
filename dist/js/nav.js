console.log('nav')
//处理导航部分的js  声明模块amd 规范

define(['jquery'], function ($) {
    //数据下载
    function download() {
        $.ajax({
            type: 'get',
            url: '../data/nav.json',
            success: function (result) {
                //console.log(result)
                //取出对象的banner属性
                var bannerarr = result.banner
                // console.log(bannerarr)
                //循环添加数据到页面上
                for (var i = 0; i < bannerarr.length; i++) {
                    //console.log(bannerarr[i])
                    $(`<a href="${bannerarr[i].url}">
                    <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerarr[i].img}' alt=""/>
                </a>`).appendTo('#J_homeSwiper .swiper-slide')
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet '></a>`)
                    if (i == 0) {
                        node.addClass('swiper-pagination-bullet-active')
                    }
                    node.appendTo('#J_homeSwiper .swiper-pagination')
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        leftnavdownload()//调用侧边栏的函数
        topnavdownload()//调用顶部导航的函数
    }

    //banner图的效果
    function banner() {
        var inow = 0  //当前图片的下标
        var aimg = null //当前图片
        var abtns = null//当前圆点

        //启动一个定时器

        var timer = setInterval(function () {
            inow++
            tab()
        }, 1000)

        //封装切换函数

        function tab() {
            //判断有没有值 没有的话 把所有的图片赋值给他
            if (!aimg) {
                aimg = $('#J_homeSwiper .swiper-slide').find('a')
            }
            //找到所有圆点
            if (!abtns) {
                abtns = $('#J_homeSwiper .swiper-pagination').find('a')
            }
            //判断当下下标为5的时候 切回下下标0
            if (inow == 5) {
                inow = 0
            }

            //图片隐藏显示切换透明度
            aimg.hide().css('opacity', 0.2).eq(inow).show().animate({ opacity: 1 }, 500)

            //圆点选中状态的切换
            abtns.removeClass('swiper-pagination-bullet-active').eq(inow).addClass('swiper-pagination-bullet-active')

        }

        //鼠标的移出移出 找到div 和所有两个按钮 关闭和启动定时器

        $('#J_homeSwiper,.swiper-button-prev,.swiper-button-next').mouseenter(function () {
            clearInterval(timer)
        }).mouseleave(function () {
            timer = setInterval(function () {//重新启动定时器。不要赋值
                inow++
                tab()
            }, 1000)
        })

        //点击小小圆点切换图片，因为图片和按钮是ajax异步加载的，所有获取不到他们，添加点击事件要用事件委托
        $('#J_homeSwiper .swiper-pagination').on('click', 'a', function () {
            //alert($(this).index())
            inow = $(this).index()  //点击的时候把当前的下标给inow
            tab() //重新给inow 赋值

            return false //阻止a链接的默认行为
        })

        //点击按钮切换到下一张图片
        $('.swiper-button-prev,.swiper-button-next').click(function () {
            if (this.className == 'swiper-button-prev') {  //classname 不要加.变成.选择器
                inow--;
                if (inow == -1) {  //点击第一张图片的时候，切换到最后一张图片的下标
                    inow = 4;
                }
            } else {
                inow++
            }
            tab() //重新调用图片 圆点的效果
        })


    }


    //侧边栏的 下载数据 移入移出效果

    //下载数据  在上面的download  函数中调用了
    function leftnavdownload() {
        $.ajax({
            url: '../data/nav.json',
            success: function (result) {
                // console.log(result)//调用成功了
                var sidearr = result.sideNav//获取数据中的sideNav
                //console.log(sidearr)//length=10
                for (var i = 0; i < sidearr.length; i++) {
                    var node = $(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${sidearr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix children-col-4" >
                        
                    </div>
                    </li>`).appendTo('#J_categoryList')//将数据插入ul 下边的li里边
                   


                    //取出里边的child数据
                    var childarr = sidearr[i].child
                    //console.log(childarr)//10个数据 长度不一12-24

                    //计算有多少列（ul） 给ul添加class样式

                    var col = Math.ceil(childarr.length / 6); //一列6行   计算多少列
                    node.find('div.children').addClass('children-col-' + col) //给每一列添加class样式

                    //通过循环。创建右侧上面的每一个数据
                    for (var j = 0; j < childarr.length; j++) {
                        if (j % 6 == 0) {
                            var newul = $(` <ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newul.appendTo(node.find('div.children'))
                        }
                        $(` <li>
                       <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                           <img src="${childarr[j].img}" width="40" height="40" alt="" class="thumb">
                           <span class="text">${childarr[j].title}</span>
                       </a>
                   </li>`).appendTo(newul)

                    }
                }

            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    //给侧边导航添加移入移出事件  因为是动态获取的 所以需要用事件委托
    function leftnavtab(){
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", "li.category-item", function(){
            $(this).removeClass("category-item-active");
        })
    }


    //下载顶部导航兰的数据，实现效果

    //下载顶部导航的数据
    function topnavdownload(){
        $.ajax({
            url:'../data/nav.json',
            success:function(result){
                //console.log(result)
                var topnavarr=result.topNav
                //console.log(topnavarr)
                topnavarr.push({title:'服务'},{title:'社区'})//给数据添加两条数据
                
                for(var i=0;i<topnavarr.length;i++){
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                            <span class="text">${topnavarr[i].title}</span>
                        </a> 
                    </li>`).appendTo(".site-header .header-nav .nav-list");

                    //创建下拉下面的节点
                    var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                    </ul>`);
                    node.appendTo("#J_navMenu .container")

                     //取出所有的子菜单选项
                     if(topnavarr[i].childs){
                        var childsArr = topnavarr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })

        
    }

     //顶部导航添加移入移出效果
     function topnavtab(){
        
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            if(index >= 0 && index <= 6){
                $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
            }
        })
        $(".site-header").on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
        })


        //移出的时候取消下拉菜单
        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
        })
        
    }

    //搜索框下拉列表的静态效果

    function searchtab(){
        $('#search').focus(function(){
            $('#J_keywordList').removeClass('hide').addClass('show')
        })
        $('#search').blur(function(){
            $('#J_keywordList').removeClass('show').addClass('hide')
        })
    }


    //给list.js  设置侧部导航的移出效果
    function listtab(){
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display", 'block');
        })
        
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display", 'none');
        })
    }


    return {
        download: download,//暴露下载数据
        banner: banner,//暴露图片切换
        leftnavtab:leftnavtab,//侧边栏的移入移出
        topnavtab:topnavtab,//顶部导航的移入移出
        searchtab:searchtab,///搜索框下拉列表的静态效果

        leftnavdownload:leftnavdownload,
        topnavdownload:topnavdownload,
        topnavtab:topnavtab,
        listtab:listtab
        

    }
})