import { fetchImageById, saveImage, fetchSettings } from "./api";
import { getMarkedImageBlob } from "./watermark";

wp.media.view.Attachment.Details.TwoColumn =
  wp.media.view.Attachment.Details.TwoColumn.extend({
    template(view) {
      const template = wp.media.template("attachment-details-two-column")(view);
      const $dom = document.createElement("div");
      $dom.innerHTML = template;

      const $settings = $dom.querySelector(".settings");
      $settings.insertAdjacentHTML(
        "afterbegin",
        `<span class="image-watermark setting">
          <label class="name">Watermark</label>
          <button class="image-watermark__btn button button-small">Add Watermark</button>
        </span>`
      );

      return $dom.innerHTML;
    },
    events: {
      "click .image-watermark__btn": "addWatermark",
    },
    async addWatermark() {
      const extension = "png";
      const { image_watermark_settings } = await fetchSettings();
      const watermakeImage = await fetchImageById(
        image_watermark_settings.image_id
      ).then((response) => {
        const { thumbnail } = response.media_details.sizes;

        return {
          url: thumbnail.source_url,
          height: thumbnail.height,
          width: thumbnail.width,
        };
      });
      const { attributes: image } = this.model;
      const markedImageBlob = await getMarkedImageBlob(
        image.originalImageURL ?? image.url,
        watermakeImage.url,
        [image.width, image.height],
        [watermakeImage.width, watermakeImage.height],
        Number(image_watermark_settings.position),
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
    },
  });
