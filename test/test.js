
function urlToPromise(url) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

$(document).ready(function () {
  $('#download').click(function () {
    let files = ['https://stickershop.line-scdn.net/stickershop/v1/sticker/26765568/ANDROID/sticker.png'];

    var zip = new JSZip();
    zip.file("1.png", urlToPromise(files[0]), { binary: true });
    zip.generateAsync({ type: "base64" }).then(function (base64) {
      location.href = "data:application/zip;base64," + base64;
    });

  });
});
