import "./style.scss";

const LoaderView = _.extend(
  Backbone.View.extend({
    className: "loader",
    tagName: "span",
    template: '<div class="loader__spinner"></div>',

    _activeClassName: "loader--active",

    initialize() {
      this.bind("show", this._show, this);
      this.bind("hide", this._hide, this);

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
  }),
  Backbone.Events
);

export default LoaderView;
