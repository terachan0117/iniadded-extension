$(window).on('load', () => {
    const url = window.location.href;
    const coursename = $("section.content-header>ol.breadcrumb>li:eq(1)").text();
    const pagename = $("section.content>h2.clearfix").text().replace(" Bookmark", "");

    $('.problem-container').each((index, element) => {
        const container = $(element);
        const lang = container.data('lang');
        const problem = container.data('problem');
        const urlprefix = container.data('urlprefix');
        $("<hr>").appendTo(container);
        $("<button></button>", {
            addClass: "btn btn-primary",
            html: '<i class="fa fa-calendar-o"></i> ' + {
                "en": "ADD REMINDER",
                "ja": "リマインダーに追加"
            } [lang],
            on: {
                click: () => {
                    const date = '';
                    const title = coursename + ' ' + pagename + ' ' + problem;
                    addReminder(urlprefix, date, title, url, urlprefix, lang);
                }
            }
        }).appendTo(container);
    });
});

function addReminder(id, date, title, url, urlprefix, lang) {
    const reminder = {
        "id": id,
        "date": date,
        "title": title,
        "url": url,
        "urlprefix": urlprefix,
        "lang": lang
    }
    let reminders = localStorage.getItem("INIADded-Reminders");
    if (reminders) {
        reminders = JSON.parse(reminders);
        if (reminders.length > 5) {
            return alert('リマインダーの上限に達しているため追加に失敗しました。\nAdd failed because the reminder limit has been reached.');
        }
        let i = 0;
        while (i < reminders.length) {
            if (reminders[i]["id"] === reminder["id"]) {
                reminders.splice(i, 1);
                break;
            }
            i = (i + 1) | 0;
        }
        reminders.push(reminder);
    } else {
        reminders = [reminder];
    }
    localStorage.setItem("INIADded-Reminders", JSON.stringify(reminders));
    sortReminders();
    alert('リマインダーに追加しました。\nAdded to reminder.');
}

function updateReminderDate(id, date) {
    let reminders = localStorage.getItem("INIADded-Reminders");
    if (reminders) {
        reminders = JSON.parse(reminders);
        let i = 0;
        while (i < reminders.length) {
            if (reminders[i]["id"] === id) {
                reminders[i]["date"] = date;
                break;
            }
            i = (i + 1) | 0;
        }
        localStorage.setItem("INIADded-Reminders", JSON.stringify(reminders));
        sortReminders();
        showReminders();
    }
}

function deleteReminder(id) {
    let reminders = localStorage.getItem("INIADded-Reminders");
    if (reminders) {
        reminders = JSON.parse(reminders);
        let i = 0;
        while (i < reminders.length) {
            if (reminders[i]["id"] === id) {
                reminders.splice(i, 1);
                break;
            }
            i = (i + 1) | 0;
        }
        if (reminders.length > 0) {
            localStorage.setItem("INIADded-Reminders", JSON.stringify(reminders));
            sortReminders();
            showReminders();
        } else {
            localStorage.removeItem("INIADded-Reminders");
            location.reload();
        }
    }
}

function sortReminders() {
    let reminders = localStorage.getItem("INIADded-Reminders");
    if (reminders) {
        reminders = JSON.parse(reminders);
        reminders.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
        localStorage.setItem("INIADded-Reminders", JSON.stringify(reminders));
    }
}

function showReminders() {
    let reminders = localStorage.getItem("INIADded-Reminders");
    if (reminders) {
        if (!$('.problem-reminder-row')[0]) {
            $('<h4>Problem Reminder</h4><div class="row problem-reminder-row"></div>').insertBefore(".breadcrumb");
        }
        reminders = JSON.parse(reminders);
        let reminder_wells = '';
        let i = 0;
        while (i < reminders.length) {
            reminder_wells += '<div class="col-lg-4 col-sm-6 col-xs-12"><div class="well problem-reminder-well" data-id="' + reminders[i]["id"] + '"><div class="media">' +
                '<div class="media-left media-middle">' +
                '<div id="problem_reminder_status_' + i + '"></div>' +
                '<label>' + {
                    "ja": "締め切り:",
                    "en": "Deadline:"
                } [reminders[i]["lang"]] + '<input class="problem-reminder-date" type="date" pattern="\d{4}-\d{2}-\d{2}" value="' + reminders[i]["date"] + '"></label>' +
                '</div>' +
                '<div class="media-body media-middle reminder-body"><h4 class="media-heading">' + reminders[i]["title"] + '</h4>' +
                '<a class="btn btn-success" href="' + reminders[i]["url"] + '"><i class="fa fa-pencil"></i> Open Problems</a>' +
                '<a class="btn btn-default problem-reminder-delete"><i class="fa fa-trash"></i> Delete Reminder</a>' +
                '</div></div></div></div>';
            i = (i + 1) | 0;
        }
        $('.problem-reminder-row').html(reminder_wells);

        i = 0;
        while (i < reminders.length) {
            setReminderStatus(i, reminders[i]["urlprefix"], reminders[i]["lang"]);
            i = (i + 1) | 0;
        }

        $('.problem-reminder-well').each((index, element) => {
            const id = $(element).data('id');
            $(element).find('.problem-reminder-date').on('change', (event) => {
                const date = $(event.currentTarget).val();
                updateReminderDate(id, date);
            })
            $(element).find('.problem-reminder-delete').on('click', (event) => {
                deleteReminder(id);
            })
        })
    }
}

function setReminderStatus(index, urlprefix, lang) {
    $.ajax({
        url: urlprefix + '/status',
        type: 'GET',
        dataType: "json",
        cache: false,
    }).done(function (data, textStatus, jqXHR) {
        let html = '';
        switch (data.status) {
            case 'open':
                html = '<div class="problem-reminder-status" style="background:#00a65a;"><span><i class="fa fa-circle-o"></i> ' + {
                    "ja": "回答受付中",
                    "en": "Open"
                } [lang]
                '</span></div>';
                break;
            case 'closed':
                html = '<div class="problem-reminder-status" style="background:#f39c12;"><span><i class="fa fa-times"></i> ' + {
                    "ja": "回答受付終了",
                    "en": "Closed"
                } [lang]
                '</span></div>';
                break;
            case 'hidden':
                html = '<div class="problem-reminder-status" style="background:#dd4b39;"><span><i class="fa fa-ban"></i> ' + {
                    "ja": "問題非公開",
                    "en": "Hidden"
                } [lang]
                '</span></div>';
                break;
            case 'graded':
                html = '<div class="problem-reminder-status" style="background:#00c0ef;"><span><i class="fa fa-check"></i> ' + {
                    "ja": "成績評価済み",
                    "en": "Graded"
                } [lang]
                '</span></div>';
                break;
            default:
                html = '<div class="problem-reminder-status"><span><i class="fa fa-exclamation"></i> ' + {
                    "ja": "取得失敗",
                    "en": "Failed"
                } [lang]
                '</span></div>';
                break;
        }
        $('#problem_reminder_status_' + index).html(html);
    }).fail(function (jqXHR, textStatus, error) {
        console.log('error', textStatus, error);
    });
}
