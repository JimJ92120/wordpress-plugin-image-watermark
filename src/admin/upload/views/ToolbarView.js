import AddWatermarkButtonView from "../components/AddWatermarkButtonView";

// https://atimmer.github.io/wordpress-jsdoc/media_views_toolbar.js.html
const { Toolbar } = wp.media.view;

const ToolbarView = Toolbar.extend({
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

export default ToolbarView;
