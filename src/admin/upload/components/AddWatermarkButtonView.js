// // https://atimmer.github.io/wordpress-jsdoc/media_views_button.js.html
// // https://atimmer.github.io/wordpress-jsdoc/media_views_button_select-mode-toggle.js.html
const { Button } = wp.media.view;

const AddWatermarkButtonView = Button.extend({
  initialize() {
    _.defaults(this.options, {
      text: "Add watermark",
      classes: "image-watermark",
    });
    Button.prototype.initialize.apply(this, arguments);

    this.render();
  },

  render() {
    Button.prototype.render.apply(this, arguments);

    return this;
  },

  click() {
    console.log("image watermark button clicked");
  },
});

export default AddWatermarkButtonView;
