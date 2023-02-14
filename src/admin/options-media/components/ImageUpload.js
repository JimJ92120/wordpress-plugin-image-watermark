import { useState } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { store } from "@wordpress/core-data";
import { MediaUpload } from "@wordpress/media-utils";
import { Button } from "@wordpress/components";

function ImageUpload({ fieldKey, image }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (image && !selectedImage) {
    setSelectedImage(image);
  }

  return (
    <div>
      <input
        label="Watermark Image"
        name={fieldKey}
        type="number"
        value={selectedImage ? selectedImage.id : null}
        readonly
        hidden
      />
      {selectedImage && (
        <img
          src={selectedImage.url}
          alt={selectedImage.alt}
          title={selectedImage.title}
        />
      )}
      <MediaUpload
        onSelect={({ id, alt, title, sizes }) => {
          setSelectedImage({
            id,
            alt,
            title,
            url: sizes.thumbnail.url,
          });
        }}
        value={selectedImage ? selectedImage.id : null}
        render={({ open }) => (
          <Button variant="secondary" onClick={open}>
            Open Media Library
          </Button>
        )}
      />
    </div>
  );
}

export default withSelect((select, { imageId }) => {
  const image = select("core").getMedia(imageId);

  if (image) {
    const { id, alt_text, title, media_details } = image;
    const { thumbnail } = media_details.sizes;

    return {
      image: {
        id,
        alt: alt_text,
        title: title.rendered,
        url: thumbnail.source_url,
      },
    };
  }

  return {
    image: null,
  };
})(ImageUpload);
