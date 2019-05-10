// ==UserScript==
// @name         exhentai_gallery
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      1.0
// @description  View all images from a gallery on one page.
// @author       centixkadon
// @match        https://exhentai.org/g/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function () {
  const exhentai_gallery_global = {
    configs: {
      loading_thread_count: 1,
      loading_timeout_ms: 10000,
      loading_check_interval_ms: 1000,
    }
  };

  (function (g) {
    let configs = g.configs;

    let comments = $('[name=comments]')[0];
    let hrefs = $('#gdt').find('a');
    let hrefsTimeout = [500 + Math.random() * 200];
    for (let i = 1; i < hrefs.length; ++i) {
      hrefsTimeout.push(hrefsTimeout[hrefsTimeout.length - 1] + 500 + Math.random() * 200);
    }
    $('.ptb').find('tr').append($('<td>All</td>').click(function () {
      $('iframe').remove();

      let herfsLoadingIndex = 0;
      let herfsLoadingThreadCount = configs.loading_thread_count;

      let herfsLoadingIndexTmp = 0;
      let herfsLoadingThreadCountInterval = setInterval(function () {
        if (herfsLoadingIndex === herfsLoadingIndexTmp) {
          herfsLoadingThreadCount++;
          console.log('loading timeout: increase loading thread to ' + herfsLoadingThreadCount);
          if (herfsLoadingThreadCount >= hrefs.length) clearInterval(herfsLoadingThreadCountInterval);
        } else {
          herfsLoadingIndexTmp = herfsLoadingIndex;
        }
      }, configs.loading_timeout_ms);

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
        }, configs.loading_check_interval_ms);
      });
    }));

  })(exhentai_gallery_global);
})();