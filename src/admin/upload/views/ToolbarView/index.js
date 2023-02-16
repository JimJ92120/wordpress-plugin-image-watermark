import WatermarkButton from "./WatermarkButton";

// https://atimmer.github.io/wordpress-jsdoc/media_views_toolbar.js.html
const { Toolbar } = wp.media.view;

const ToolbarView = () =>
  Toolbar.extend({
    initialize() {
      Toolbar.prototype.initialize.apply(this, arguments);

      const { controller, selection } = this;
      this._watermarkButtonView = new WatermarkButton({
        controller,
        selection,
      });
    },

    render() {
      Toolbar.prototype.render.apply(this, arguments);

      this.controller.on("uploader:ready", () => {
        this.el
          .querySelector(".media-toolbar-secondary")
          .prepend(this._watermarkButtonView.el);
      });

      return this;
    },
  });

export default ToolbarView;
