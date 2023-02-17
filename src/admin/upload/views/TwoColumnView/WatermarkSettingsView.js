import Loader from "../../components/Loader";
import WatermarkButton from "../../components/WatermarkButton";

const WatermarkSettingsView = Backbone.View.extend({
  tagName: "span",
  className: "watermark-settings setting",
  template: '<label class="name">Watermark</label>',

  _loaderView: new Loader(),

  initialize({ model }) {
    this._watermarkButton = new WatermarkButton({
      selection: model,
    });

    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    this.el.append(this._watermarkButton.el);
    this.el.append(this._loaderView.el);

    this._watermarkButton.on("loadingStart", () => {
      this._loaderView.trigger("show");
    });
    this._watermarkButton.on("loadingEnd", () => {
      this._loaderView.trigger("hide");
    });
    this._watermarkButton.on("saveResult", (data) => {
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
