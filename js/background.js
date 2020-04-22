// 拡張機能のアイコンクリック→INIADded公式サイトへ遷移
chrome.browserAction.onClicked.addListener(function () {
    window.open("https://iniadded.tera-chan.com/");
});
