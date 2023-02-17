import AddWatermarkButton, {
  generateAndSaveMarkedImage,
} from "../../components/AddWatermarkButton";

const WatermarkButton = AddWatermarkButton.extend({
  initialize({ controller, selection }) {
    AddWatermarkButton.prototype.initialize.apply(this, arguments);

    this.controller = controller;
    this.selection = selection;
  },

  render() {
    AddWatermarkButton.prototype.render.apply(this);

    this._addStatesEvents();

    return this;
  },

  async click() {
    if (this.selection.length > 0) {
      const promises = this.selection.models.map(({ attributes }) =>
        generateAndSaveMarkedImage(
          {
            url: attributes.url,
            title: attributes.title,
            height: attributes.height,
            width: attributes.width,
          },
          "png"
        )
      );

      const result = await Promise.all(promises, (result) => result);

      console.log(result);
    }
  },

  _addStatesEvents() {
    this.el.classList.add("button-primary");
    this._hide();

    // this.controller.on("all", (event) => console.log("name", event));

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