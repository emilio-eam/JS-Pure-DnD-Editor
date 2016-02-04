function resizeCanvas(canvas, maxHeight, maxWidth) {
  var width = canvas.width;
  var height = canvas.height;
  var ratio = width * 1.0 / height;
  if (ratio*maxHeight > maxWidth) {
    resample_hermite(canvas, width, height, maxWidth, maxWidth/ratio);
  } else {
    resample_hermite(canvas, width, height, maxHeight*ratio, maxHeight);
  }
  return canvas;
}
