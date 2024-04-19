document.addEventListener('keydown', function (event) {
    // 判断是否按下了 F12 键
    if ((event.key === 'F12' || event.code === 'F12') || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        console.clear();
        let currentPointer = parseInt(document.querySelectorAll('li.on')[0].innerText.match(/P(\d+)/)[0].substring(1));
        let totalPointer = parseInt(document.getElementsByClassName('cur-page')[0].innerText.split('/')[1].split(')')[0])

        function calcRemainTime(pointer) {
            let sum = 0;
            for (i = 0; i < pointer; i++) {
                let min = document.getElementsByClassName('duration')[i].innerText.substr(0, 2);
                let sec = document.getElementsByClassName('duration')[i].innerText.substr(3, 2);
                sum += parseInt(min) * 60 + parseInt(sec);
            }
            return sum / 60;
        }
        let t1 = calcRemainTime(totalPointer);
        let t2 = calcRemainTime(currentPointer);
        console.log(`
当前你处于 ${currentPointer} 集
当前视频时间总长: ${t1.toFixed(2)}分钟，${(t1 / 60).toFixed(2)}小时
还剩时间就学习完了: ${(t1 - t2).toFixed(2)}分钟，${((t1 - t2) / 60).toFixed(2)}小时
假设一天学习4小时, 还剩 ${(((t1 - t2) / 60) / 4).toFixed(2)} 天就学习完了
加油~

`);
    }
});