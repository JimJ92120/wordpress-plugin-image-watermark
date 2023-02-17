import AddWatermarkButton, {
  generateAndSaveMarkedImage,
} from "../../components/AddWatermarkButton";

const WatermarkButton = AddWatermarkButton.extend({
  initialize(props) {
    this.controller = props.controller;
    this.selection = props.selection;
    this.isSingle = false;

    AddWatermarkButton.prototype.initialize.apply(this);

    this._addStatesEvents();
  },

  render() {
    AddWatermarkButton.prototype.render.apply(this);

    this.el.classList.add("button-primary");
    this._hide();

    return this;
  },

  _addStatesEvents() {
    this.controller.on("select:activate", () => {
      this._show();

      if (0 === this.selection.length) {
        this._disable();
      }

      this.controller.on("selection:toggle", () => {
        if (0 === this.selection.length) {
          this._disable();
        } else if (this._isDisabled()) {
          this._enable();
        }
      });
    });

    this.controller.on("select:deactivate", () => {
      this._hide();
    });
  },

  _hide() {
    this.el.classList.add("hidden");
  },
  _show() {
    this.el.classList.remove("hidden");
  },

  _isDisabled() {
    return this.el.classList.contains("disabled");
  },
  _disable() {
    this.el.classList.add("disabled");
  },
  _enable() {
    this.el.classList.remove("disabled");
  },
});

export default WatermarkButton;
