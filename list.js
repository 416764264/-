console.log('1234567890')
//设置规范
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'nav':'nav',
        'slide':'slide',
        'data':'data',
        'goodslist2':'goodslist2'
    },
    shim:{
        //设置依赖关系，jc 是基于jq 开发的  要在jc 前面引入jq
        'jqurey-cookie':['jquery']
    }
})

require(['nav','goodslist2'],function(nav,goodslist2){
    nav.searchtab()
    nav.topnavdownload()
    nav.topnavtab()
    nav.leftnavdownload()
    nav.listtab()
    nav.leftnavtab()

    //goodslist
    goodslist2.download()
    goodslist2.banner()

})