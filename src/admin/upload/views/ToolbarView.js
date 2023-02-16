import AddWatermarkButton from "../components/AddWatermarkButton";

// https://atimmer.github.io/wordpress-jsdoc/media_views_toolbar.js.html
const { Toolbar } = wp.media.view;

const ToolbarView = Toolbar.extend({
  _addWatermarkButtonView: new AddWatermarkButton(),
  _deleteButtonClassName: "delete-selected-button",

  initialize() {
    Toolbar.prototype.initialize.apply(this, arguments);

    this.controller.on("select:activate", () => {
      this.el
        .querySelector(`.${this._deleteButtonClassName}`)
        .before(this._addWatermarkButtonView.el);
    });
    this.controller.on("select:deactivate", () => {
      this._addWatermarkButtonView.el.remove();
    });
  },
});

export default ToolbarView;
