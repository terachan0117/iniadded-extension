function getHostname() {
    return location.hostname
}

function getPathname() {
    return location.pathname
}

function getSearch() {
    return location.search
}

function escapeHtml(str) {
    return str.replace(/[<>&"'`]/g, function (match) {
        const escape = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#x60;'
        };
        return escape[match];
    });
}

function copyTextToClipboard(textVal) {
    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = textVal;
    let bodyElm = document.getElementsByTagName("body")[0];
    bodyElm.appendChild(copyFrom);
    copyFrom.select();
    let retVal = document.execCommand('copy');
    bodyElm.removeChild(copyFrom);
    return retVal;
}

// ホストネームを取得し処理を分岐
switch (getHostname()) {

    // INIAD MOOCs
    case "moocs.iniad.org":

        /*
        全ページ共通
        */

        // 埋め込み 別タブで開く ボタン 追加
        $(".embed-responsive").each(function () {
            $('<a class="btn btn-sm btn-primary" href="' + $(this).children('iframe').attr("src") + '" target="_blank" title="Open in window" style="position:absolute;top:0px;right:0px;font-size:11.5px;opacity:0.9;"><i class="fa fa-window-restore"></i></a>').appendTo(this);
        });

        // INIADded Settings ボタン 追加
        $('<li><a href="https://moocs.iniad.org/courses?iniadded-settings" style="cursor:pointer;"><i class="fa fa-cog sidebar-shortcut-icon"></i><span> <span class="sidebar-menu-text">INIADded Settings</span></span></a></li>')
            .prependTo(".sidebar-menu");

        // Sticky Note ボタン 追加
        $('<li><a style="cursor:pointer;"><i class="fa fa-sticky-note sidebar-shortcut-icon"></i><span> <span class="sidebar-menu-text">Sticky Note</span></span></a></li>')
            .prependTo(".sidebar-menu").on('click', function () {
                addStickyNote();
            });

        // Python REPL ボタン 追加
        $('<li><a style="cursor:pointer;"><i class="fa fa-terminal sidebar-shortcut-icon"></i><span> <span class="sidebar-menu-text">Python REPL</span></span></a></li>')
            .prependTo(".sidebar-menu").on('click', function () {
                openPythonRepl();
            });

        // INIADded ヘッダー 追加
        $('<li class="header">INIADded</li>')
            .prependTo('.sidebar-menu');

        // Back to top ボタン 追加
        $('<li><a id="back-to-top" data-toggle="tooltip" title="Top" style="cursor:pointer;left:calc(50vw - 25px);bottom:11.2vh;display:none;position:fixed;"><i class="fa fa-angle-double-up"></i> Top</a></li>')
            .appendTo('.pager').on('click', function () {
                $('body, html').animate({
                    scrollTop: 0
                }, "normal", "swing");
            });

        if (getPathname().match(/^\/courses\/?(\d{4})?\/?$/)) {
            /*
            コースページ
            */

            // クエリーパラメーターを取得し処理を分岐
            switch (getSearch()) {

                // ストレージクリア (デバック用)
                case "?iniadded-settings":
                    showSettings();
                    break;

                    // ストレージクリア (デバック用)
                case "?sticky-notes":
                    showStickyNotes();
                    break;

                    // ストレージクリア (デバック用)
                case "?storageclear":
                    if (window.confirm("ローカルストレージの内容をすべて削除します。この操作は元に戻せません。本当によろしいですか？\n" +
                            "Delete all the contents of the local storage. This operation cannot be undone. Are you really sure?")) {
                        localStorage.clear();
                    }
                    location.href = "../courses";
                    break;

                default:

                    // コース年度 取得
                    const CURRENT_YEAR = $(".breadcrumb").text().substring(1);

                    // New Lectures ボタン表示
                    $('<a class="btn btn-primary btn-sm" href="?newlectures"><i class="fa fa-bell"></i> New Lectures <span id="new-lectures-badge" class="badge text-primary"></span></a>')
                        .insertBefore(".breadcrumb");

                    // My Courses ボタン表示
                    $('<a class="btn btn-default btn-sm" href="?mycourses"><i class="fa fa-book"></i> My Courses</a>')
                        .insertBefore(".breadcrumb");

                    // INIADded バナー表示
                    $('<div style="position:absolute;width:310px;height:60px;right:0px;top:60px;"><iframe src="https://iniadded.tera-chan.com/baner.html?' +
                            new Date().getTime() +
                            '" scrolling="no" style="background-color:transparent;width:100%;height:100%;border:none;"></iframe></div>')
                        .appendTo("body");

                    // Open Drive ボタン表示 (userLang===ja時のみ)
                    $.ajax({
                        url: '../account',
                        cache: false,
                        datatype: 'html',
                        success: function (html) {
                            const userLang = $(html).find('#lang').val();
                            if (userLang === "ja") {
                                $(".well").each(function () {
                                    let courseName = $(this).find(".media-heading").text();
                                    courseName = courseName.replace(/[\sIVXABⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]/g, "");
                                    if (courseName.indexOf("（") != -1) {
                                        courseName = courseName.slice(0, courseName.indexOf("（"));
                                    }
                                    if (courseName.indexOf("(") != -1) {
                                        courseName = courseName.slice(0, courseName.indexOf("("));
                                    }
                                    if (courseName.indexOf("＆") != -1) {
                                        courseName = courseName.slice(0, courseName.indexOf("＆"));
                                    }
                                    if (courseName.indexOf("&") != -1) {
                                        courseName = courseName.slice(0, courseName.indexOf("&"));
                                    }
                                    const driveUrl = 'https://drive.google.com/drive/search?q=type:folder%20' +
                                        CURRENT_YEAR + '%20' +
                                        encodeURI(courseName) + '%20parent:1KyD2j3o1_IeK7Gum676Ssd0uKDiAybQJ';
                                    $('<a class="btn btn-default" href="' + driveUrl + '" target="_blank"><i class="fa fa-folder-open"></i> Open Drive</a>')
                                        .appendTo($(this).find(".media-body"));
                                });
                            }
                        }
                    });
            }

        }
        break;

    default:
}
