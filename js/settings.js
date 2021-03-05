const APP_VERSION = "8.2.0";

function showSettings() {
    let header_html = '<h1>INIADded Settings</h1><ol class="breadcrumb"><li class="active"><i class="fa fa-dashboard"></i> INIADded Settings</li></ol>';
    $('.content-header').html(header_html);

    let html = '<div class="panel pad-form">' +

        '<div class="media">' +
        '<div class="media-left">' +
        '<img class="media-object" src="https://iniadded.tera-chan.com/img/icon128.png" alt="INIADded" style="width:73px;height:73px;">' +
        '</div>' +
        '<div class="media-body">' +
        '<h4 class="media-heading">INIADded Extension (Version ' + APP_VERSION + ')</h4>' +
        '<a class="btn btn-primary btn-sm" href="https://iniadded.tera-chan.com" target="_blank"><i class="fa fa-home"></i> 公式サイト Official website</a>' +
        '<a class="btn btn-default btn-sm" href="https://iniadded.tera-chan.com/documents/" target="_blank"><i class="fa fa-question-circle"></i> 使い方 How to use</a>' +
        '<div style="font-size:13px;">Copyright © 2019-' + new Date().getFullYear() + ' <a href="https://tera-chan.com/" target="_blank">Terachan</a> All Rights Reserved.</div>' +
        '</div>' +
        '</div>' +

        '<hr>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="my_course">マイコース<br>My Course</label><div class="col-sm-9">' +
        '<textarea class="form-control" rows="2" id="my_course" name="my_course" placeholder="Paste the JSON exported from ToyoNet-G.">' + (localStorage.getItem("UserCourses") ? localStorage.getItem("UserCourses") : '') + '</textarea>' +
        '* ToyoNet-Gから履修中のコースをインポートできます。<a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank">リンク先のページ</a>下部にある「Export to clipboard」ボタンを押し、内容をペーストしてください。<br>' +
        '* You can import courses that you are taking from ToyoNet-G. Press the “Export to clipboard” button at the bottom of <a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank">the linked page</a>, and paste the contents.' +
        '</div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="fixed_header">付箋<br>Sticky Note</label><div class="col-sm-9">' +
        '<a class="btn btn-primary" href="https://moocs.iniad.org/courses?sticky-notes"><i class="fa fa-list"></i> 一覧 List</a>' +
        '</div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="fixed_header">ヘッダー固定<br>Fixed Header</label><div class="col-sm-9">' +
        '<input id="fixed_header" name="fixed_header" type="checkbox" ' + (localStorage.getItem("HeaderFixed") ? 'checked' : '') + '></div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="small_slide">スライド縮小<br>Small Slide</label><div class="col-sm-9">' +
        '<input id="small_slide" name="small_slide" type="checkbox" ' + (localStorage.getItem("SlideSmall") ? 'checked' : '') + '></div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="hide_account">アカウント非表示<br>Hide Account</label><div class="col-sm-9">' +
        '<input id="hide_account" name="hide_account" type="checkbox" ' + (localStorage.getItem("HideAccount") ? 'checked' : '') + '></div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="theme_color">テーマカラー<br>Theme Color</label><div class="col-sm-9">' +
        '<input id="theme_color" name="theme_color" type="color" value="' + (localStorage.getItem("ThemeColor") ? localStorage.getItem("ThemeColor") : '#3c8dbc') + '">' +
        '</div></div>' +

        '<div class="form-group row"><label class="col-sm-3 col-form-label" for="wallpaper">壁紙<br>Wallpaper</label><div class="col-sm-9"><input class="form-control-file" id="wallpaper" name="wallpaper" type="file" accept="image/jpeg, image/png">' +
        '<p>* 選択されていないまま更新すると初期化されます。* If you update without selecting it, it will be initialized.</p><canvas id="wallpaper_preview" style="width:250px;"></canvas></div></div>' +
        '<div class="text-left"><button class="btn btn-primary" id="update_settings">Update</button><button class="btn btn-default" id="initialize_settings">Initialize</button></div>' +
        '</div>';
    $('.content').html(html).on('change', function () {
        updateSettings("auto");
        setSettings();
    });
    $('#update_settings').on('click', function () {
        updateSettings();
    })
    $('#initialize_settings').on('click', function () {
        initializeSettings();
    })
    setSettings();
}

function setSettings() {
    if (localStorage.getItem("Wallpaper")) {
        const canvas = $("#wallpaper_preview");
        const ctx = canvas[0].getContext("2d");
        const img = new Image();
        img.src = localStorage.getItem("Wallpaper");
        img.onload = function () {
            canvas.attr("width", img.width);
            canvas.attr("height", img.height);
            ctx.drawImage(img, 0, 0);
        }
    }
}

function updateSettings(is_auto) {
    if ($('#my_course').val()) {
        const courses = $('#my_course').val();
        try {
            JSON.parse(courses);
            localStorage.setItem("UserCourses", courses);
        } catch {
            alert("マイコースにJSON以外のテキストが入力されています。\nText other than JSON is entered in My Course.");
            $('#my_course').val("");
        }
    } else {
        localStorage.removeItem("UserCourses");
    }
    if ($("#fixed_header").prop("checked")) {
        localStorage.setItem("HeaderFixed", "true");
    } else {
        localStorage.removeItem("HeaderFixed");
    }
    if ($("#small_slide").prop("checked")) {
        localStorage.setItem("SlideSmall", "true");
    } else {
        localStorage.removeItem("SlideSmall");
    }
    if ($("#hide_account").prop("checked")) {
        localStorage.setItem("HideAccount", "true");
    } else {
        localStorage.removeItem("HideAccount");
    }
    if ($("#theme_color").val() !== "#3c8dbc") {
        localStorage.setItem("ThemeColor", $("#theme_color").val());
    } else {
        localStorage.removeItem("ThemeColor");
    }
    if ($("#wallpaper").val()) {
        const file = $("#wallpaper").prop('files')[0];
        if (!file.type.match(/^image\/(jpeg|png)$/)) {
            alert("壁紙にJPEGまたはPNG以外のファイルが選択されています。\nA file other than JPEG or PNG is selected as the wallpaper.");
            return;
        }
        const image = new Image();
        const reader = new FileReader();
        reader.onload = function (evt) {
            image.onload = function () {
                const canvas = $("#wallpaper_preview");
                const ctx = canvas[0].getContext("2d");
                canvas.attr("width", image.width);
                canvas.attr("height", image.height);
                ctx.drawImage(image, 0, 0);
                const base64 = canvas[0].toDataURL(file.type);
                localStorage.setItem("Wallpaper", base64);
            }
            image.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        localStorage.removeItem("Wallpaper");
    }
    if (!is_auto) {
        alert("すべての設定を保存しました。\nAll your settings have been saved.");
        location.reload();
    }
}

function initializeSettings() {
    if (window.confirm("ローカルストレージを初期化します。他の拡張機能やサービスがこれを使用している場合、問題が生じる場合があります。この操作は元に戻せません。本当によろしいですか？\n" +
            "Initialize local storage. Problems can occur if other extensions or services are using it. This operation is irreversible. Are you really sure?")) {
        localStorage.clear();
        location.reload();
        alert("ローカルストレージを初期化しました。\nInitialized the local storage.");
    }
}
