import WatermarkButtonView from "./WatermarkButtonView";

import { generateAndSaveMarkedImage } from "./watermark";

const { Events } = Backbone;

class WatermarkButton extends _.extend(WatermarkButtonView, Events) {
  get events() {
    return {
      click: "click",
    };
  }

  isSingle = true;

  constructor(props) {
    super(props);

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
  }

  async click() {
    if (this.selection) {
      this.trigger("loadingStart");

      const result = await (this.isSingle
        ? this._generateSingleImage()
        : this._generateMultipleImages());

      this.trigger("saveResult", result);
      this.trigger("loadingEnd");
    }
  }

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
  }

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
  }
}

export default WatermarkButton;
