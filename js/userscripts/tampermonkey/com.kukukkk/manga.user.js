// ==UserScript==
// @name         kuku_manga
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Change css style.
// @author       centixkadon
// @match        https://m.kukukkk.com/comiclist/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  GM_addStyle("img { display: block; width: auto; margin: auto } .classBox .classopen li a:visited { color: #DDD }");
})();
