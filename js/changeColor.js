const THEME_COLOR = localStorage.getItem("ThemeColor");


if (THEME_COLOR) {
    $(".main-header .logo, .main-header .navbar .sidebar-toggle, .main-header .navbar, .main-header li.user-header, .markdown-block > h3").css({
        "background-color": THEME_COLOR
    });
    $(".sidebar-menu>li.active>a, .markdown-block > h4").css({
        "border-left-color": THEME_COLOR
    });
    $(".btn-primary, .pagination>.active>a").css({
        "background-color": THEME_COLOR,
        "border-color": THEME_COLOR,
    });
    $("a, .text-primary").not(".main-header .logo, .main-header .navbar .sidebar-toggle, .main-header .navbar .nav>li>a, .sidebar-menu a, .btn, .pagination>.active>a, .list-group-item").css({
        "color": THEME_COLOR
    });
}
