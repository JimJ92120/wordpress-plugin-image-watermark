import { generateAndSaveMarkedImage } from "./watermark";

const AddWatermarkButton = _.extend(
  Backbone.View.extend({
    tagName: "button",
    className: "image-watermark media-button button button-large",
    template: "Add watermark",
    events: {
      click: "click",
    },

    isSingle: true,

    initialize(props = {}) {
      if (props) {
        if (props.selection) {
          this.selection = props.selection;
        }

        if (props.isSingle || props.isSingle === false) {
          this.isSingle = props.isSingle;
        }
      }

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

      if (this.selection) {
        console.log("start");
        this.trigger("loadingStart");

        const result = await (this.isSingle
          ? this._generateSingleImage()
          : this._generateMultipleImages());

        this.trigger("saveResult", result);
        this.trigger("loadingEnd");

        console.log("end", result);
      }
    },

    async _generateSingleImage() {
      const { attributes: image } = this.selection;

      return generateAndSaveMarkedImage(
        {
          url: image.url,
          height: image.height,
          width: image.width,
          title: image.title,
        },
        "png"
      );
    },

    async _generateMultipleImages() {
      const promises = this.selection.models.map(({ attributes }) =>
        generateAndSaveMarkedImage(
          {
            url: attributes.url,
            title: attributes.title,
            height: attributes.height,
            width: attributes.width,
          },
          "png"
        )
      );

      return Promise.all(promises, (result) => result);
    },
  }),
  Backbone.Events
);

export default AddWatermarkButton;

export { generateAndSaveMarkedImage };
