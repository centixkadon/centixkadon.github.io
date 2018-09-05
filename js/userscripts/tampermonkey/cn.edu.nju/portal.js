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
    if (globalVar.userinfo.username !== null && g.username !== "" && globalVar.userinfo.username !== g.username.toLowerCase()) logoutRequest();
    if ($("#pcLoginCont").is(":visible")) {
      if (g.username !== "") $('#username').val(g.username);
      if (g.password !== "") $('#password').val(g.password);
      loginRequest();
    }

    infoRequest();
  }, g.infoRequestIntervalMs);
}

(function () {
  var nju_portal_global = {
    username: "",
    password: "",
    infoRequestIntervalMs: 1000 * 60 * 2, // 2min
  };

  $(document).ready(function () {
    nju_portal_run(nju_portal_global);
  });
})();
