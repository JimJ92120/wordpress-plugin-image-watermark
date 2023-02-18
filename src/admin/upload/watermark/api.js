import apiFetch from "@wordpress/api-fetch";

const fetchSettings = () => {
  return apiFetch({
    path: "wp/v2/settings",
    method: "GET",
  }).catch((error) => {
    console.error(error);

    return false;
  });
};

const fetchImageById = (imageId) => {
  return apiFetch({
    path: "wp/v2/media" + "/" + imageId,
    method: "GET",
  }).catch((error) => {
    console.error(error);

    return false;
  });
};

const fetchWatermarkImage = async () => {
  const settings = await fetchSettings();

  if (settings) {
    const { image_id, position } = settings.image_watermark_settings;
    const image = await fetchImageById(image_id);

    if (image) {
      const { thumbnail } = image.media_details.sizes;

      return {
        image: {
          url: thumbnail.source_url,
          height: thumbnail.height,
          width: thumbnail.width,
        },
        position: Number(position),
      };
    }
  }

  return false;
};

const saveImage = async (imageBlob, imageName, extension) => {
  return apiFetch({
    path: "wp/v2/media",
    method: "POST",
    headers: {
      "Content-Disposition": `attachment; filename="${imageName}.${extension}"`,
    },
    body: imageBlob,
  }).catch(() => false);
};

export { fetchWatermarkImage, saveImage };
