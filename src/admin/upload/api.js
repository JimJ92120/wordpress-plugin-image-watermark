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

// replace with wp.api.models.Media.save()
const saveImage = (imageBlob, imageName, extension) => {
  // return false;
  return fetch(wp.api.utils.getRootUrl() + "/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "X-WP-Nonce": wpApiSettings.nonce,
      "Content-Disposition": `attachment; filename="${imageName}.${extension}"`,
      "Content-type": `image/${extension}`,
    },
    body: imageBlob,
  })
    .then((response) => {
      if (201 === response.status) {
        return response.json();
      }

      return false;
    })
    .catch((error) => console.error(error));
};

export { fetchWatermarkImage, saveImage };
