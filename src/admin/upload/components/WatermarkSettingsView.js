import { generateAndSaveMarkedImage } from "../watermark";

import LoaderView from "./LoaderView";

const WatermarkSettingsView = Backbone.View.extend({
  tagName: "span",
  className: "watermark-settings setting",
  template: `<label class="name">Watermark</label>
    <button class="watermark-settings__add-btn button button-small">Add watermark</button>
  `,
  events: {
    "click .watermark-settings__add-btn": "_addWatermark",
  },

  _loaderView: new LoaderView(),

  initialize(model) {
    this.model = model;

    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    this.el.append(this._loaderView.el);

    return this;
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

  async _addWatermark() {
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

export default WatermarkSettingsView;
