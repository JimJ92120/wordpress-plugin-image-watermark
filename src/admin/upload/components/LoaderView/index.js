import "./style.scss";

const LoaderView = Backbone.View.extend({
  className: "loader",
  tagName: "span",
  template: '<div class="loader__spinner"></div>',
  events: {
    show: "_show",
    hide: "_hide",
  },

  _activeClassName: "loader--active",

  initialize() {
    this.render();

    return this;
  },

  render() {
    this.$el.html(this.template);

    return this;
  },

  _show() {
    this.el.classList.add(this._activeClassName);
  },

  _hide() {
    this.el.classList.remove(this._activeClassName);
  },
});

export default LoaderView;
