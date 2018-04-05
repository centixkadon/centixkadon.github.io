
function line_store_nobackground(g) {
  let image_urls = g.image_urls;
  $('.mdCMN09LiInner').each(function (index) {
    $(this).html($('<img>').addClass('mdCMN09Image').attr('src', image_urls[index]));
  })
}
