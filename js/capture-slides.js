function getSvgData() {
    return btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString($(".punch-viewer-svgpage-svgcontainer:last>svg").get(0)))));
}

function getSvgName() {
    return $(".punch-viewer-svgpage-a11yelement:last").attr("aria-label").replace(/\//g, "-").replace(/[\\:*?\"<>|^\s]/g, "") + ".svg";
}

function captureThisSlide() {
    const data = "data:image/svg+xml;charset=utf-8;base64," + getSvgData();
    const name = getSvgName();
    saveAs(data, name);
    alert("このスライドをキャプチャーしました。\nThis slide has been captured.");
}

function captureAllSlides() {
    const zip = new JSZip();
    while (true) {
        const data = getSvgData();
        const name = getSvgName();
        zip.file(name, data, {
            base64: true
        });
        if ($(".punch-viewer-nav-fixed>.goog-flat-button:eq(3)").attr("aria-disabled") === "true") {
            break;
        }
        const KEvent = new KeyboardEvent("keydown", {
            keyCode: 39
        });
        document.dispatchEvent(KEvent);
    }
    const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Slide Viewer | INIADded</title><style>label {color: white;background-color: rgb(95, 184, 228);border-radius: 3px;}input {display: none;}object {width: 100%;}@media (min-width: 576px) {object {width: 50%;}}@media (min-width: 992px) {object {width: 33.33333333%;}}@media (min-width: 1200px) {object {width: 25%;}}</style></head><body><h2>INIADded Slide Viewer</h2><label for="file-input">Select folder<input id="file-input" type="file" webkitdirectory></label><div id="slides"><ol><li>「Select folder」ボタンをクリックして、<strong>このHTMLファイル</strong>と<strong>スライドのSVGファイル</strong>が保存されているフォルダーを選択して下さい。</li><li>「ファイルをアップロードしますか？」と表示されたら「アップロード」ボタンをクリックしてください。</li><li>［Ctrl］＋［P］キーを押して［送信先］を「PDFに保存」にすると、PDFで保存できます。</li></ol><ol><li>Click the "Select folder" button and select the folder where <strong>this HTML file</strong> and<strong>the SVG file of the slide</strong> are stored.</li><li>When the message "Are you sure you want to upload the file?" is displayed, click the "Upload" button.</li><li>You can save as a PDF by pressing the [Ctrl] + [P] keys and setting [Send to] to "Save to PDF".</li></ol></div><script>let orderList;document.getElementById("file-input").addEventListener("change", ev => {const files = ev.target.files;document.getElementById("slides").innerHTML = "";orderList = [];if (files.length < 1) {alert("File not found.");} else {let i = 0;while (i < files.length) {if (files[i].webkitRelativePath.match(/.svg/)) {orderList.push(files[i].lastModified);}i = (i + 1) | 0;}orderList.sort();i = 0;while (i < files.length) {let f = 0;while (f < files.length) {if (files[f].lastModified == orderList[i]) {if (files[f].webkitRelativePath.match(/.svg/)) {let object = document.createElement("object");object.type = "image/svg+xml";object.data = "../" + files[f].webkitRelativePath;document.getElementById("slides").appendChild(object);}}f = (f + 1) | 0;}i = (i + 1) | 0;}}});</script></body></html>';
    zip.file("slide-viewer.html", html);
    const text = '# INIADded Slide Viewer\n' +
        '\n' +
        '# Usage\n' +
        '1.「slide-viewer.html」ファイルをChromeで開きます。\n2.「Select folder」ボタンをクリックして、1.のHTMLファイルとスライドのSVGファイルが保存されているフォルダーを選択します。\n3.「ファイルをアップロードしますか？」と表示されたら「アップロード」ボタンをクリックします。\n4.［Ctrl］＋［P］キーを押して送信先を「PDFに保存」にすると、PDFで保存できます。\n' +
        '\n' +
        '1. Open the "slide-viewer.html" file in Chrome. \n2. Click the “Select folder” button and select the folder where the HTML file of 1. and the SVG file of the slide are stored. \n3. When the message "Are you sure you want to upload the file?" is displayed, click the "Upload" button. \n4. Press the [Ctrl] + [P] keys and select "Save to PDF" for the destination to save as a PDF. \n' +
        '\n' +
        '# License\n' +
        'This software is released under the MIT License.';
    zip.file("README.md", text);
    zip.generateAsync({
            type: 'blob'
        })
        .then(function (content) {
            saveAs(content, $("title").text() + '.zip');
            alert("すべてのスライドをキャプチャーしました。\nAll slides have been captured.");
        });
}

function copySlideText() {
    let text = '';
    $("g").each(function () {
        if ($(this).attr("aria-label")) {
            text += $(this).attr("aria-label");
        }
    });
    copyTextToClipboard(text);
    alert("このスライドのテキストをクリップボードにコピーしました。\nCopied the text on this slide to the clipboard.");
}
