function getHostname() {
    return location.hostname
}

function getPathname() {
    return location.pathname
}

function getSearch() {
    return location.search
}

function escapeHtml(text) {
    return text.replace(/[<>&"'`]/g, function (match) {
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

function copyTextToClipboard(text) {
    const $textarea = $('<textarea>' + text + '</textarea>');
    $textarea.appendTo("body");
    $textarea.select();
    document.execCommand('copy');
    $textarea.remove();
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

            // コース年度 取得
            const CURRENT_YEAR = $(".breadcrumb").text().substring(1);

            // クエリーパラメーターを取得し処理を分岐
            switch (getSearch()) {
                case "?iniadded-settings":
                    showSettings();
                    break;

                case "?new-lectures":
                    showNewLectures(CURRENT_YEAR);
                    break;

                case "?my-courses":
                    showMyCourses(CURRENT_YEAR);
                    break;

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
                    checkNewLectures(CURRENT_YEAR);
                    noticeMyCourses();

                    // New Lectures ボタン表示
                    $('<a class="btn btn-primary btn-sm" href="?new-lectures"><i class="fa fa-bell"></i> New Lectures <span id="new-lectures-badge" class="badge text-primary"></span></a>')
                        .insertBefore(".breadcrumb");

                    
                    // My Courses ボタン表示
                    if (getPathname().match(/^\/courses$/)) {
                        $('<a class="btn btn-default btn-sm" href="?my-courses"><i class="fa fa-book"></i> My Courses</a>')
                            .insertBefore(".breadcrumb");
                    }

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
                                $(".well").not(".my-course").each(function () {
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
    case "docs.google.com":
        $('<div class="goog-inline-block goog-flat-button" title="Capture this slide and download it in SVG format">Capture<br>this slide</div>')
            .appendTo(".punch-viewer-nav-fixed").on('click', function () {
                captureThisSlide();
            });
        $('<div class="goog-inline-block goog-flat-button" title="Capture all slides and download it in SVG format">Capture<br>all slides</div>')
            .appendTo(".punch-viewer-nav-fixed").on('click', function () {
                captureAllSlides();
            });
        $('<div class="goog-inline-block goog-flat-button" title="Copy the text on this slide to the clipboard">Copy<br>the text</div>')
            .appendTo(".punch-viewer-nav-fixed").on('click', function () {
                copySlideText();
            });
        break;

    case "g-sys.toyo.ac.jp":
        switch (getPathname()) {
            case "/univision/action/in/f08/Usin080111":
                $('<input type="button" class="button" value="Export to clipboard">')
                    .appendTo(".button_main").on('click', function () {
                        const tr = document.getElementsByClassName("list")[0].getElementsByTagName("tr");
                        let i = 1;
                        let result = [];
                        let day = "";
                        while (i < tr.length) {
                            const td = tr[i].getElementsByTagName("td");
                            let d = 0;
                            if (td.length == 11) {
                                day = td[0].textContent.replace(/曜日/g, '').replace(/Day of Week/g, '').replace(/\s{2,}/g, '').replace(/月/g, 'Mon').replace(/火/g, 'Tue').replace(/水/g, 'Wed').replace(/木/g, 'Thu').replace(/金/g, 'Fri').replace(/土/g, 'Sat').replace(/日/g, 'Sun');
                                d = 1;
                            }
                            if (td.length == 11 || td.length == 10) {
                                const obj = {
                                    "period": day + td[d].textContent.replace(/時限/g, '').replace(/Period/g, '').replace(/\s{2,}/g, '').replace(/[０-９]/g, function (s) {
                                        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
                                    }),
                                    "semester": td[d + 1].textContent.replace(/学期/g, '').replace(/Semester/g, '').replace(/\s{2,}/g, '').replace(/春/g, 'Spring').replace(/秋/g, 'Fall').replace(/[０-９]/g, function (s) {
                                        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                                    }),
                                    "id": td[d + 3].textContent.replace(/授業コード/g, '').replace(/Class code/g, '').replace(/\s{2,}/g, ''),
                                    "numbering": td[d + 4].textContent.replace(/科目ナンバリング/g, '').replace(/Course Number/g, '').replace(/\s{2,}/g, ''),
                                    "name": td[d + 5].textContent.replace(/科目名/g, '').replace(/Course name/g, '').replace(/\s{2,}/g, ''),
                                    "teacher": td[d + 6].textContent.replace(/担当者/g, '').replace(/Instructor/g, '').replace(/\s{2,}/g, ''),
                                    "classroom": td[d + 7].textContent.replace(/教室/g, '').replace(/Room/g, '').replace(/\s{2,}/g, '').replace(/[０-９]/g, function (s) {
                                        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                                    }),
                                    "campus": td[d + 8].textContent.replace(/キャンパス/g, '').replace(/Campus/g, '').replace(/\s{2,}/g, ''),
                                    "credit": td[d + 9].textContent.replace(/単位/g, '').replace(/Credit/g, '').replace(/\s{2,}/g, ''),
                                    "url": "#"
                                };
                                result.push(obj);
                            } else if (td.length == 1) {
                                result = [];
                            }
                            i = (i + 1) | 0;
                        }
                        copyTextToClipboard(JSON.stringify(result));
                        alert("Exported to clipboard!");
                    });
                break;
        }
        break;

    default:
}
