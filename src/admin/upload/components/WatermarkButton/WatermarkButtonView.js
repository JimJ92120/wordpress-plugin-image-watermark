const { View } = Backbone;

class WatermarkButtonView extends View {
  get className() {
    return "image-watermark media-button button button-large";
  }
  get tagName() {
    return "button";
  }
  get template() {
    return "Add watermark";
  }

  initialize() {
    this.render();

    return this;
  }

  render() {
    this.$el.html(this.template);

    return this;
  }
}

export default WatermarkButtonView;
