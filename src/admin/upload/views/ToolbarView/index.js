import ToolbarButton from "./ToolbarButton";

// https://atimmer.github.io/wordpress-jsdoc/media_views_toolbar.js.html
const { Toolbar } = wp.media.view;

const ToolbarView = () =>
  Toolbar.extend({
    initialize() {
      Toolbar.prototype.initialize.apply(this);

      const { controller, selection } = this;
      this._watermarkButtonView = new ToolbarButton({
        controller,
        selection,
      });
    },

    render() {
      Toolbar.prototype.render.apply(this);

      this.controller.on("uploader:ready", () => {
        this.el
          .querySelector(".media-toolbar-secondary")
          .prepend(this._watermarkButtonView.el);
      });

      return this;
    },
  });

export default ToolbarView;
