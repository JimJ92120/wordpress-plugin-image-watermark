import { fetchWatermarkImage, saveImage } from "./api";
import { generateCanvas, getCanvasBlob } from "./canvas";

const getCanvas = async (
  imageUrl,
  watermarkUrl,
  imageSize,
  watermarkSize,
  watermarkPosition,
  extension
) => {
  const $canvas = await generateCanvas(
    imageUrl,
    watermarkUrl,
    imageSize,
    watermarkSize,
    watermarkPosition
  );

  return getCanvasBlob($canvas, extension);
};

const generateAndSaveMarkedImage = async (image, extension) => {
  const { image: watermakeImage, position } = await fetchWatermarkImage();
  const markedImageBlob = await getCanvas(
    image.url,
    watermakeImage.url,
    [image.width, image.height],
    [watermakeImage.width, watermakeImage.height],
    position,
    extension
  );

  return saveImage(markedImageBlob, `${image.title} (marked)`, extension);
};

export { generateAndSaveMarkedImage };
