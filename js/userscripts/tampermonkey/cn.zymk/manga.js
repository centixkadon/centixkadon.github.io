// ==UserScript==
// @name         zymk_manga
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.1
// @description  Remove payment, add auto fullscreen and keyboard shortcuts.
// @author       centixkadon
// @match        https://www.zymk.cn/*/*.html
// @grant        none
// ==/UserScript==

(function () {
  if ($(".catalog").length === 1) {
    $(window).off("scroll");

    $(".container").click();

    $("body").keydown(function (e) {
      switch (e.key) {
        case "ArrowLeft":
          location.href = $(".mh_prevbook").attr("href");
          break;
        case "ArrowRight":
          location.href = $(".mh_nextbook").attr("href");
          break;
        case " ":
          $(".container").click();
          return false;
      }
    });
  }
})();
