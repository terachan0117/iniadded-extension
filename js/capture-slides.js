function downloadSlide() {
    let page = '';
    const name = $('title').text();
    while (true) {
        const title = $('.punch-viewer-svgpage-a11yelement:last').attr('aria-label').replace(//g, '<br>');
        const svg = $('.punch-viewer-svgpage-svgcontainer:last>svg').get(0);
        let text = '';
        $(svg).find('g').each(function () {
            if ($(this).attr('aria-label')) {
                text += $(this).attr('aria-label') + '<br />';
            }
        });
        page += '<div class="row">';
        page += '<h4>';
        page += title;
        page += '</h4>';
        page += '<div class="col-md-8">';
        page += new XMLSerializer().serializeToString(svg);
        page += '</div>';
        page += '<div class="col-md-4">';
        page += text;
        page += '</div>';
        page += '</div>';

        // 最終スライドの時
        if ($('.punch-viewer-nav-fixed>.goog-flat-button:eq(3)').attr('aria-disabled') === 'true') {
            break;
        }

        // スライドを強制的にめくる
        document.dispatchEvent(new KeyboardEvent('keydown', {
            keyCode: 39
        }));
    }
    let html = '<!DOCTYPE html><html><head><title>' + name + '</title>' +
        '<style>body {margin: 0;color: #333;background-color: #ecf0f5;}.container {width: 100%;margin: 0 auto;}.row {display: flex;flex-wrap: wrap;padding:10px;margin: 15px 10px;box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);border-radius: .25rem;}.row>*{width: 100%;box-sizing: border-box;padding:5px;overflow-wrap: break-word;}@media (min-width: 768px) {.container {max-width: 720px;}.col-md-8 {width: calc(66.6666666667% - 5px);}.col-md-4 {width: calc(33.3333333333% - 5px);}}@media (min-width: 992px) {.container {max-width: 960px;}}</style>' +
        '</head><body><main class="container">' + page + '</main></body></html>';

    let link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([html], {
        type: 'text/html'
    }));
    link.download = name+'.html';
    link.click();
    window.close();
}
