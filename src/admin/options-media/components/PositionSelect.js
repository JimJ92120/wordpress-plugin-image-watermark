import { SelectControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

// 4 bits encoding
const OPTIONS = [
  {
    label: "Select a position",
    value: "",
  },
  {
    label: "Center",
    value: 0b1111, // 15
  },
  {
    label: "Top",
    value: 0b0001, // 1
  },
  {
    label: "Bottom",
    value: 0b0010, // 2
  },
  {
    label: "Right",
    value: 0b0100, // 4
  },
  {
    label: "Left",
    value: 0b1000, // 8
  },
  {
    label: "Top Right",
    value: 0b0101, // 5
  },
  {
    label: "Bottom Right",
    value: 0b0110, // 6
  },
  {
    label: "Top Left",
    value: 0b1001, // 9
  },
  {
    label: "Bottom Left",
    value: 0b1010, // 10
  },
];

export default function PositionSelect({ fieldKey, position }) {
  const [selectedPosition, setSelectedPosition] = useState(position);

  return (
    <SelectControl
      name={fieldKey}
      value={selectedPosition}
      onChange={(newValue) => setSelectedPosition(newValue)}
      options={OPTIONS}
    />
  );
}
