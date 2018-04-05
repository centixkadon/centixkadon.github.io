// ==UserScript==
// @name         line_store
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.1
// @description  View all images from a gallery on one page.
// @author       centixkadon
// @match        https://store.line.me/stickershop/product/*
// @require      https://raw.githubusercontent.com/centixkadon/centixkadon.github.io/master/js/userscripts/tampermonkey/me.line/store/utilities.js
// @require      https://raw.githubusercontent.com/centixkadon/centixkadon.github.io/master/js/userscripts/tampermonkey/me.line/store/nobackground.js
// @grant        none
// ==/UserScript==

(function () {
  var line_store_global = {};

  $(document).ready(function () {
    line_store_fetch_image_url(line_store_global);
    line_store_nobackground(line_store_global);
    console.log(line_store_global);
  });
})();
