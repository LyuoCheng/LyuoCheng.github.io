document.getElementById('wechat').onclick = function () {
    $('.QR').toggleClass('QRc');
}



var clipboard = new ClipboardJS('.mailC', {
    text: function () {
        return "lyuocheng@gmail.com";
    }
});

clipboard.on('success', function (e) {
    alert('Copied.');
});

clipboard.on('error', function (e) {
    alert('Copy failed.');
});