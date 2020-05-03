function showSettings() {
    const contentHeaderContents = '<h1>INIADded Settings</h1><ol class="breadcrumb"><li class="active"><i class="fa fa-dashboard"></i> INIADded Settings</li></ol>';
    const contentHeader = document.getElementsByClassName('content-header');
    contentHeader[0].innerHTML = contentHeaderContents;

    let containerFluidContents = '<div class="panel pad-form"><form id="INIADded-Settings-Form">';
    containerFluidContents += '<div class="media"><div class="media-left"><a href="https://iniadded.tera-chan.com/" target="_blank"><img class="media-object" src="https://iniadded.tera-chan.com/img/icon128.png" alt="INIADded" style="width:73px;height:73px;"></a></div><div class="media-body"><h4 class="media-heading">INIADded Extension</h4>' +
        '<a class="btn btn-primary btn-sm" href="https://iniadded.tera-chan.com" target="_blank"><i class="fa fa-home"></i> Official Website</a>' +
        '<a class="btn btn-default btn-sm" href="https://github.com/Terachan0117/iniadded-extension" target="_blank"><i class="fa fa-github"></i> GitHub</a>' +
        '<br><small>Copyright © ' + new Date().getFullYear() + ' <a href="https://tera-chan.com/" target="_blank">Terachan</a> All Rights Reserved.</small></div></div>';
    containerFluidContents += '<hr>';

    let userCourses = localStorage.getItem("UserCourses");
    if (userCourses) {
        userCourses = '<div class="form-group row"><label class="col-sm-3 col-form-label">マイコース<br>My Course</label><div class="col-sm-9"><textarea id="user-courses" style="width:100%" class="usercourses-textarea" placeholder="Paste the JSON exported from ToyoNet-G." spellcheck="false">' + userCourses + '</textarea>* ToyoNet-Gから履修中のコースをインポートできます。<a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank"><i class="fa fa-link"></i>リンク先のページ</a>下部にある「Export to clipboard」ボタンを押し、この上に内容をペーストしてください。各フィールドの値は必要に応じて変更できます。空白のまま提出することで初期化されます。<br>* You can import courses that you are taking from ToyoNet-G. Press the “Export to clipboard” button at the bottom of the <a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank"><i class="fa fa-link"></i>linked page</a>, and paste the contents onto this. You can change the value of each field as needed. It is initialized by submitting it blank.</div></div>';
    } else {
        userCourses = '<div class="form-group row"><label class="col-sm-3 col-form-label">マイコース<br>My Course</label><div class="col-sm-9"><textarea id="user-courses" style="width:100%" class="usercourses-textarea" placeholder="Paste the JSON exported from ToyoNet-G." spellcheck="false"></textarea>* ToyoNet-Gから履修中のコースをインポートできます。<a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank"><i class="fa fa-link"></i>リンク先のページ</a>下部にある「Export to clipboard」ボタンを押し、この上に内容をペーストしてください。各フィールドの値は必要に応じて変更できます。空白のまま提出することで初期化されます。<br>* You can import courses that you are taking from ToyoNet-G. Press the “Export to clipboard” button at the bottom of the <a href="https://g-sys.toyo.ac.jp/univision/action/in/f08/Usin080111" target="_blank"><i class="fa fa-link"></i>linked page</a>, and paste the contents onto this. You can change the value of each field as needed. It is initialized by submitting it blank.</div></div>';
    }
    containerFluidContents += userCourses;

    const stickyNote = '<div class="form-group row"><label class="col-sm-3 col-form-label">付箋<br>Sticky Note</label><div class="col-sm-9"><a class="btn btn-primary" href="https://moocs.iniad.org/courses?sticky-notes"><i class="fa fa-list"></i> 一覧 List</a><button class="btn btn-default" type="button" id="Sticky-Note-Remove-All"><i class="fa fa-trash"></i> 全削除 Delete All</button></div></div>';
    containerFluidContents += stickyNote;

    let headerFixed = localStorage.getItem("HeaderFixed");
    if (headerFixed != null) {
        headerFixed = '<div class="form-group row"><label class="col-sm-3 col-form-label">ヘッダー固定<br>Fixed Header</label><div class="col-sm-9"><input id="HeaderFixed" type="checkbox" name="HeaderFixed" checked></div></div>';
    } else {
        headerFixed = '<div class="form-group row"><label class="col-sm-3 col-form-label">ヘッダー固定<br>Fixed Header</label><div class="col-sm-9"><input id="HeaderFixed" type="checkbox" name="HeaderFixed"></div></div>';
    }
    containerFluidContents += headerFixed;

    let slideSmall = localStorage.getItem("SlideSmall");
    if (slideSmall != null) {
        slideSmall = '<div class="form-group row"><label class="col-sm-3 col-form-label">スライド縮小<br>Small Slide</label><div class="col-sm-9"><input id="SlideSmall" type="checkbox" name="SlideSmall" checked></div></div>';
    } else {
        slideSmall = '<div class="form-group row"><label class="col-sm-3 col-form-label">スライド縮小<br>Small Slide</label><div class="col-sm-9"><input id="SlideSmall" type="checkbox" name="SlideSmall"></div></div>';
    }
    containerFluidContents += slideSmall;

    let themeColor = localStorage.getItem("ThemeColor");
    if (themeColor != null) {
        themeColor = '<div class="form-group row"><label class="col-sm-3 col-form-label">テーマカラー<br>Theme Color</label><div class="col-sm-9"><input type="color" id="themecolor" name="themecolor" value="' + themeColor + '"> <button class="btn btn-default" type="button" id="initialize-color"><i class="fa fa-eraser"></i> 初期化 Initialize</button></div></div>';
    } else {
        themeColor = '<div class="form-group row"><label class="col-sm-3 col-form-label">テーマカラー<br>Theme Color</label><div class="col-sm-9"><input type="color" id="themecolor" name="themecolor" value="#3c8dbc"></div></div>';
    }
    containerFluidContents += themeColor;

    let wallpaper = '<div class="form-group row"><label class="col-sm-3 col-form-label">壁紙<br>Wallpaper</label><div class="col-sm-9"><input type="file" id="wallpaper" name="wallpaper" accept="image/*" value="">* 未選択のまま提出することで初期化されます。* It is initialized by submitting without selecting.<canvas id="Wallpaper-Thumb" style="display:none;"></canvas></div></div>';
    containerFluidContents += wallpaper;

    containerFluidContents += '</form><hr><p>* 回答は自動的に記録されますが、最後に「提出」ボタンをクリックし提出を確認してください。データはすべてブラウザに保存されます。MOOCsサーバーに保存されることはありません。<br>* Your answer will be automatically sent, but please press "SUBMIT" button to ensure your answers were perfectly sent. All data is stored in the browser. No data is stored on the MOOCs server.</p>';
    containerFluidContents += '<button class="btn btn-success" type="button" id="INIADded-Settings-Form-Submit"><i class="fa fa-arrow-circle-up"></i> 提出 SUBMIT</button></div>';
    const containerFluid = document.getElementsByClassName('container-fluid');
    containerFluid[0].innerHTML = containerFluidContents;

    document.getElementById("wallpaper").addEventListener("change", function (e) {
        var file = e.target.files;
        var reader = new FileReader();
        //ファイルが複数読み込まれた際に、1つめを選択
        reader.readAsDataURL(file[0]);
        //ファイルが読み込めたら
        reader.onload = function () {
            //サムネ画像表示
            var source = reader.result;
            var canvas = document.getElementById("Wallpaper-Thumb");
            if (canvas.getContext) {
                var context = canvas.getContext('2d');
                var image = new Image();
                image.src = source;
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                };
            }
        };
    }, false);

    try {
        document.getElementById("initialize-color").onclick = function () {
            if (window.confirm("本当に現在のテーマカラーを削除しますか？この操作は元に戻せません。\nAre you sure you want to delete current theme color? This operation cannot be undone.")) {
                localStorage.removeItem("ThemeColor");
                location.reload();
            }
        }
    } catch {}

    document.getElementById("INIADded-Settings-Form").onchange = function () {
        saveINIADdedSettings("auto");
    }

    document.getElementById("Sticky-Note-Remove-All").onclick = function () {
        if (window.confirm("本当に全ての付箋を削除しますか？この操作は元に戻せません。\nAre you sure you want to delete all sticky notes ? This operation cannot be undone.")) {
            let i = 0,
                sKey;
            for (; sKey = window.localStorage.key(i); i++) {
                if (sKey.slice(0, 10) == "StickyNote") {
                    window.localStorage.removeItem(sKey);
                }
            }
            alert("全ての付箋を削除しました。\nAll sticky notes have been deleted.");
        }
    }

    document.getElementById("INIADded-Settings-Form-Submit").onclick = function () {
        saveINIADdedSettings();
    }
}

function saveINIADdedSettings(auto) {

    //Fixed Header
    if (document.getElementById("HeaderFixed").checked) {
        localStorage.setItem("HeaderFixed", "true");
    } else {
        localStorage.removeItem("HeaderFixed");
    }

    //Small Slide
    if (document.getElementById("SlideSmall").checked) {
        localStorage.setItem("SlideSmall", "true");
    } else {
        localStorage.removeItem("SlideSmall");
    }

    //ThemeColor
    localStorage.setItem("ThemeColor", document.getElementById("themecolor").value);

    //Wallpaper
    if (document.getElementById("wallpaper").value != "") {
        const image = document.getElementById("Wallpaper-Thumb").toDataURL('image/jpeg', 0.85);
        localStorage.setItem("Wallpaper", image);
    } else {
        localStorage.removeItem("Wallpaper");
    }

    //User Course
    let userCourses = document.getElementById("user-courses");
    userCourses = userCourses.value;
    if (userCourses != "") {
        try {
            JSON.parse(userCourses);
            localStorage.setItem("UserCourses", userCourses);
        } catch {}
    } else {
        localStorage.removeItem("UserCourses");
    }

    if (!auto) {
        alert("すべての回答を保存しました。\nAll your answers have been saved.");
        location.reload();
    }

}
