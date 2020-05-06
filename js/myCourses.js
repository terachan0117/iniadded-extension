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
                const html = '<div class="well my-course bg-primary" style="background-color:#3c8dbc;margin-top: 30px;"><div class="media">' +
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

    let html = '<div class="row flex">' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Mon</div></div>' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Tue</div></div>' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Wed</div></div>' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Thu</div></div>' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Fri</div></div>' +
        '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well">Sat</div></div>';

    const day_list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let n = 0;
    while (n < 6) {
        let i = 0
        while (i < 6) {
            html += '<div class="col-lg-2 col-sm-2 col-xs-2"><div class="well" style="height:100%;margin-bottom:0px;padding:15px;" id="' + day_list[i] + (n + 1) + '"></div></div>';
            i = (i + 1) | 0;
        }
        n = (n + 1) | 0;
    }

    html += '</div>';
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
            const time = ["09:00～10:30", "10:40～12:10", "13:00～14:30", "14:45～16:15", "16:30～18:00", "18:15～19:45"][Number(period.slice(-1)) - 1];
            let classroom = "(Classroom not found)";
            if (UserCourses[i]["classroom"]) {
                classroom = UserCourses[i]["classroom"];
            }
            let url = "#";
            if (UserCourses[i]["url"]) {
                url = UserCourses[i]["url"];
            }
            const html = '<div class="media"><div class="media-body media-middle">' +
                '<h4 class="media-heading">' + name + '</h4>' +
                '<div><i class="fa fa-graduation-cap"></i>' + teacher + '</div>' +
                '<div><i class="fa fa-clock-o"></i>' + time + ' ' +
                '<i class="fa fa-map-marker"></i>' + classroom + '</div>' +
                '<div><i class="fa fa-link"></i> <a href="' + url + '" target="_blank">' + url + '</a></div>' +
                '</div></div>';
            $("#" + period).html(html);
            i = (i + 1) | 0;
        }
    }
}
