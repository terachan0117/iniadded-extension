const WALLPAPER = localStorage.getItem("Wallpaper");

if (WALLPAPER) {
    $(".content-wrapper").css({
        "background": 'url("' + WALLPAPER + '")',
        "background-size": "cover",
        "background-position": "center",
        "background-attachment": "fixed"
    });
    $(".content").css({
        "opacity": "0.9",
    });
    $(".content-header>h1, .content>h2, .markdown-block>h1, .markdown-block>h2").css({
        "text-shadow": "3px 3px 3px #FFFFFF, 3px -3px 3px #FFFFFF, -3px 3px 3px #FFFFFF, -3px -3px 3px #FFFFFF, 4px 0px 3px #FFFFFF, -4px 0px 3px #FFFFFF, 0px 4px 3px #FFFFFF, 0px -4px 3px #FFFFFF",
    });
    $(".content>h2>div").css({
        "text-shadow": "none",
    });
    $(".content>h4, .markdown-block>h4").css({
        "text-shadow": "2px 2px 2px #FFFFFF, 2px -2px 2px #FFFFFF, -2px 2px 2px #FFFFFF, -2px -2px 2px #FFFFFF, 3px 0px 2px #FFFFFF, -3px 0px 2px #FFFFFF, 0px 3px 2px #FFFFFF, 0px -3px 2px #FFFFFF",
    });
    $(".markdown-block>a, .markdown-block>p, .markdown-block>ul>li, .markdown-block>ol>li").css({
        "text-shadow": "1px 1px 1px #FFFFFF, 1px -1px 1px #FFFFFF, -1px 1px 1px #FFFFFF, -1px -1px 1px #FFFFFF, 2px 0px 1px #FFFFFF, -2px 0px 1px #FFFFFF, 0px 2px 1px #FFFFFF, 0px -2px 1px #FFFFFF",
    });
}
