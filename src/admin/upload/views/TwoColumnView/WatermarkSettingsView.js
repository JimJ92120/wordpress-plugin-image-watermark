import Loader from "../../components/Loader";
import AddWatermarkButton from "../../components/AddWatermarkButton";

const WatermarkSettingsView = Backbone.View.extend({
  tagName: "span",
  className: "watermark-settings setting",
  template: '<label class="name">Watermark</label>',

  _loaderView: new Loader(),
  _addWatermarkButton: new AddWatermarkButton(),

  initialize({ image }) {
    this.image = image;
    this._addWatermarkButton.setImage(image);

    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    this.el.append(this._addWatermarkButton.el);
    this.el.append(this._loaderView.el);

    this._addWatermarkButton.on("loadingStart", () => {
      this._loaderView.trigger("show");
    });
    this._addWatermarkButton.on("loadingEnd", () => {
      this._loaderView.trigger("hide");
    });
    this._addWatermarkButton.on("saveResult", (data) => {
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
