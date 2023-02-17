import LoaderView from "./LoaderView";

import "./style.scss";

const { Events } = Backbone;

class Loader extends _.extend(LoaderView, Events) {
  _activeClassName = "loader--active";

  constructor(props) {
    super(props);

    this.bind("show", this._show, this);
    this.bind("hide", this._hide, this);
  }

  _show() {
    this.el.classList.add(this._activeClassName);
  }

  _hide() {
    this.el.classList.remove(this._activeClassName);
  }
}

export default Loader;
