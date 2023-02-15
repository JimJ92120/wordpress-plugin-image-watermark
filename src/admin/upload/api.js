const SettingsModel = wp.api.WPApiBaseModel.extend({
  url: wpApiSettings.root + "wp/v2/settings",
});

const fetchSettings = async () => {
  const settings = new SettingsModel();
  await settings
    .fetch({
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
    })
    .then((settingsData) => {
      settings.set(settingsData);
    });

  return settings.attributes;
};

const fetchImageById = (imageId) => {
  const model = new wp.api.models.Media({
    id: imageId,
  });

  return model.fetch();
};

// replace with wp.api.models.Media.save()
const saveImage = (imageBlob, imageName, extension) => {
  return fetch(wp.api.utils.getRootUrl() + "/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "X-WP-Nonce": wpApiSettings.nonce,
      "Content-Disposition": `attachment; filename="${imageName}.${extension}"`,
      "Content-type": `image/${extension}`,
    },
    body: imageBlob,
  }).then((response) => response.json());
};

export { fetchImageById, fetchSettings, saveImage };
