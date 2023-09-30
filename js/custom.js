document.querySelector('.banner').style = 'background: url("/img/bg.jpg") center right / cover no-repeat;transform: translate3d(0px, 0px, 0px);'



Function.prototype.getMultiLine = function () {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}
var string = function () {
    /*
    ____        U  ___ u    _   _    ____       U  ___ u    _   _     _  __       U  ___ u    _   _    __   __     _      
    U |  _"\ u      \/"_ \/ U |"|u| |  |  _"\       \/"_ \/ U |"|u| |   |"|/ /        \/"_ \/ U |"|u| |   \ \ / / U  /"\  u  
     \| |_) |/      | | | |  \| |\| | /| | | |      | | | |  \| |\| |   | ' /         | | | |  \| |\| |    \ V /   \/ _ \/   
      |  _ <    .-,_| |_| |   | |_| | U| |_| |\ .-,_| |_| |   | |_| | U/| . \\u   .-,_| |_| |   | |_| |   U_|"|_u  / ___ \   
      |_| \_\    \_)-\___/   <<\___/   |____/ u  \_)-\___/   <<\___/    |_|\_\     \_)-\___/   <<\___/      |_|   /_/   \_\  
      //   \\_        \\    (__) )(     |||_          \\    (__) )(   ,-,>> \\,-.       \\    (__) )(   .-,//|(_   \\    >>  
     (__)  (__)      (__)       (__)   (__)_)        (__)       (__)   \.)   (_/       (__)       (__)   \_) (__) (__)  (__) 
    */
}
window.console.log(string.getMultiLine());

if (window.location.href === 'https://xiamu.icu/about/' || window.location.href === 'http://localhost:4000/about/') {
    let ref = setInterval(function(){	//每隔2秒尝试播放一次
        isaplay();
    },2000);
    function isaplay(){
        $(".aplayer-play")[0].click()	//尝试播放
        setTimeout(function() {		//延时100毫秒再执行其内部的判断
            if($(".aplayer-pause").length > 0){    //`aplayer-button aplayer-pause`是否存在
            clearInterval(ref);		//停止Interval，即停止循环
        }}, 100);
    }
}
