import WatermarkButton from "../../components/WatermarkButtonWithLoader";

const WatermarkSettingsView = Backbone.View.extend({
  tagName: "span",
  className: "watermark-settings setting",
  template: '<label class="name">Watermark</label>',

  initialize({ model }) {
    this._watermarkButton = new WatermarkButton({
      selection: model,
    });

    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    this.el.append(this._watermarkButton.el);

    return this;
  },
});

export default WatermarkSettingsView;
