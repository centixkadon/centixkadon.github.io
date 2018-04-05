
function line_store_download(g) {
  let image_urls = g.image_urls;
  let image_package = window.location.href.split('/')[5];

  $('.mdCMN08Price').html('Download');

  setInterval(function () {
    let e = $._data($('.mdCMN08Price')[0], 'events');
    $('.mdCMN08Price').off('click').click(function () {
      var zip = new JSZip();
      for (let i = 0; i < image_urls.length; ++i) {
        zip.file(image_package + '_' + ('00' + (i + 1)).slice(-2) + '.png',
          new Promise(function (resolve, reject) {
            JSZipUtils.getBinaryContent(image_urls[i], function (err, data) {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          }), { binary: true });
      }
      zip.generateAsync({ type: 'base64' }).then(function (base64) {
        location.href = 'data:application/zip;base64,' + base64;
      });
    });
  }, 1000);
}
