import { render } from "@wordpress/element";

import ImageUpload from "./components/ImageUpload";

addEventListener("DOMContentLoaded", () => {
  const $fieldContainer = document.getElementById("image-watermark");

  render(<ImageUpload />, $fieldContainer);
});
