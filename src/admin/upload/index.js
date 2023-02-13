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
      addWatermark: () => {
        console.log("clicked");
      },
    });
})(jQuery);
