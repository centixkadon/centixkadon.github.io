// ==UserScript==
// @name         zymk_manga
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      1.0
// @description  Remove payment, add auto fullscreen and keyboard shortcuts.
// @author       centixkadon
// @match        https://www.zymk.cn/*/*.html
// @grant        none
// ==/UserScript==

(function () {
  if ($('.catalog').length === 1) {
    $(window).off("scroll");

    $('.container').click();

    $('.catalog').html($('.catalog').html() + "(bs)");
    $('.mh_prevbook').html($('.mh_prevbook').html() + "(z)");
    $('.mh_nextbook').html($('.mh_nextbook').html() + "(x)");
    $('body').keydown(function (e) {
      switch (e.key) {
        case "Backspace":
          location.href = $('.catalog').attr("href");
          break;
        case "ArrowLeft":
        case "z":
          location.href = $('.mh_prevbook').attr("href");
          break;
        case "ArrowRight":
        case "x":
          location.href = $('.mh_nextbook').attr("href");
          break;
        case " ":
          $('.container').click();
          return false;
        default:
          console.log(e);
      }
    });
    (function () {
      let layers = $('#layui-layer1');
      if ($(window).scrollTop() === 0) return;
      if (layers.length !== 0) {
        $(window).scrollTop(0);
        layers.find('.login-info .tac .pay-btn').html("刷新页面(F5)").attr("onclick", "javascript:;").click(function () { window.location.reload(); });
        layers.find('.login-info .tac .pay-ft').html("刷新后解除付费限制");
        return;
      }
      console.log("remove");
      setTimeout(arguments.callee, 16);
    })();
  }
})();
