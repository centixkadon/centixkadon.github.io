// ==UserScript==
// @name         bilibili_subscribe
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.3.1
// @description  Highlight subscribe.
// @author       centixkadon
// @match        https://space.bilibili.com/*/bangumi
// @match        https://space.bilibili.com/*/cinema
// @grant        GM_addStyle
// ==/UserScript==

(function (pageSize) {
  if (document.cookie.match(/(^| )DedeUserID=([^;]*)(;|$)/)[2] === location.pathname.split("/")[1]) {
    GM_addStyle(".pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-1 { color: #FB7299; } .pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-2 { color: #00A1D6; } .pgc-space-follow-item .pgc-item-info .pgc-item-state .watch-state.watch-state-3 { }");

    setTimeout(function () {
      let $follow = $('.pgc-space-follow-page');
      if ($follow.length !== 1 || !$follow[0].__vue__) {
        setTimeout(arguments.callee, 33);
        return;
      }

      $(document).ajaxSuccess(function (_, deferred, settings) {
        if (settings.url.indexOf("https://api.bilibili.com/x/space/bangumi/follow/list") === 0) {
          deferred.done(function (data) {
            if (data.data.list.length !== pageSize) return;

            setTimeout(function () {
              let $follow = $('.pgc-follow-list');
              let $items = $('.pgc-space-follow-item');
              if ($follow.length === 0 || $items.length !== pageSize) {
                setTimeout(arguments.callee, 33);
                return;
              }

              $items.each(function (index) {
                let $state = $(this).find('.watch-state');

                let item = data.data.list[index];
                let nowEp = item.progress.split(" ")[0];
                let newEp = item.new_ep.title;
                if (!isNaN(parseInt(newEp))) newEp = "第" + newEp + "话";

                console.log({ i: index, item: item, title: item.title, now: nowEp, new: newEp });
                if (nowEp === "" && newEp !== undefined) {
                  $state.addClass("watch-state-2");
                } else if (nowEp !== "已看完" + newEp && newEp !== undefined) {
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
        this.__vue__.pageSize = pageSize;
        this.__vue__.pageChanged();
      });
    }, 33);

  }
})(50);
