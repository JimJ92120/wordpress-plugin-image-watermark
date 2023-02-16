import LoaderView from "./LoaderView";
import AddWatermarkButtonView from "./AddWatermarkButtonView";

const WatermarkSettingsView = Backbone.View.extend({
  tagName: "span",
  className: "watermark-settings setting",
  template: '<label class="name">Watermark</label>',

  _loaderView: new LoaderView(),
  _buttonView: new AddWatermarkButtonView(),

  initialize({ image }) {
    this.image = image;
    this._buttonView.setImage(image);

    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    this.el.append(this._buttonView.el);
    this.el.append(this._loaderView.el);

    this._buttonView.on("loadingStart", () => {
      this._loaderView.trigger("show");
    });
    this._buttonView.on("loadingEnd", () => {
      this._loaderView.trigger("hide");
    });
    this._buttonView.on("saveResult", (data) => {
      this._showResult(data);
    });

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
});

export default WatermarkSettingsView;
