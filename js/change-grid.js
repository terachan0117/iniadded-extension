const SLIDE_SMALL = localStorage.getItem("SlideSmall");

if (SLIDE_SMALL) {
    $(".pager").addClass("col-lg-12");
    $(".pad-block").has(".embed-responsive").addClass("col-lg-6");
    $(".pad-block").has(".embed-responsive").nextAll(".pad-block").addClass("col-lg-6");
}
