function countCharacters(text) {
    return text.replace(/[\n\s　]/g, '').length;
}

function countWords(text) {
    return (text.match(/\S+/g) || []).length;
}

$(window).on('load', function () {
    $("textarea").not(".stickynote-textarea, #my_course").each(function () {
        $('<p class="text-muted">' + countCharacters($(this).val()) + ' characters ' + countWords($(this).val()) + ' words</p>')
            .insertBefore(this);
        $(this).on('input', function () {
            $(this).prev().text(countCharacters($(this).val()) + ' characters ' + countWords($(this).val()) + ' words');
        });
    });
});
