import { generateAndSaveMarkedImage } from "./watermark";

// // https://atimmer.github.io/wordpress-jsdoc/media_views_button.js.html
// // https://atimmer.github.io/wordpress-jsdoc/media_views_button_select-mode-toggle.js.html
const { Button } = wp.media.view;

const AddWatermarkButtonView = _.extend(
  Button.extend({
    initialize() {
      _.defaults(this.options, {
        text: "Add watermark",
        classes: "image-watermark",
      });
      Button.prototype.initialize.apply(this, arguments);

      this.bind("loadingStart", null, this);
      this.bind("loadingEnd", null, this);
      this.bind("saveResult", null, this);

      this.render();
    },

    render() {
      Button.prototype.render.apply(this, arguments);

      return this;
    },

    setImage(image) {
      this.image = image;
    },

    async click() {
      if (this.image) {
        this.trigger("loadingStart");

        await generateAndSaveMarkedImage(this.image, "png").then((result) => {
          this.trigger("saveResult", result);
          this.trigger("loadingEnd");
        });
      }
    },
  }),
  Backbone.Events
);

export default AddWatermarkButtonView;
