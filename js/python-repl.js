function openPythonRepl() {
    const $div = $('<div style="position:fixed;width:25vw;height:50vh;right:15px;top:60px;background:#333;z-index:7;padding-left:15px;border-radius:5px;opacity:0.9;">' +
        '<div class="text-muted" style="width:100%;height:5%"><i class="fa fa-times" style="cursor:pointer;float:right;"></i></div>' +
        '<div style="width:100%;height:95%;border-top:1px solid #fff;border-left:1px solid #fff;">' +
        '<iframe src="https://iniadded.tera-chan.com/python/index.html" scrolling="no" style="background-color:transparent;width:100%;height:100%;border:none;">' +
        '</iframe></div></div>');
    $div.draggable();
    $div.resizable();
    $div.appendTo("body");
    $div.children("div").children(".fa-times").on('click', function () {
        $(this).parents('div').remove();
    });
}
