import { generateAndSaveMarkedImage } from "../../watermark";

import "./style.scss";

const { Attachment } = wp.media.view;

// https://atimmer.github.io/wordpress-jsdoc/media_views_attachment_details-two-column.js.html
const AttachmentDetailsView = () =>
  Attachment.Details.TwoColumn.extend({
    events: {
      "click .image-watermark__btn": "addWatermark",
    },

    _watermarkTemplate: `<span class="image-watermark setting">
      <label class="name">Watermark</label>
      <button class="image-watermark__btn button button-small">Add Watermark</button>
      <div class="image-watermark__loader">
        <div class="image-watermark__loader-spinner"></div>
      </div>
    </span>`,
    _loaderClassName: "image-watermark__loader",
    _loaderActiveClassName: "image-watermark__loader--active",

    template(view) {
      const template = wp.media.template("attachment-details-two-column")(view);
      const $dom = document.createElement("div");
      $dom.innerHTML = template;

      this._appendImageWatermarkButton($dom);

      return $dom.innerHTML;
    },

    _appendImageWatermarkButton($dom) {
      const $settings = $dom.querySelector(".settings");

      $settings.insertAdjacentHTML("afterbegin", this._watermarkTemplate);
    },

    _showResult(result) {
      if (result) {
        if (confirm("New image created. See new image.")) {
          window.open(result.source_url, "_blank");
        }
      } else {
        alert("Encountered some issues. Image has not been created.");
      }
    },

    _showLoader($loader) {
      $loader.classList.add(this._loaderActiveClassName);
      $loader.style.display = "block";
    },

    _hideLoader($loader) {
      $loader.remove();
    },

    async addWatermark() {
      const $loader = document.querySelector(`.${this._loaderClassName}`);
      this._showLoader($loader);

      const { attributes: image } = this.model;

      await generateAndSaveMarkedImage(
        {
          url: image.originalImageURL ?? image.url,
          height: image.height,
          width: image.width,
          title: image.title,
        },
        "png"
      ).then((result) => {
        this._showResult(result);
      });

      this._hideLoader($loader);
    },
  });

export default AttachmentDetailsView;
