const getImage = (src) => {
  const image = new Image();

  image.src = src;

  return image;
};

const generateMarkedImage = async (
  imageUrl,
  watermarkUrl,
  imageSize,
  watermarkSize,
  extension
) => {
  const $canvas = document.createElement("canvas");
  const $image = getImage(imageUrl);
  const $watermark = getImage(watermarkUrl);

  $canvas.width = imageSize[0];
  $canvas.height = imageSize[1];

  const context = $canvas.getContext("2d");

  return new Promise((resolve) => {
    $image.onload = () => {
      $watermark.onload = () => {
        context.drawImage($image, 0, 0, imageSize[0], imageSize[1]);
        context.drawImage($watermark, 0, 0, watermarkSize[0], watermarkSize[1]);

        resolve();
      };
    };
  }).then(() => $canvas.toDataURL(`image/${extension}`));
};

const generateMarkedImageBlob = async (
  imageUrl,
  watermarkUrl,
  imageSize,
  watermarkSize,
  extension
) =>
  fetch(
    await generateMarkedImage(
      imageUrl,
      watermarkUrl,
      imageSize,
      watermarkSize,
      extension
    )
  ).then((response) => response.blob());

export { generateMarkedImageBlob };
