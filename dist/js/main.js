console.log('加载中')
/* 
    遵从AMD规范。。define()  return    require('')
*/
  
//配置别名  可以省略js后缀
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'nav':'nav',
        'slide':'slide',
        'data':'data'
    },
    shim:{
        //设置依赖关系，jc 是基于jq 开发的  要在jc 前面引入jq
        'jqurey-cookie':['jquery']
    }
})
 

require(['nav','slide','data'],function(nav,slide,data){
    nav.download()//下载数据
    nav.banner()//轮播图
    nav.leftnavtab()//侧边移入移出
    nav.topnavtab()//顶部一出一出
    nav.searchtab()//搜索框

    //slide
    slide.download()
    slide.slidemove()

    //主页数据下载
    data.download()
    data.tab()
})


