import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store } from "@wordpress/core-data";

import ImageUpload from "./components/ImageUpload";
import PositionSelect from "./components/PositionSelect";

const OPTION_KEY = "image_watermark_settings";

export default function App() {
  const [settings, setSettings] = useState(null);

  useSelect((select) => {
    const result = select("core").getEntityRecord("root", "site");

    if (!settings && result && result[OPTION_KEY]) {
      setSettings(result[OPTION_KEY]);
    }
  });

  return (
    <table className="form-table">
      {settings && (
        <tbody>
          <tr>
            <th>Watermark Image</th>
            <td
              style={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <ImageUpload
                imageId={settings.image_id ?? null}
                fieldKey={OPTION_KEY + "[image_id]"}
              />
            </td>
          </tr>
          <tr>
            <th>Position</th>
            <td>
              <PositionSelect
                position={settings.position ?? null}
                fieldKey={OPTION_KEY + "[position]"}
              />
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
