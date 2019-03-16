// ==UserScript==
// @name         36mh_manga
// @namespace    https://github.com/centixkadon/centixkadon.github.io/tree/master/js/userscripts/tampermonkey
// @version      0.1
// @description  Save chapter data.
// @author       centixkadon
// @match        https://www.36mh.com/manhua/*
// @grant        none
// ==/UserScript==

(function () {
  let pathname = location.pathname.split("/");
  if (pathname.length === 4) {
    if (pathname[3] === "") {
      let data = JSON.parse(localStorage.history || "[]");
      for (let i = 0; i < data.length; ++i) {
        if (data[i].comic_url === location.pathname) {
          let content = [];
          $('.chapter-body').find('span').each(function () {
            content.push({
              id: parseInt($(this).parent().attr("href").split("/")[3].split(".")[0]),
              name: $(this).html().split(" ")[0],
            });
          });
          if ($('.chapter-sort.active').data("order") === "desc") {
            content.reverse();
          }
          let contents = JSON.parse(localStorage.contents || "{}");
          contents[data[i].comic_id] = content;
          localStorage.contents = JSON.stringify(contents);
          break;
        }
      }
    } else if (pathname[3].split(".")[1] === "html") {
      if (!prevChapterData.id || !nextChapterData.id) {
        let id = parseInt(pathname[3].split(".")[0]);
        let content = JSON.parse(localStorage.contents || "{}")[pageId.split('.')[1]] || [];
        console.log(id, content);
        for (let i = 0; i < content.length; ++i) {
          if (content[i].id === id) {
            if (i - 1 >= 0) prevChapterData.id = prevChapterData.id || content[i - 1].id;
            if (i + 1 < content.length) nextChapterData.id = nextChapterData.id || content[i + 1].id;
            break;
          }
        }
      }
    }
  }
})();
