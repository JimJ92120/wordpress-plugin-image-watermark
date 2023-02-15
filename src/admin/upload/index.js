import { generateAndSaveMarkedImage } from "./watermark";

import "./style.scss";

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
          <div class="image-watermark__loader">
            <div class="image-watermark__loader-spinner"></div>
          </div>
        </span>`
      );

      return $dom.innerHTML;
    },

    events: {
      "click .image-watermark__btn": "addWatermark",
    },

    async addWatermark() {
      const { attributes: image } = this.model;

      generateAndSaveMarkedImage(
        {
          url: image.originalImageURL ?? image.url,
          height: image.height,
          width: image.width,
          title: image.title,
        },
        "png"
      );
    },
  });
