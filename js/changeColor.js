const THEME_COLOR = localStorage.getItem("ThemeColor");

if (THEME_COLOR) {
    $(".main-header .navbar, .main-header .logo, .main-header .sidebar-toggle, .main-header li.user-header").css({
        "background-color": THEME_COLOR
    });
    $(".sidebar-menu>li.active>a").css({
        "border-left-color": THEME_COLOR
    });
    $(".btn-primary, .pagination>.active>a").css({
        "background-color": THEME_COLOR,
        "border-color": THEME_COLOR,
    });
}
