const { View } = Backbone;

class LoaderView extends View {
  get className() {
    return "loader";
  }
  get tagName() {
    return "span";
  }
  get template() {
    return '<div class="loader__spinner"></div>';
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

export default LoaderView;
