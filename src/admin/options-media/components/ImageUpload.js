import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store } from "@wordpress/core-data";
import { MediaUpload } from "@wordpress/media-utils";
import { Button } from "@wordpress/components";

const OPTION_KEY = "image_watermark_settings";

export default function ImageUpload() {
  const [imageId, setImageId] = useState(null);

  useSelect((select) => {
    const result = select("core").getEntityRecord("root", "site");

    if (result && !imageId) {
      const settings = result[OPTION_KEY];

      if (settings && settings.image_id) {
        setImageId(settings.image_id);
      }
    }
  });
  const image = useSelect((select) => select("core").getMedia(imageId));

  return (
    <div>
      <input
        label="Watermark Image"
        name={OPTION_KEY + "[image_id]"}
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
