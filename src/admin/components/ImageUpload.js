import { useEntityProp } from "@wordpress/core-data";
import { TextControl } from "@wordpress/components";

const OPTION_KEY = "image_watermark_id";

export default function ImageUpload() {
  const [imageId, setImageId] = useEntityProp("root", "site", OPTION_KEY);

  return (
    <div>
      <TextControl
        label="Watermark Image"
        name={OPTION_KEY}
        type="number"
        value={imageId}
        onChange={(newValue) => setImageId(newValue)}
      />
    </div>
  );
}
