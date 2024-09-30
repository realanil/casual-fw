// components/PixiText.js
import { app } from "@/pages";
import { Text, TextStyle } from "pixi.js";

interface textProps {
  text: string;
  x?: number | undefined;
  y?: number | undefined;
  anchor?: number;
  style?: any; // Optional prop
  name: string | RegExp | undefined;
}

const PixiText: React.FC<textProps> = ({ text, x, y, name }) => {
  const skewStyle = new TextStyle({
    fontFamily: "Arial",
    dropShadow: {
      alpha: 0.8,
      angle: 2.1,
      blur: 4,
      color: "0x111111",
      distance: 10,
    },
    fill: "#ffffff",
    stroke: { color: "#004620", width: 12, join: "round" },
    fontSize: 60,
    fontWeight: "lighter",
  });
  const skewText: any = new Text({
    text: text,
    style: skewStyle,
  });

  // skewText.skew.set(0.65, -0.3);
  // skewText.anchor.set(0.5, 0.5);
  skewText.x = x;
  skewText.y = y;
  // Add a custom property to store the name
  skewText.name = name;
  skewText.label = name;
  const pt: any = app.stage.getChildByLabel(skewText.label);
  if (pt) {
    pt.text = text;
    // pt.visible = false;
  } else {
    app.stage.addChild(skewText);
  }
  return null;
};

export default PixiText;
