import WatermarkButton from "../../components/WatermarkButtonWithLoader";

const { View } = Backbone;

class WatermarkSettings extends View {
  get tagName() {
    return "span";
  }
  get className() {
    return "watermark-settings setting";
  }
  get template() {
    return '<label class="name">Watermark</label>';
  }

  initialize({ model }) {
    this._watermarkButton = new WatermarkButton({
      selection: model,
    });

    this.render();

    return this;
  }

  render() {
    this.$el.html(this.template);

    this.el.append(this._watermarkButton.el);

    return this;
  }
}

export default WatermarkSettings;
