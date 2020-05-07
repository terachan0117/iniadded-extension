function showModal(header, body, footer) {
    let html = '<div class="modal fade in" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true" style="display:block; padding-left:16px;">' +
        '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title" id="myModalLabel">' + header + '</h4></div>' +
        '<div class="modal-body" style="height:calc(100vh - 120px);overflow-y:scroll;">' + body + '</div>';
    if (footer) {
        html += '<div class="modal-footer">' + footer + '</div>';
    }
    html += '</div></div></div>';
    $(html)
        .appendTo("body").find(".close").on('click', function () {
            closeModal();
        });;
}

function closeModal() {
    $("#basicModal").remove();
}
