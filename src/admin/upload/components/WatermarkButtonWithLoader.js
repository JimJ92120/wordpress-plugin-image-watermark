import WatermarkButton from "./WatermarkButton";
import Loader from "./Loader";

class WatermarkButtonWithLoader extends WatermarkButton {
  initialize(props) {
    this._loaderView = new Loader();

    super.initialize(props);

    this.on("loadingStart", () => {
      this._loaderView.trigger("show");
    });
    this.on("loadingEnd", () => {
      this._loaderView.trigger("hide");
    });
    this.on("saveResult", (data) => {
      this._showResult(data);
    });
  }

  render() {
    super.render();

    this.el.append(this._loaderView.el);

    return this;
  }

  _showResult(result) {
    if (result) {
      this.isSingle
        ? this._showSingleResult(result)
        : this._showMultipleResult(result);
    } else {
      alert("Encountered some issues. Image has not been created.");
    }
  }

  _showSingleResult(result) {
    if (confirm("New image created. See new image.")) {
      window.open(result.source_url, "_blank");
    }
  }

  _showMultipleResult(result) {
    if (0 === result.length) {
      alert("no image selected");
    } else {
      const validResult = result.filter((image) => image);

      alert(`${validResult.length} / ${result.length} images added.`);
    }

    this.selection.reset();
  }
}

export default WatermarkButtonWithLoader;
