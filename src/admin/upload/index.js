import WatermarkSettingsView from "./components/WatermarkSettingsView";
import AddWatermarkButtonView from "./components/AddWatermarkButtonView";

const { TwoColumn } = wp.media.view.Attachment.Details;
wp.media.view.Attachment.Details.TwoColumn = TwoColumn.extend({
  initialize() {
    TwoColumn.prototype.initialize.apply(this, arguments);

    const { attributes: image } = this.model;
    this._watermarkSettingsView = new WatermarkSettingsView({
      image: {
        url: image.originalImageURL ?? image.url,
        height: image.height,
        width: image.width,
        title: image.title,
      },
    });

    return this;
  },

  render() {
    TwoColumn.prototype.render.apply(this, arguments);

    this.el.querySelector(".settings").prepend(this._watermarkSettingsView.el);

    return this;
  },
});

const { Toolbar } = wp.media.view;
wp.media.view.Toolbar = Toolbar.extend({
  _watermarkButtonView: new AddWatermarkButtonView(),
  _deleteButtonClassName: "delete-selected-button",

  initialize() {
    Toolbar.prototype.initialize.apply(this, arguments);

    this.controller.on("select:activate", () => {
      this.el
        .querySelector(`.${this._deleteButtonClassName}`)
        .before(this._watermarkButtonView.el);
    });
    this.controller.on("select:deactivate", () => {
      this._watermarkButtonView.el.remove();
    });
  },
});
