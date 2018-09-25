
$(document).ready(function () {
  $(window).resize((function () {
    let canvas = $("canvas");
    canvas.each(function () { $(this).attr("width", $(this).parent().innerWidth()); });

    (function (canvas) {
      if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        if (ctx !== null) {
          console.log(ctx);

          ctx.fillStyle = "rgb(200, 0, 0)";
          ctx.fillRect(10, 10, 50, 50);

          ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
          ctx.fillRect(30, 30, 50, 50);
        }
      }
    })(canvas[0]);

    (function (canvas) {
      if (canvas.getContext) {
        let gl = canvas.getContext("webgl");
        if (gl !== null) {
          console.log(gl);
        }
      }
    })(canvas[1]);

    return arguments.callee;
  })());

});

QUnit.test("Hello QUnit", function (assert) {
  assert.ok(true, "Hello QUnit!");
});
