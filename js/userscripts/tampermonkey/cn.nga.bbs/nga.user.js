// ==UserScript==
// @name         nga_better
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.3
// @description  Redirect to one https site, fix parseTableClip function
// @author       centixkadon
// @match        *://ngabbs.com/*
// @match        *://bbs.nga.cn/*
// @match        *://bbs.ngacn.cc/*
// @match        *://nga.178.com/*
// @match        *://club.178.com/*
// @match        *://bbs.nga.cn/misc/adpage_insert_2.html*
// @grant        none
// ==/UserScript==

(function () {
  if (location.pathname === "/misc/adpage_insert_2.html") {
    location.replace(location.search.slice(1));
  } else if (location.origin !== "https://bbs.nga.cn") {
    location.replace("https://bbs.nga.cn" + location.pathname + location.search);
  } else {
    ({
      setAutostop: function (f, t) {
        setTimeout(function () {
          if (f() !== false) setTimeout(arguments.callee, t);
        }, t);
        return this;
      }
    }).setAutostop(function () {
      if (window["postfunc"] && postfunc.parseTableClip) {
        postfunc.parseTableClip = function () {
          $tbody = document.querySelectorAll('#uiAddTag .div3>div tbody');
          $tbody = $tbody[$tbody.length - 1];
          if ($tbody) {
            let table = "[table]";
            let $trs = $tbody.children;
            for (let i = 0; i < $trs.length; ++i) {
              if ($trs[i] instanceof HTMLTableRowElement) {
                table += "[tr]";
                let $tds = $trs[i].children;
                for (let i = 0; i < $tds.length; ++i) {
                  if ($tds[i] instanceof HTMLTableCellElement) {
                    table += "[td";
                    if ($tds[i].rowSpan !== 1) table += " rowspan" + $tds[i].rowSpan;
                    if ($tds[i].colSpan !== 1) table += " colspan" + $tds[i].colSpan;
                    table += "]" + $tds[i].innerHTML.trim() + "[/td]";
                  }
                }
                table += "[/tr]\n";
              }
            }
            table += "[/table]"
            return table;
          }
          return;
        }

        return false;
      }
    }, 100);
  }
})();
