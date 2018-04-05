
function all_multipage() {

  // let tstCnt = 0;
  $(document).ready(function () {
    let comments = $('[name=comments]')[0];
    let hrefs = $('#gdt').find('a');
    let hrefsTimeout = [500 + Math.random() * 200];
    for (let i = 1; i < hrefs.length; ++i) {
      hrefsTimeout.push(hrefsTimeout[hrefsTimeout.length - 1] + 500 + Math.random() * 200);
    }
    $('.ptb').find('tr').append($('<td>All</td>').click(function () {
      $('iframe').remove();

      let herfsLoadingIndex = 0;
      let herfsLoadingThreadCount = configsInThisUserScript.loading_thread_count;

      let herfsLoadingIndexTmp = 0;
      let herfsLoadingThreadCountInterval = setInterval(function () {
        if (herfsLoadingIndex === herfsLoadingIndexTmp) {
          herfsLoadingThreadCount++;
          console.log('loading timeout: increase loading thread to ' + herfsLoadingThreadCount);
          if (herfsLoadingThreadCount >= hrefs.length) clearInterval(herfsLoadingThreadCountInterval);
        } else {
          herfsLoadingIndexTmp = herfsLoadingIndex;
        }
      }, configsInThisUserScript.loading_timeout_ms);
      hrefs.each(function (index) {
        // if (index >= 3) return;
        let imgHref = $(this).attr('href');

        // let ifm = $('<iframe src="'+ imgHref + '" style="display: block; width: 100%;" scrolling="no" frameborder="0"></iframe>');
        let ifm = $('<iframe style="display: block; width: 100%;" scrolling="no" frameborder="0"></iframe>');
        ifm.insertBefore(comments);
        let ifmReadyCount = 0;
        ifm[0].onload = (function () {
          let ifm = $(this);
          let ifmDoc = ifm.contents();
          let ifmWin = $(ifm[0].contentWindow);
          ifmWin.resize(function () {
            ifm.css('height', (Math.max(ifmDoc.find('body').height(), 300) + 10) + 'px');
          });
          ifmDoc.ready(function () {
            if (ifmReadyCount !== null) {
              if (ifmReadyCount < 1) ifmReadyCount++;
              else {
                herfsLoadingIndex += 1;
                ifmReadyCount = null;
                // if (herfsLoadingIndex === hrefs.length) alert('load finish.');
              }
            }
          });
          ifmDoc.find('#i1').children('[id!=i2][id!=i3]').remove();
          ifmDoc.find('.ip').remove();
          let ifmPageInfo = ifmDoc.find('#i2').children('.sn');
          ifmPageInfo.remove();
          ifmDoc.find('#i2').html('<div class="c3">' + ifmPageInfo.children('div').text() + ' (' + ifmDoc.find('#i2').text() + ')</div>').append($('<div class="c4">Reload</div>').click(function () {
            ifm.css('height', '');
            ifm.attr('src', ifm.attr('src'));
          }));
          ifmWin.resize();

        });

        let waitLoadedInterval = setInterval(function () {
          if (index < herfsLoadingIndex + herfsLoadingThreadCount) {
            ifm.attr('src', imgHref);
            clearInterval(waitLoadedInterval);
          }
        }, configsInThisUserScript.loading_check_interval_ms);
      });
    }));
  });

}
