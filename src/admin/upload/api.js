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
  const model = new wp.api.models.Media({
    id: imageId,
  });

  return model.fetch();
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

export { fetchImageById, fetchSettings, saveImage };
