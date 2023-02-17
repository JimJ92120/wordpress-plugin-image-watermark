import WatermarkSettings from "./WatermarkSettings";

// https://atimmer.github.io/wordpress-jsdoc/media_views_attachment_details-two-column.js.html
const { TwoColumn } = wp.media.view.Attachment.Details;

const TwoColumnView = () =>
  TwoColumn.extend({
    initialize() {
      TwoColumn.prototype.initialize.apply(this);

      this._watermarkSettingsView = new WatermarkSettings({
        model: this.model,
      });

      return this;
    },

    render() {
      TwoColumn.prototype.render.apply(this);

      this.el
        .querySelector(".settings")
        .prepend(this._watermarkSettingsView.el);

      return this;
    },
  });

export default TwoColumnView;
