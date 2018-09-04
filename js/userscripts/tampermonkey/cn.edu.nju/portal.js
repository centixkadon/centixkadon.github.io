// ==UserScript==
// @name         nju_portal
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.1
// @description  Auto login NJU Real-Name Authentication System (p.nju.edu.cn).
// @author       centixkadon
// @match        http://p.nju.edu.cn/portal/index.html*
// @grant        none
// ==/UserScript==

function nju_portal_run(g) {
  setInterval(() => {
    $('#username').val(g.username);
    $('#password').val(g.password);
    if ($("#pcLoginCont").is(":visible")) loginRequest();
  }, 1000);
}

(function () {
  var nju_portal_global = {
    username: "",
    password: "",
  };

  $(document).ready(function () {
    nju_portal_run(nju_portal_global);
  });
})();
