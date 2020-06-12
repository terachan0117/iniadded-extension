$(window).on('scroll', function () {
    const back_to_top = $('#back-to-top');
    if ($(this).scrollTop() > 0) {
        back_to_top.fadeIn();
    } else {
        back_to_top.fadeOut();
    }
});
