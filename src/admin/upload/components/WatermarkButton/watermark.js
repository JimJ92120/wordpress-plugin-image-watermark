import { fetchImageById, fetchSettings, saveImage } from "../../api";
import { generateCanvas } from "./canvas";

const getCanvasBlob = async (
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

  return new Promise((resolve) => {
    $canvas.toBlob(async (blob) => {
      resolve(blob);
    }, `image/${extension}`);
  }).then((blob) => blob);
};

const fetchWatermarkImage = async () => {
  const settings = await fetchSettings();

  if (settings) {
    const { image_id, position } = settings.image_watermark_settings;

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
  }

  return false;
};

const generateAndSaveMarkedImage = async (image, extension) => {
  const { image: watermakeImage, position } = await fetchWatermarkImage();
  const markedImageBlob = await getCanvasBlob(
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
