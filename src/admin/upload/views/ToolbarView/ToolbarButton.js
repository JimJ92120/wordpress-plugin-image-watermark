import AddWatermarkButton from "../../components/AddWatermarkButton";

class ToolbarButton extends AddWatermarkButton {
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

      this.on("saveResult", (data) => {
        this._showResult(data);
      });
    });
  }

  _showResult(result) {
    if (result) {
      if (0 === result.length) {
        alert("no image selected");
      } else {
        const validResult = result.filter((image) => image);

        alert(`${validResult.length} / ${result.length} images added.`);
      }

      this.selection.reset();
    } else {
      alert("Encountered some issues. Image has not been created.");
    }
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
