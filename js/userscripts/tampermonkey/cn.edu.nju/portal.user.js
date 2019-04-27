// ==UserScript==
// @name         nju_portal
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      1.0
// @description  Auto login NJU Real-Name Authentication System (p.nju.edu.cn).
// @author       centixkadon
// @match        http://p.nju.edu.cn/portal/index.html*
// @grant        none
// ==/UserScript==

(function () {
  setCookieVal();

  let data = JSON.parse($.base64.atob(localStorage.data || "e30="));
  const nju_portal_global = {
    username: data.username || $('#username').val() || "",
    password: data.password || $('#password').val() || "",
    interval: data.interval || 1000 * 60 * 2,
  };

  (function (g) {
    $('body').prepend('<div class="inputdiv" style="height: 0px"><input type="text" class="login_input" id="interval" name="interval" placeholder="登出查询频率(ms)"></div>');
    $('#interval').val(g.interval);

    function saveData() {
      g.username = $('#username').val() || g.username;
      g.password = $('#password').val() || g.password;
      g.interval = parseInt($('#interval').val()) || g.interval;
      localStorage.data = $.base64.btoa(JSON.stringify(g));
    }
    saveData();
    $('#loginBtn').click(saveData);

    let handler = -1;
    function request() {
      if (globalVar.userinfo !== null && g.username !== "" && globalVar.userinfo.username.toLowerCase() !== g.username.toLowerCase()) {
        logoutRequest();
        console.log(new Date().format("yyyy-MM-dd hh:mm:ss") + ": logout.");
        handler = setTimeout(arguments.callee, 33);
      } else {
        if (g.username !== "") $('#username').val(g.username);
        if (g.password !== "") $('#password').val(g.password);
        if (globalVar.userinfo === null) {
          loginRequest();
          console.log(new Date().format("yyyy-MM-dd hh:mm:ss") + ": login.");
        }
        handler = setTimeout(arguments.callee, g.interval);
      }

      globalVar.userinfo = null;
      infoRequest();
    }

    handler = setTimeout(request, g.interval);
    $('#interval').change(function () {
      saveData();
      clearTimeout(handler);
      handler = setTimeout(request, g.interval);
    });
  })(nju_portal_global);
})();
