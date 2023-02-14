import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store } from "@wordpress/core-data";
import { MediaUpload } from "@wordpress/media-utils";
import { Button } from "@wordpress/components";

const OPTION_KEY = "image_watermark_id";

export default function ImageUpload() {
  const [imageId, setImageId] = useState(null);

  useSelect((select) => {
    const result = select("core").getEntityRecord("root", "site");

    if (result && !imageId) {
      setImageId(result[OPTION_KEY]);
    }
  });
  const image = useSelect((select) => select("core").getMedia(imageId));

  return (
    <div>
      <input
        label="Watermark Image"
        name={OPTION_KEY}
        type="number"
        value={imageId}
        readonly
        hidden
      />
      {image && (
        <img
          src={image.media_details.sizes.medium.source_url}
          alt={image.alt_text}
          title={image.title}
        />
      )}
      <MediaUpload
        onSelect={({ id }) => setImageId(id)}
        value={imageId}
        render={({ open }) => (
          <Button variant="secondary" onClick={open}>
            Open Media Library
          </Button>
        )}
      />
    </div>
  );
}
