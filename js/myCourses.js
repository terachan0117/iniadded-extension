function noticeMyCourses() {
    let UserCourses = localStorage.getItem("UserCourses");
    if (UserCourses) {
        UserCourses = JSON.parse(UserCourses);
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        const day = date.getDay();
        let next_period = "";
        if (hour == 8 && 50 < min || hour == 9 || hour == 10 && min <= 30) {
            next_period = "1";
        } else if (hour == 10 && 30 < min || hour == 11 || hour == 12 && min <= 10) {
            next_period = "2";
        } else if (hour == 12 && 50 < min || hour == 13 || hour == 14 && min <= 30) {
            next_period = "3";
        } else if (hour == 14 && 35 < min || hour == 15 || hour == 16 && min <= 15) {
            next_period = "4";
        } else if (hour == 16 && 20 < min || hour == 17 || hour == 18 && min == 0) {
            next_period = "5";
        } else if (hour == 18 && 5 < min || hour == 19 && min <= 45) {
            next_period = "6";
        }
        const next_flag = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day] + next_period;
        let i = 0;
        while (i < UserCourses.length) {
            if (UserCourses[i]["period"] === next_flag) {
                let name = "(Course name not found)";
                if (UserCourses[i]["name"]) {
                    name = UserCourses[i]["name"];
                }
                let teacher = "(Teacher name not found)";
                if (UserCourses[i]["teacher"]) {
                    teacher = UserCourses[i]["teacher"];
                }
                const time = ["09:00～10:30", "10:40～12:10", "13:00～14:30", "14:45～16:15", "16:30～18:00", "18:15～19:45"][next_period - 1];
                let classroom = "(Classroom not found)";
                if (UserCourses[i]["classroom"]) {
                    classroom = UserCourses[i]["classroom"];
                }
                let url = "#";
                if (UserCourses[i]["url"]) {
                    url = UserCourses[i]["url"];
                }
                const html = '<div class="well my-course bg-primary" style="background-color:#3c8dbc;border-color:#367fa9;margin-top: 30px;"><div class="media">' +
                    '<div class="media-body media-middle"><p><i class="fa fa-angle-double-right"></i> Now</p>' +
                    '<h4 class="media-heading">' + name + '</h4>' +
                    '<i class="fa fa-graduation-cap"></i> ' + teacher +
                    '　<i class="fa fa-clock-o"></i> ' + time +
                    '　<i class="fa fa-map-marker"></i> ' + classroom +
                    '　<i class="fa fa-link"></i> <a href="' + url + '" target="_blank" class="my-course" style="color:#fff;">' + url + '</a>' +
                    '</div></div></div>';
                $(html).appendTo(".content-header");
            }
            i = (i + 1) | 0;
        }
    }
}

function showMyCourses(year) {
    $(".content-header").html('<h1>List of My Courses</h1><ol class="breadcrumb"><li><i class="fa fa-dashboard"></i> ' + year + '</li><li class="active">My Courses</li></ol>');

    let html = '<div class="panel pad-form"><table class="table table-bordered" style="table-layout:fixed;height:10px;">';
    html += '<thead><tr><th style="width:55px;">＃</th><th class="text-center">Mon</th><th class="text-center">Tue</th><th class="text-center">Wed</th><th class="text-center">Thu</th><th class="text-center">Fri</th><th class="text-center">Sat</th></tr></thead>';
    html += '<tbody>';
    const time_list = ["09:00～10:30", "10:40～12:10", "13:00～14:30", "14:45～16:15", "16:30～18:00", "18:15～19:45"];
    const day_list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let n = 0;
    while (n < 6) {
        html += '<tr><th scope="row"><p class="text-primary">' + (n + 1) + '</p>' + time_list[n] + '</th>';
        let i = 0
        while (i < 6) {
            html += '<td><a id="' + day_list[i] + (n + 1) + '" class="list-group-item my-courses" style="height:100%;cursor:pointer;"></a></td>';
            i = (i + 1) | 0;
        }
        html += '</tr>';
        n = (n + 1) | 0;
    }
    html += '</tbody>';
    html += '</table></div>';
    $(".content").html(html);

    let UserCourses = localStorage.getItem("UserCourses");
    if (UserCourses) {
        UserCourses = JSON.parse(UserCourses);
        let i = 0;
        while (i < UserCourses.length) {
            let name = "(Course name not found)";
            if (UserCourses[i]["name"]) {
                name = UserCourses[i]["name"];
            }
            let teacher = "(Teacher name not found)";
            if (UserCourses[i]["teacher"]) {
                teacher = UserCourses[i]["teacher"];
            }
            const period = UserCourses[i]["period"];
            let classroom = "(Classroom not found)";
            if (UserCourses[i]["classroom"]) {
                classroom = UserCourses[i]["classroom"];
            }
            let url = "#";
            if (UserCourses[i]["url"]) {
                url = UserCourses[i]["url"];
            }

            const html = '<h4 class="text-primary course-name">' + name + '</h4>' +
                '<ul style="list-style:none;padding-left:0;">' +
                '<li><i class="fa fa-graduation-cap" style="margin-right:1.5px;"></i>' + teacher + '</li>' +
                '<li><i class="fa fa-map-marker" style="margin-left:5px;margin-right:6px;"></i>' + classroom + '</li>' +
                '</ul>';
            $("#" + period).html(html);
            i = (i + 1) | 0;
        }

    }

    $("a.my-courses").on('click', function () {
        if ($(this).children(".course-name").length == 1) {
            $.getJSON(
                "https://api.tera-chan.com/api/v0.php/terachan:INIADSyllabus?terachan:courseYear=" + year + "&terachan:courseTitle.ja=" + $(this).children(".course-name").text(),
                function (json) {
                    if (json.length === 1) {
                        showModal(json[0]["terachan:courseWeek"] + json[0]["terachan:coursePeriod"], '<iframe src="' + "https://g-sys.toyo.ac.jp/syllabus/html/gakugai/" + year + "/" + year + "_" + json[0]["terachan:syllabusNo"]["ja"] + ".html" + '" style="width:100%;height:100%;border:0;"></iframe>');
                    } else {
                        alert("この科目の詳細なシラバスは提供されていません。\nDetailed syllabuses for this course are not available.");
                    }
                })
        } else {
            const id = $(this).attr("id");
            $.getJSON(
                "https://api.tera-chan.com/api/v0.php/terachan:INIADSyllabus?terachan:courseYear=" + year + "&terachan:courseWeek=" + id.slice(0, 3) + "&terachan:coursePeriod=" + id.slice(-1),
                function (json) {
                    let html = '<p>開講されている科目はありません。<br>There are no courses offered.</p>';
                    if (json.length > 0) {
                        html = '<p>' + json.length + '科目が開講されています。クリックすると詳細なシラバスを確認できます。<br>';
                        html += json.length + ' courses are offered in this period. Click each course to see the detailed syllabus.</p>';
                        html += '<div class="list-group">';
                        let i = 0;
                        while (i < json.length) {
                            let syllabus_url = "javascript:alert(\'この科目の詳細なシラバスは提供されていません。\nDetailed syllabuses for this course are not available.\');";
                            if (json[i]["terachan:syllabusNo"]["en"]) {
                                syllabus_url = "https://g-sys.toyo.ac.jp/syllabus/html/gakugai/" + json[i]["terachan:courseYear"] + "/" + json[i]["terachan:courseYear"] + "_" + json[i]["terachan:syllabusNo"]["en"] + ".html";
                            }
                            if (json[i]["terachan:syllabusNo"]["ja"]) {
                                syllabus_url = "https://g-sys.toyo.ac.jp/syllabus/html/gakugai/" + json[i]["terachan:courseYear"] + "/" + json[i]["terachan:courseYear"] + "_" + json[i]["terachan:syllabusNo"]["ja"] + ".html";
                            }
                            const semester=json[i]["terachan:courseSemester"]
                            const title = json[i]["terachan:courseTitle"]["ja"];
                            let instructor_name = json[i]["terachan:instructorName"];
                            if (instructor_name.length > 1) {
                                instructor_name =instructor_name[0]["ja"]+" 他"
                            } else {
                                instructor_name =instructor_name[0]["ja"];
                            }
                            let study_year = json[i]["terachan:courseStudyYear"];
                            study_year = study_year[0] + "～" + study_year[study_year.length - 1];
                            const language = { "Japanese": "日本語", "English": "English", "Other Languages": "Other Languages", "Foreign Language Course":"言語科目" }[json[i]["terachan:courseLanguage"]];
                            
                            html += '<a class="list-group-item" href="' + syllabus_url + '" target="_blank"><h4 class="text-primary">' + title + '</h4>' +
                                '<ul class="list-inline">' +
                                '<li><i class="fa fa-calendar" style="margin-right:3px;"></i>' + semester + '</li>' +
                                '<i class="fa fa-graduation-cap" style="margin-right:1.5px;"></i>' + instructor_name + '</li>' +
                                '<li><i class="fa fa-user-circle" style="margin-right:3px;"></i>' + study_year + '</li>' +
                                '<li><i class="fa fa-language" style="margin-right:3px;"></i>' + language + '</li>' +
                                '</ul>';

                            i = (i + 1) | 0;
                        }
                        html += '</div>';
                    }
                    showModal(id, html);
                })
        }
    });

}
