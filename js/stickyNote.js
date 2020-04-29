//付箋用要素確保＆付箋表示
let div = document.createElement('div');
div.id = 'Sticky-Note-Area';
document.getElementsByClassName('wrapper')[0].appendChild(div);
setStickyNote();

function showStickyNotes() {
    const contentHeaderContents = '<h1>Sticky Notes</h1><ol class="breadcrumb"><li class="active"><i class="fa fa-dashboard"></i> Sticky Notes</li></ol>';
    const contentHeader = document.getElementsByClassName('content-header');
    contentHeader[0].innerHTML = contentHeaderContents;

    //コンテンツ宣言
    let contents = '<div class="list-group">';
    //登録されているメモをすべて取り出す
    let keyList = [];
    let valueList = [];
    let i = 0,
        sKey;
    for (; sKey = window.localStorage.key(i); i++) {
        if (sKey.slice(0, 10) == "StickyNote") {
            keyList.push(sKey);
            valueList.push(window.localStorage.getItem(sKey));
        }
    }

    i = 0;
    while (i < keyList.length) {
        //const keyArray = (keyList[i].slice(10, 33) + '/api' + keyList[i].slice(33)).split('/');
        let s = 0;
        while (s < JSON.parse(valueList[i]).length) {
            contents += '<a class="list-group-item" href="' + keyList[i].slice(10) + '"><h4><i class="fa fa-sticky-note" style="color:' + JSON.parse(valueList[i])[s]['color'] + ';background:#ddd;"></i> <span class="text-primary">' + htmlEscape(JSON.parse(valueList[i])[s]['title']) + '</span></h4><p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + htmlEscape(JSON.parse(valueList[i])[s]['text']) + '</p></a>';
            s = (s + 1) | 0;
        }
        i = (i + 1) | 0;
    }
    if (contents == '<div class="list-group">') {
        contents += '<a class="list-group-item">登録されている付箋はありません。<br>There are no sticky notes registered.</a>';
    }
    contents += '</div>';

    document.getElementsByClassName("container-fluid")[0].innerHTML = contents;

}

function getStickyNote(top, left, text, color, title, width, height) {
    return '<div class="note" style="background-color:' + color + ';padding-top:5px;padding-left:20px;top:' + top + 'px;left:' + left + 'px;position:absolute;opacity:0.9;border-radius:5px;z-index:5;">' +
        '<div class="text-muted">' +
        '<span class="dropdown"><span class="dropdown-toggle" id="colorMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="cursor:pointer;"><i class="fa fa-tint"></i> <span class="caret"></span></span><ul class="dropdown-menu" aria-labelledby="colorMenu"><li class="color" data-color="#FF6663" style="background-color:#FF6663;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#FEB144" style="background-color:#FEB144;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#FDFD97" style="background-color:#FDFD97;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#9EE09E" style="background-color:#9EE09E;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#9EC1CF" style="background-color:#9EC1CF;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#CC99C9" style="background-color:#CC99C9;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li><li class="color" data-color="#FEFEFE" style="background-color:#FEFEFE;border:thin solid gray;height:18px;width:18px;border-radius:50%;margin:2px;display:inline-block;cursor:pointer;"></li></ul></span>' +
        '<i class="fa fa-trash" style="cursor:pointer;float:right;"></i>' +
        '<i class="fa fa-copy" style="cursor:pointer;float:right;margin-right:5px;"></i>' +
        '</div>' +
        '<input type="text" value="' + title + '" style="display:block;width:100%;opacity: 0.8;"></input>' +
        '<textarea class="stickynote-textarea" rows=5 name="StickyNote(' + title + ')" style="display:block;width:100%;opacity: 0.8;width:' + width + 'px;height:' + height + 'px;">' + text + '</textarea>' +
        '</div>';
}

function addStickyNote(id, top, left, text, color, title, width, height) {

    let StickyNote = {
        "id": 0,
        "top": 50,
        "left": 380,
        "title": "Title",
        "text": "",
        "color": "#FEFEFE",
        "width": "178.4px",
        "height": "106px"
    };

    if (id) {
        StickyNote.id = id;
        StickyNote.top = top;
        StickyNote.left = left;
        StickyNote.text = text;
        StickyNote.color = color;
        StickyNote.width = width;
        StickyNote.height = height;
        if (title) {
            StickyNote.title = title;

        } else {
            StickyNote.title = document.querySelector("ol.breadcrumb").textContent;
        }
    } else {
        StickyNote.id = String(new Date().toISOString());
        StickyNote.title = document.querySelector("ol.breadcrumb").textContent;
    }

    let $note = $(getStickyNote(StickyNote.top, StickyNote.left, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height));

    $note.draggable();

    $note.children("div").children(".fa-trash").on('click', function () {
        removeStickyNote(StickyNote.id);
        $(this).parents('.note').remove();
    });
    $note.children("div").children(".fa-copy").on('click', function () {
        addStickyNote(String(new Date().toISOString()), StickyNote.top + 10, StickyNote.left + 10, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height);
    });
    $note.children("div").children(".dropdown").children(".dropdown-menu").children(".color").on('click', function () {
        const selectcolor = $(this).data('color');
        $(this).parents('.note').css('background-color', selectcolor);
        StickyNote.color = selectcolor;
        saveStickyNote(StickyNote.id, StickyNote.top, StickyNote.left, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height);
    });
    $note.children("input").on('keyup', function () {
        StickyNote.title = $(this).val();
        saveStickyNote(StickyNote.id, StickyNote.top, StickyNote.left, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height);
    });
    $note.children("textarea").on('keyup mouseup', function () {
        StickyNote.text = $(this).val();
        StickyNote.width = $(this).width();
        StickyNote.height = $(this).height();
        saveStickyNote(StickyNote.id, StickyNote.top, StickyNote.left, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height);
    });
    $note.on('mouseup', function () {
        StickyNote.top = $(this).offset().top;
        StickyNote.left = $(this).offset().left;
        saveStickyNote(StickyNote.id, StickyNote.top, StickyNote.left, StickyNote.text, StickyNote.color, StickyNote.title, StickyNote.width, StickyNote.height);
    });

    $('#Sticky-Note-Area').append($note);
}

function saveStickyNote(id, top, left, text, color, title, width, height) {
    let StickyNote = {
        "id": 0,
        "top": 50,
        "left": 50,
        "title": "Title",
        "text": "",
        "color": "#FEFEFE",
        "width": "178.4px",
        "height": "106px"
    };
    StickyNote.id = id;
    StickyNote.top = top;
    StickyNote.left = left;
    StickyNote.title = title;
    StickyNote.text = text;
    StickyNote.color = color;
    StickyNote.width = width;
    StickyNote.height = height;

    let localStorageData = localStorage.getItem('StickyNote' + location);
    if (localStorageData) {
        localStorageData = JSON.parse(localStorageData);
        let i = 0;
        while (i < localStorageData.length) {
            if (localStorageData[i]["id"] == id) {
                //既にあるふせん
                localStorageData[i]["top"] = StickyNote.top;
                localStorageData[i]["left"] = StickyNote.left;
                localStorageData[i]["title"] = StickyNote.title;
                localStorageData[i]["text"] = StickyNote.text;
                localStorageData[i]["color"] = StickyNote.color;
                localStorageData[i]["width"] = StickyNote.width;
                localStorageData[i]["height"] = StickyNote.height;
                localStorage.setItem('StickyNote' + location, JSON.stringify(localStorageData));
                break;
            }
            if (i == localStorageData.length - 1) {
                //新しいふせん
                localStorage.setItem('StickyNote' + location, JSON.stringify(localStorageData.push(StickyNote)));

            }
            i = (i + 1) | 0;
        }
    } else {
        localStorage.setItem('StickyNote' + location, '[' + JSON.stringify(StickyNote) + ']');
    }
}

function removeStickyNote(id) {
    let localStorageData = localStorage.getItem('StickyNote' + location);
    if (localStorageData) {
        localStorageData = JSON.parse(localStorageData);
        let i = 0;
        while (i < localStorageData.length) {
            if (localStorageData[i]["id"] == id) {
                //既にあるふせん
                localStorageData.splice(i, 1);
                localStorage.setItem('StickyNote' + location, JSON.stringify(localStorageData));
                if (localStorageData.length == 0) {
                    localStorage.removeItem('StickyNote' + location);
                }
                break;
            }
            i = (i + 1) | 0;
        }
    }
}

function setStickyNote() {
    let localStorageData = localStorage.getItem('StickyNote' + location);
    if (localStorageData) {
        localStorageData = JSON.parse(localStorageData);
        let i = 0;
        while (i < localStorageData.length) {
            addStickyNote(localStorageData[i]["id"], localStorageData[i]["top"], localStorageData[i]["left"], localStorageData[i]["text"], localStorageData[i]["color"], localStorageData[i]["title"], localStorageData[i]["width"], localStorageData[i]["height"]);
            i = (i + 1) | 0;
        }
    }
}
