import { render } from "@wordpress/element";

import App from "./App";

addEventListener("DOMContentLoaded", () => {
  const $fieldContainer = document.getElementById("image-watermark");

  render(<App />, $fieldContainer);
});
