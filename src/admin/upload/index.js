import { fetchWatermarkImage } from "./model";
import { generateMarkedImage } from "./controller";

(($) => {
  wp.media.view.Attachment.Details.TwoColumn =
    wp.media.view.Attachment.Details.TwoColumn.extend({
      template(view) {
        const template = wp.media.template("attachment-details-two-column")(
          view
        );
        const $dom = document.createElement("div");
        $dom.innerHTML = template;

        const $settings = $($dom).find(".settings");
        $settings.prepend(
          '<button class="image-watermark-btn">Add Watermark</button>'
        );

        return $dom.innerHTML;
      },
      events: {
        "click .image-watermark-btn": "addWatermark",
      },
      async addWatermark() {
        console.log("clicked");

        const watermakeImage = await fetchWatermarkImage();
        const { attributes: image } = this.model;

        const markedImage = await generateMarkedImage(
          {
            url: image.originalImageURL ?? image.url,
            height: image.height,
            width: image.width,
          },
          {
            url: watermakeImage.media_details.sizes.thumbnail.source_url,
            height: watermakeImage.media_details.sizes.thumbnail.height,
            width: watermakeImage.media_details.sizes.thumbnail.width,
          },
          "png"
        );

        document.querySelector(".details-image").src = markedImage;
      },
    });
})(jQuery);
