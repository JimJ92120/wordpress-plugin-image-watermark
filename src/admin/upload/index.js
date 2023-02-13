import { fetchWatermarkImage } from "./model";
import { getImage, generateMarkedImage } from "./controller";

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

        const $image = getImage(image.originalImageURL ?? image.url);
        $image.height = image.height;
        $image.width = image.width;
        const $watermark = getImage(
          watermakeImage.media_details.sizes.thumbnail.source_url
        );
        $watermark.height = watermakeImage.media_details.sizes.thumbnail.height;
        $watermark.width = watermakeImage.media_details.sizes.thumbnail.width;

        const markedImage = await generateMarkedImage(
          $image,
          $watermark,
          "png"
        );

        document.querySelector(".details-image").src = markedImage;
      },
    });
})(jQuery);
