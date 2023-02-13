const generateMarkedImage = async (
  originalImage,
  watermarkImage,
  extension
) => {
  const $canvas = document.createElement("canvas");
  const context = $canvas.getContext("2d");
  const { height, width } = originalImage;

  $canvas.height = height;
  $canvas.width = width;

  const loadImages = new Promise((resolve) => {
    const $image = new Image();
    $image.onload = () => {
      context.drawImage($image, 0, 0, width, height);

      resolve();
    };
    $image.src = originalImage.url;
  }).then(
    () =>
      new Promise((resolve) => {
        const $watermark = new Image();
        $watermark.onload = () => {
          context.drawImage(
            $watermark,
            0,
            0,
            watermarkImage.width,
            watermarkImage.height
          );

          resolve();
        };
        $watermark.src = watermarkImage.url;
      })
  );

  return loadImages.then(() => $canvas.toDataURL(`image/${extension}`));
};

export { generateMarkedImage };
