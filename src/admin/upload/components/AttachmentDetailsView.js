import { generateAndSaveMarkedImage } from "../watermark";

import LoaderView from "./LoaderView";

const { TwoColumn } = wp.media.view.Attachment.Details;

// https://atimmer.github.io/wordpress-jsdoc/media_views_attachment_details-two-column.js.html
const AttachmentDetailsView = () =>
  TwoColumn.extend({
    _loaderView: new LoaderView(),

    events: {
      "click .image-watermark__btn": "addWatermark",
    },

    _watermarkTemplate: `<span class="image-watermark setting">
      <label class="name">Watermark</label>
      <button class="image-watermark__btn button button-small">Add Watermark</button>
    </span>`,

    template(view) {
      const template = wp.media.template("attachment-details-two-column")(view);
      const $dom = document.createElement("div");
      $dom.innerHTML = template;

      this._appendImageWatermarkButton($dom);

      return $dom.innerHTML;
    },

    render() {
      TwoColumn.prototype.render.apply(this, arguments);

      this.el.append(this._loaderView.el);

      return this;
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

    async addWatermark() {
      this._loaderView.$el.trigger("show");

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

      this._loaderView.$el.trigger("hide");
    },
  });

export default AttachmentDetailsView;
