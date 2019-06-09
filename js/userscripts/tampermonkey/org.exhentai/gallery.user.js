// ==UserScript==
// @name         exhentai_gallery
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      1.1.1
// @description  View all images from a gallery on one page.
// @author       centixkadon
// @match        https://exhentai.org/g/*
// @match        https://exhentai.org/s/*
// @grant        none
// ==/UserScript==

(function () {
  function decodeSearch(search) {
    let ans = {};
    let kvs = search.slice(1).split("&");
    for (let i = 0; i < kvs.length; ++i) {
      let [key, value] = kvs[i].split("=");
      key = decodeURIComponent(key);
      value = decodeURIComponent(value);
      ans[key] = ans[key] || [];
      ans[key].push(value);
    }
    return ans;
  }

  switch (location.pathname.split('/')[1]) {
    case "g": // gallery
      (function (loadCount, loadIntervalMs, loadTimeoutMs) {
        let all = document.createElement("td");
        all.innerHTML = "All";
        all.addEventListener("click", function () {
          document.querySelectorAll('iframe').forEach(function (iframe) { iframe.remove(); });

          let hrefs = [];
          document.querySelectorAll('#gdt>.gdtm a').forEach(function (href) { hrefs.push(href.href); });
          console.log(hrefs);

          let hrefsIndex = 0;
          function loadiframe() {
            if (hrefsIndex === hrefs.length) return;
            let index = hrefsIndex;
            let iframe = document.createElement("iframe");
            iframe.src = hrefs[index];
            iframe.style = "display: block; width: 100%; height: 768px; ";
            iframe.scrolling = "no";
            iframe.frameBorder = "0";

            let complete = false;
            iframe.addEventListener("load", function (e) {
              console.log("iframe " + index + " load");
              setTimeout(loadiframe, loadIntervalMs);
              complete = true;
            });
            setTimeout(function () {
              if (!complete) {
                console.log("iframe " + index + " timeout");
                loadiframe();
              }
            }, loadTimeoutMs);

            let comments = document.querySelector('[name="comments"]');
            comments.parentNode.insertBefore(iframe, comments);

            ++hrefsIndex;
          }

          for (let i = 0; i < loadCount; ++i) setTimeout(loadiframe, loadIntervalMs * i);
        });
        document.querySelector('.ptb tr').append(all);
      })(3, 1000, 60000);
      break;

    case "s": // source
      (function (loadTimeoutMs) {
        if (parent !== window) {
          let parentIframe = null;
          parent.document.querySelectorAll('iframe').forEach(function (iframe) {
            if (iframe.contentWindow === window) parentIframe = iframe;
          })

          if (parentIframe !== null) {
            parentIframe.style.height = document.body.clientHeight + "px";
            window.addEventListener("resize", function () {
              parentIframe.style.height = document.body.clientHeight + "px";
            });
          }
        }

        let index = document.querySelector('#i2 .sn>div').innerText.split(" ").join("");
        let loadstartTime = new Date();
        let nextnl = document.querySelector('#loadfail').attributes.onclick.value.split("'")[1];
        function nextload() {
          let nls = decodeSearch(location.search).nl || [];
          if (nls.indexOf(nextnl) === -1) nl(nextnl);
          else location.search = "";
        }

        let img = document.querySelector('#img');
        if (img.complete) console.log("image " + index + " load in cache");
        img.addEventListener("load", function () {
          console.log("image " + index + " load after " + (new Date() - loadstartTime) / 1000 + " seconds");
        });
        img.addEventListener("error", function () {
          console.log("image " + index + " error after " + (new Date() - loadstartTime) / 1000 + " seconds");
          nextload();
        });
        setTimeout(function () {
          if (!img.complete) {
            console.log("image " + index + " timeout after " + (new Date() - loadstartTime) / 1000 + " seconds");
            nextload();
          }
        }, loadTimeoutMs);

        let prev = document.querySelector('#prev').attributes.onclick.value.split("(")[1].split("')")[0].split(", '");
        let next = document.querySelector('#next').attributes.onclick.value.split("(")[1].split("')")[0].split(", '");
        prev = "/s/" + prev[1] + "/" + gid + "-" + prev[0];
        next = "/s/" + next[1] + "/" + gid + "-" + next[0];

        document.querySelector('#i1').innerHTML =
          '<div class="c3">' + index + " :: " + document.querySelector('#i2').lastChild.innerHTML + '</div>' +
          '<div class="c4"><span id="prev">Prev</span> <span id="next">Next</span> <span id="error">Error</span> <span id="reload">Reload</span></div>' +
          document.querySelector('#i3').outerHTML;
        document.querySelector('.ip').remove();
        document.querySelector('#i1>.c4>#prev').addEventListener("click", function () { location.pathname = prev; });
        document.querySelector('#i1>.c4>#next').addEventListener("click", function () { location.pathname = next; });
        document.querySelector('#i1>.c4>#error').addEventListener("click", nextload);
        document.querySelector('#i1>.c4>#reload').addEventListener("click", function () { location.replace(location); });
      })(120000);
      break;
  }
})();
