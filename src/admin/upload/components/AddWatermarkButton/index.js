import { generateAndSaveMarkedImage } from "./watermark";

const AddWatermarkButton = _.extend(
  Backbone.View.extend({
    tagName: "button",
    className: "image-watermark media-button button button-large",
    template: "Add watermark",
    events: {
      click: "click",
    },

    initialize() {
      this.bind("loadingStart", null, this);
      this.bind("loadingEnd", null, this);
      this.bind("saveResult", null, this);

      this.render();
    },

    render() {
      this.$el.html(this.template);

      return this;
    },

    setImage(image) {
      this.image = image;
    },

    async click() {
      console.log("clicked");
      if (this.image) {
        console.log("start");
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

export default AddWatermarkButton;

export { generateAndSaveMarkedImage };
