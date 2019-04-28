// ==UserScript==
// @name         bilibili_subscribe
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.2.1
// @description  Highlight subscribe.
// @author       centixkadon
// @match        https://space.bilibili.com/*/bangumi
// @match        https://space.bilibili.com/*/cinema
// @grant        none
// ==/UserScript==

(function () {
  if (document.cookie.match(/(^| )DedeUserID=([^;]*)(;|$)/)[2] === location.pathname.split("/")[1]) {
    $(document).ajaxSuccess(function (event, deferred, settings) {
      if (settings.url.indexOf("https://api.bilibili.com/x/space/bangumi/follow/list") === 0) {
        deferred.done(function (data) {
          setTimeout(function () {
            let $follow = $('.pgc-follow-list');
            if ($follow.length === 0) {
              setTimeout(arguments.callee);
            } else {
              let $followChildren = $follow.children('.pgc-space-follow-item');
              $followChildren.each(function (index) {
                let item = data.data.list[index];
                let newEp = item.new_ep.title;
                if (!isNaN(parseInt(newEp))) newEp = "第" + newEp + "话";
                let nowEp = item.progress.split(" ")[0];

                console.log(index, newEp, nowEp);
                switch (nowEp) {
                  case "看完" + newEp: // finish
                    break;
                  case "": // not start
                    if (newEp !== undefined) $(this).find('.pgc-item-state').css("color", "#1AB");
                    break;
                  default: // watching
                    $(this).find('.pgc-item-state').css("color", "#D34");
                    break;
                }
              });
              $follow.append($followChildren.sort((a, b) => {
                function c(a) {
                  return $(a).find('.pgc-item-state').css("color");
                }
                return c(a) < c(b);
              }));
            }
          }, 33);
        });
      }
    });

    setTimeout(function () {
      let $follow = $('.pgc-space-follow-page');
      if ($follow.length === 0) {
        setTimeout(arguments.callee);
      } else {
        $follow.each(function () {
          this.__vue__._data.pageSize = 50;
          this.__vue__.pageChanged();
        });
      }
    }, 33);
  }
})();
