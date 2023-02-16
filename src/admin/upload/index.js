import ToolbarView from "./components/ToolbarView";

import WatermarkSettingsView from "./components/WatermarkSettingsView";

const { TwoColumn } = wp.media.view.Attachment.Details;
wp.media.view.Attachment.Details.TwoColumn = TwoColumn.extend({
  initialize() {
    TwoColumn.prototype.initialize.apply(this, arguments);

    this._watermarkSettingsView = new WatermarkSettingsView(this.model);

    return this;
  },

  render() {
    TwoColumn.prototype.render.apply(this, arguments);

    this.el.querySelector(".settings").prepend(this._watermarkSettingsView.el);

    return this;
  },
});

wp.media.view.Toolbar = ToolbarView();
