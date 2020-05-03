const HeaderFixed = localStorage.getItem("HeaderFixed");
if (HeaderFixed) {
    $(".main-header").css({
        "position": "fixed",
        "opacity": 0.9,
        "width": "100%"
    });
    $(".content-wrapper").css({
        "margin-top": "50px"
    });
}
