import { fetchWatermarkImage, saveImage } from "./model";
import { generateMarkedImageBlob } from "./watermark";

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
        const extension = "png";
        const watermakeImage = await fetchWatermarkImage().then((response) => {
          const { thumbnail } = response.media_details.sizes;

          return {
            url: thumbnail.source_url,
            height: thumbnail.height,
            width: thumbnail.width,
          };
        });
        const { attributes: image } = this.model;
        const markedImageBlob = await generateMarkedImageBlob(
          image.originalImageURL ?? image.url,
          watermakeImage.url,
          [image.width, image.height],
          [watermakeImage.width, watermakeImage.height],
          extension
        );

        saveImage(markedImageBlob, `${image.title} (marked)`, "png")
          .then((response) => response.json())
          .then((result) => {
            console.log(
              `${result.title.rendered} created. See at ${result.source_url}`
            );
          })
          .catch((error) => console.error(error));
      },
    });
})(jQuery);
