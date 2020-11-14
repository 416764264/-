// 主页商品数据
define(['jquery'], function ($) {
    //下载数据
    function download() {
        $.ajax({
            type: 'get',
            url: '../data/data.json',
            success: function (reselt) {
                var firstdata = reselt[0]//取出第一个下标的数据  2个数据
                // alert(firstdata)
                var node = $(`<div class = 'home-banner-box'>
               <a href="#">
                   <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
               </a>
           </div>
           <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
               <div class = 'box-hd'>
                   <h2 class = 'title'>${reselt[0].title}</h2>
                   <div class = "more">
                       <a href="#" class = 'more-link'>
                           查看全部
                           <i class = 'iconfont iconfont-arrow-right-big'></i>
                       </a>
                   </div>
               </div>
               <div class = 'hox-bd clearfix'>
                   <div class = 'row'>
                       <div class = 'span4'>
                           <ul class = 'brick-promo-list clearfix'>
                               <li class = 'brick-item brick-item-l'>
                                   <a href="#">
                                       <img src="${reselt[0].img}" alt=""/>
                                   </a>
                               </li>
                           </ul>
                       </div>
                       <div class = 'span16'>
                           <ul class = 'brick-list clearfix'>
                               
                           </ul>
                       </div>
                   </div>
               </div>
           </div> `)

                node.appendTo('.page-main .container')

                //取出第一部分 child 的数据  并且插入到第一部分页面

                var childdata = firstdata.childs
                //console.log(childdata)
                for (var i = 0; i < childdata.length; i++) {
                    //alert(childdata[i])
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                    <a href="#">
                        <div class = 'figure figure-img'>
                            <img width="160" height="160" src="${childdata[i].img}" alt=""/>
                        </div>
                        <h3 class = 'title'>
                           ${childdata[i].title}
                        </h3>
                        <p class = 'desc'> ${childdata[i].desc}</p>
                        <p class = 'price'>
                            <span class = 'num'>${childdata[i].price}</span>
                            元
                            ${childdata[i].del == 0 ? '' : '<del>' + childdata[i].del + '元</del>'}   
                            <span></span>
                        </p>
                    </a>
                </li>`).appendTo(".hox-bd .span16 ul");
                }
                //上面插入节点位置要写对
                //取出第二部分的数据插入到页面上 //因为上面取出了一个。这里从1开始
                for (var k = 1; k < reselt.length; k++) {
                    var node2 = $(`<div class = 'home-banner-box'>
                  <a href="#">
                      <img src="${reselt[k].topImg}" alt=""/>
                  </a>
              </div>
              <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                  <div class = 'box-hd clearfix'>
                      <h2 class = 'title'>${reselt[k].title}</h2>
                      <div class = 'more'>
                          <ul class = 'tab-list'>
                              <li class = 'tab-active'>
                                  热门
                              </li>
                              <li>
                                  电视影音
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class = 'box-bd'>
                      <div class = 'row'>
                          <div class = 'span4'>
                              <ul class = 'brick-promo-list clearfix'>
                                  <li class = 'brick-item  brick-item-m'>
                                      <a href="#">
                                          <img src="${reselt[k].leftChilds[0]}" alt=""/>
                                      </a>
                                  </li>
                                  <li class = 'brick-item  brick-item-m'>
                                      <a href="#">
                                          <img src="${reselt[k].leftChilds[1]}" alt=""/>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                          <div class = 'span16'>
                              <ul class = "brick-list clearfix hide" >

                              </ul>
                              <ul class = "brick-list clearfix" >

                              </ul>
                          </div>
                      </div>
                  </div>
              </div>`)
                    node2.appendTo('.page-main .container')

                    //取出hotChilds的数据
                    var hotdata = reselt[k].hotChilds
                    //alert(hotdata)
                    for (var l = 0; l < hotdata.length; l++) {    //判断最后一个的class样式是什么
                        $(` <li class = 'brick-item  ${l == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="160" height="160" src="${hotdata[l].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>${hotdata[l].title}</h3>
                            <p class = 'desc'>${hotdata[l].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>2599</span>元
                                <del>
                                    <span class = 'num'>2799</span>元
                                </del>
                            </p>
                        </a>
                    </li>`).appendTo(node2.find(".span16 .brick-list").eq(0))
                    }
                    //插入最后的一个
                    $(`<li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                </li>`).appendTo(node2.find(".span16 .brick-list").eq(0))



                    //复制hot  到child  数据
                    var childsdata = reselt[k].childs
                    //alert(childsdata)
                    for (var f = 0; f < childsdata.length; f++) {    //判断最后一个的class样式是什么
                        $(` <li class = 'brick-item  ${f == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="160" height="160" src="${childsdata[f].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>${childsdata[f].title}</h3>
                            <p class = 'desc'>${childsdata[f].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>2599</span>元
                                <del>
                                    <span class = 'num'>2799</span>元
                                </del>
                            </p>
                        </a>
                    </li>`).appendTo(node2.find(".span16 .brick-list").eq(1))
                    }
                    //插入最后的一个
                    $(`<li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                </li>`).appendTo(node2.find(".span16 .brick-list").eq(1))
                }

            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }
    //给热门或电视做切换：
    function tab(){
        $('.page-main .container').on('mouseenter','.more .tab-list li',function(){
            //console.log($(this)) 移入的对象
            //$(this).addClass('tab-active').siblings('li').removeClass('tab-active')
            $(this).addClass("tab-active").siblings("li").removeClass("tab-active")
            $(this).closest('.home-brick-box').find('.box-bd .span16 ul').addClass('hide').eq($(this).index()).removeClass('hide')
             //同时切换显示的商品内容
             //$(this).closest(".home-brick-box").find(".box-bd .span16 div ul").addClass("hide").eq($(this).index()).removeClass("hide");

        })
    }
    

    return {
        download: download,
        tab:tab
    }
})