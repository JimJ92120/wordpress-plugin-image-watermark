const getImage = (url) => {
  const $image = new Image();

  $image.src = url;

  return $image;
};

const generateMarkedImage = async (
  $originalImage,
  $watermarkImage,
  extension
) => {
  const $canvas = document.createElement("canvas");
  const context = $canvas.getContext("2d");

  const { height, width } = $originalImage;

  $canvas.height = height;
  $canvas.width = width;

  context.drawImage($originalImage, 0, 0, width, height);
  context.drawImage(
    $watermarkImage,
    width - $watermarkImage.width * 2,
    height - $watermarkImage.height * 2,
    $watermarkImage.width,
    $watermarkImage.height
  );

  return await fetch($canvas.toDataURL(`image/${extension}`), {
    cache: "no-cache",
  })
    .then((response) => response.blob())
    .then((result) => URL.createObjectURL(result));
};

export { getImage, generateMarkedImage };
