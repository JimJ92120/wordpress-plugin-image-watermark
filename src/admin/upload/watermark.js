import { fetchImageById, fetchSettings, saveImage } from "./api";

const getImageAsync = (src) => {
  const image = new Image();

  image.src = src;

  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  }).then((image) => image);
};

const POSITIONS = {
  center: {
    value: 0b1111, // 15
    translate: (canvasSize, imageSize) => [
      canvasSize[0] / 2 - imageSize[0] / 2,
      canvasSize[1] / 2 - imageSize[1] / 2,
    ],
  },
  top: {
    value: 0b0001, // 1
    translate: (canvasSize, imageSize) => [
      canvasSize[0] / 2 - imageSize[0] / 2,
      0,
    ],
  },
  bottom: {
    value: 0b0010, // 2
    translate: (canvasSize, imageSize) => [
      canvasSize[0] / 2 - imageSize[0] / 2,
      canvasSize[1] - imageSize[1],
    ],
  },
  right: {
    value: 0b0100, //
    translate: (canvasSize, imageSize) => [
      canvasSize[0] - imageSize[0],
      canvasSize[1] / 2 - imageSize[1] / 2,
    ],
  },
  left: {
    value: 0b1000, // 8
    translate: (canvasSize, imageSize) => [
      0,
      canvasSize[1] / 2 - imageSize[1] / 2,
    ],
  },
  topRight: {
    value: 0b0101, // 5
    translate: (canvasSize, imageSize) => [canvasSize[0] - imageSize[0], 0],
  },
  bottomRight: {
    value: 0b0110, // 6
    translate: (canvasSize, imageSize) => [
      canvasSize[0] - imageSize[0],
      canvasSize[1] - imageSize[1],
    ],
  },
  topLeft: {
    value: 0b1001, // 9
    translate: (canvasSize, imageSize) => [0, 0],
  },
  bottomLeft: {
    value: 0b1010, // 10
    translate: (canvasSize, imageSize) => [0, canvasSize[1] - imageSize[1]],
  },
};
const getTranslatedPosition = (position, canvasSize, imageSize) => {
  const matchKey = Object.keys(POSITIONS).find(
    (positionKey) => POSITIONS[positionKey].value === position
  );

  return matchKey && POSITIONS[matchKey].translate
    ? POSITIONS[matchKey].translate(canvasSize, imageSize)
    : [0, 0];
};

const generateMarkedImageCanvas = async (
  imageUrl,
  watermarkUrl,
  imageSize,
  watermarkSize,
  watermarkPosition
) => {
  const $canvas = document.createElement("canvas");
  const $image = await getImageAsync(imageUrl);
  const $watermark = await getImageAsync(watermarkUrl);
  const translatedWatermarkPosition = getTranslatedPosition(
    watermarkPosition,
    imageSize,
    watermarkSize
  );
  const context = $canvas.getContext("2d");

  $canvas.width = imageSize[0];
  $canvas.height = imageSize[1];

  context.drawImage($image, 0, 0, imageSize[0], imageSize[1]);
  context.drawImage(
    $watermark,
    translatedWatermarkPosition[0],
    translatedWatermarkPosition[1],
    watermarkSize[0],
    watermarkSize[1]
  );

  return $canvas;
};

const getMarkedImageBlob = async (
  imageUrl,
  watermarkUrl,
  imageSize,
  watermarkSize,
  watermarkPosition,
  extension
) => {
  const $canvas = await generateMarkedImageCanvas(
    imageUrl,
    watermarkUrl,
    imageSize,
    watermarkSize,
    watermarkPosition
  );

  return new Promise((resolve) => {
    $canvas.toBlob(async (blob) => {
      resolve(blob);
    }, `image/${extension}`);
  }).then((blob) => blob);
};

const fetchWatermarkImage = async () => {
  const { image_watermark_settings } = await fetchSettings();
  const { image_id, position } = image_watermark_settings;

  return fetchImageById(image_id).then((response) => {
    const { thumbnail } = response.media_details.sizes;

    return {
      image: {
        url: thumbnail.source_url,
        height: thumbnail.height,
        width: thumbnail.width,
      },
      position: Number(position),
    };
  });
};

const generateAndSaveMarkedImage = async (image, extension) => {
  const { image: watermakeImage, position } = await fetchWatermarkImage();
  const markedImageBlob = await getMarkedImageBlob(
    image.url,
    watermakeImage.url,
    [image.width, image.height],
    [watermakeImage.width, watermakeImage.height],
    position,
    extension
  );

  saveImage(markedImageBlob, `${image.title} (marked)`, extension)
    .then((response) => response.json())
    .then((result) => {
      console.log(
        `${result.title.rendered} created. See at ${result.source_url}`
      );
    })
    .catch((error) => console.error(error));
};

export { getMarkedImageBlob, generateAndSaveMarkedImage };
