function checkNewLectures(year) {
    // セッションストレージ初期化
    sessionStorage.setItem('LectureUpdateHistory' + year, '[]');

    // その年のコースリストを取得
    $.getJSON("https://moocs.iniad.org/api/courses/" + year, function (courseList) {
        let i = 0;
        while (i < courseList.length) {

            // コース毎のコンテンツを取得
            const id = courseList[i]["id"];
            $.getJSON("https://moocs.iniad.org/api/courses/" + year + "/" + id, function (CourseContents) {

                // 以前の保存データから変更があるかを確認
                if (localStorage.getItem("CourseContents" + year + id) != JSON.stringify(CourseContents)) {
                    // 変更があったコースのリスト
                    let LectureUpdateHistory = JSON.parse(sessionStorage.getItem('LectureUpdateHistory' + year));

                    // 変更があったコースのうち講義がないコースを除外
                    if (CourseContents["topics"].length > 0) {

                        // 変更数表示用のリストに追加
                        LectureUpdateHistory.push(year + id);

                        // セッションストレージに今回変更があった講義の開講年＋IDを一時保存
                        sessionStorage.setItem('LectureUpdateHistory' + year, JSON.stringify(LectureUpdateHistory));
                    }

                    // 以前の保存データを今回のデータに上書き更新
                    localStorage.setItem("CourseContents" + year + id, JSON.stringify(CourseContents));

                    // 変更数を表示
                    if (LectureUpdateHistory.length > 0) {
                        $("#new-lectures-badge").text(LectureUpdateHistory.length);
                    }
                }
            })
            i = (i + 1) | 0;
        }

    })
}

function showNewLectures(year) {
    const LectureUpdateHistory = JSON.parse(sessionStorage.getItem('LectureUpdateHistory' + year));
    let html = '<div class="list-group">';
    if (LectureUpdateHistory.length === 0) {
        html += '<a class="list-group-item">以前のアクセス後に追加された講義はありません。<br>There are no lectures added after the previous access.</a>';
    } else {
        let i = 0;
        while (i < LectureUpdateHistory.length) {
            const CourseContents = JSON.parse(localStorage.getItem("CourseContents" + LectureUpdateHistory[i]));
            const url = CourseContents["year"] + "/" + CourseContents["id"] + "/" + CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"][CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"].length - 1]["id"];
            const name_en = CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"][CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"].length - 1]["name_en"];
            const name_ja = CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"][CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"].length - 1]["name_ja"];
            html += '<a class="list-group-item" href="https://moocs.iniad.org/courses/' + url + '"><h4><i class="fa fa-book"></i> <span class="text-primary">' + name_en + ' ' + name_ja '</span></h4><ul class="list-inline"><li>' + year + ' <i class="fa fa-angle-right"></i> </li><li>' + CourseContents["name_en"] + ' ' + CourseContents["name_ja"] + ' <i class="fa fa-angle-right"></i> </li><li>' + CourseContents["topics"][CourseContents["topics"].length - 1]["name_en"] + ' ' + CourseContents["topics"][CourseContents["topics"].length - 1]["name_ja"] + ' <i class="fa fa-angle-right"></i> </li><li>' + CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"][CourseContents["topics"][CourseContents["topics"].length - 1]["lectures"].length - 1]["name_en"] + ' ' + +'</li></ul></a>';
            i = (i + 1) | 0;
        }
    }
    html += '</div>';
    $(".content-header").html('<h1>List of New Lectures</h1><ol class="breadcrumb"><li><i class="fa fa-dashboard"></i> ' + year + '</li><li class="active">New Lectures</li></ol>');
    $(".content").html(html);
}
