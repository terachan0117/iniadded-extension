const WALLPAPER = localStorage.getItem("Wallpaper");

if (WALLPAPER) {
    $(".content-wrapper").css({
        "background": 'url("' + WALLPAPER + '")',
        "background-position": "center",
        "background-size": "cover",
        "background-attachment": "fixed"
    });
    $(".content-header>h1, .content>h2:not(:has(div)), .markdown-block>h2").css({
        "text-shadow": "3px 3px 3px #FFFFFF, 3px -3px 3px #FFFFFF, -3px 3px 3px #FFFFFF, -3px -3px 3px #FFFFFF, 4px 0px 3px #FFFFFF, -4px 0px 3px #FFFFFF, 0px 4px 3px #FFFFFF, 0px -4px 3px #FFFFFF",
    });
    $(".content>h4, .markdown-block>h4").css({
        "text-shadow": "2px 2px 2px #FFFFFF, 2px -2px 2px #FFFFFF, -2px 2px 2px #FFFFFF, -2px -2px 2px #FFFFFF, 3px 0px 2px #FFFFFF, -3px 0px 2px #FFFFFF, 0px 3px 2px #FFFFFF, 0px -3px 2px #FFFFFF",
    });
    $(".markdown-block>p, .markdown-block>ul>li").css({
        "text-shadow": "1px 1px 1px #FFFFFF, 1px -1px 1px #FFFFFF, -1px 1px 1px #FFFFFF, -1px -1px 1px #FFFFFF, 2px 0px 1px #FFFFFF, -2px 0px 1px #FFFFFF, 0px 2px 1px #FFFFFF, 0px -2px 1px #FFFFFF",
    });
}
