// ==UserScript==
// @name         exhentai_gallery
// @namespace    https://github.com/centixkadon/centixkadon.github.io/js/userscripts/tampermonkey/
// @version      0.2
// @description  View all images from a gallery on one page.
// @author       centixkadon
// @match        https://exhentai.org/g/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://raw.githubusercontent.com/centixkadon/centixkadon.github.io/master/js/userscripts/tampermonkey/org.exhentai/gallery/multipage.js
// ==/UserScript==

var configsInThisUserScript = {
  loading_thread_count: 1,
  loading_timeout_ms: 10000,
  loading_check_interval_ms: 1000,
};

(function () {
  all_multipage();
})();