// ==UserScript==
// @name         bilibili_subscribe
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.2.4
// @description  Highlight subscribe.
// @author       centixkadon
// @match        https://space.bilibili.com/*/bangumi
// @match        https://space.bilibili.com/*/cinema
// @grant        none
// ==/UserScript==

(function () {
  if (document.cookie.match(/(^| )DedeUserID=([^;]*)(;|$)/)[2] === location.pathname.split("/")[1]) {
    $('head').append($('<style>').html(".pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-1 { color: #FB7299; } .pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-2 { color: #00A1D6; } .pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-3 { }"));

    setTimeout(function () {
      let $follow = $('.pgc-space-follow-page');
      if ($follow.length !== 1 || !$follow[0].__vue__) {
        setTimeout(arguments.callee, 33);
        return;
      }

      $(document).ajaxSuccess(function (event, deferred, settings) {
        if (settings.url.indexOf("https://api.bilibili.com/x/space/bangumi/follow/list") === 0) {
          deferred.done(function (data) {
            setTimeout(function () {
              let $follow = $('.pgc-follow-list');
              if ($follow.length === 0) {
                setTimeout(arguments.callee, 33);
                return;
              }

              let $items = $follow.children('.pgc-space-follow-item');
              if ($items.length !== data.data.list.length) {
                setTimeout(arguments.callee, 33);
                return;
              }

              $items.each(function (index) {
                let $state = $(this).find('.watch-state');

                let item = data.data.list[index];
                let nowEp = item.progress.split(" ")[0];
                let newEp = item.new_ep.title;
                if (!isNaN(parseInt(newEp))) newEp = "第" + newEp + "话";

                console.log({ i: index, item: item, now: nowEp, new: newEp });
                if (nowEp === "" && newEp !== undefined && !item.is_new) {
                  $state.addClass("watch-state-2");
                } else if (item.is_new || nowEp !== "已看完" + newEp) {
                  $state.addClass("watch-state-1");
                } else {
                  $state.addClass("watch-state-3");
                }
              });

              $follow.append($items.has('.watch-state-1'));
              $follow.append($items.has('.watch-state-2'));
              $follow.append($items.has('.watch-state-3'));
            }, 33);
          });
        }
      });

      $follow.each(function () {
        this.__vue__.pageSize = 50;
        this.__vue__.pageChanged();
      });
    }, 33);

  }
})();
