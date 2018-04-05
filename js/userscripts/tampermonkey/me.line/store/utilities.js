
function line_store_fetch_image_url(g) {
  let image_urls = [];
  $('.mdCMN09Image').each(function (index) {
    image_urls.push($(this).css('background-image').split('"')[1].split(';')[0]);
  });
  g.image_urls = image_urls;
}
