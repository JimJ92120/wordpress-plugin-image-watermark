import WatermarkButton from "../../components/WatermarkButtonWithLoader";

class ToolbarButton extends WatermarkButton {
  get className() {
    return super.className + " button-primary hidden";
  }

  constructor(props) {
    super(props);

    this.isSingle = false;
    this.controller = props.controller;

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

      this.controller.on("select:deactivate", () => {
        this._hide();
      });

      this.selection.on("reset", (e) => {
        this._disable();
      });
    });
  }

  _hide() {
    this.el.classList.add("hidden");
  }
  _show() {
    this.el.classList.remove("hidden");
  }

  _isDisabled() {
    return this.el.classList.contains("disabled");
  }
  _disable() {
    this.el.classList.add("disabled");
  }
  _enable() {
    this.el.classList.remove("disabled");
  }
}

export default ToolbarButton;
