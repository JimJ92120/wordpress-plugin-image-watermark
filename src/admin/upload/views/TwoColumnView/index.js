import WatermarkSettingsView from "./WatermarkSettingsView";

// https://atimmer.github.io/wordpress-jsdoc/media_views_attachment_details-two-column.js.html
const { TwoColumn } = wp.media.view.Attachment.Details;

const TwoColumnView = () =>
  TwoColumn.extend({
    initialize() {
      TwoColumn.prototype.initialize.apply(this, arguments);

      this._watermarkSettingsView = new WatermarkSettingsView({
        model: this.model,
      });

      return this;
    },

    render() {
      TwoColumn.prototype.render.apply(this, arguments);

      this.el
        .querySelector(".settings")
        .prepend(this._watermarkSettingsView.el);

      return this;
    },
  });

export default TwoColumnView;
