// components/PixiText.js
import { usePixi } from "@/context/PixiContext";
import { Container, Text, TextStyle } from "pixi.js";

interface textProps {
  text: string;
  x?: number | undefined;
  y?: number | undefined;
  anchor?: number;
  style?: any; // Optional prop
  name: string | RegExp | undefined;
  textSize?: number;
  cursor?: boolean;
  onclick?: (() => void) | undefined;
}

const PixiText: React.FC<textProps> = (props) => {
  const { text, x, y, name, textSize, cursor } = props;
  const app = usePixi().app;
  const container: any = new Container();
  container.label = name;
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
    // stroke: { color: "#004620", width: 12, join: "round" },
    fontSize: textSize ? textSize : 12,
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
  // skewText.name = name;
  skewText.label = name;
  const pt: any = app.stage.getChildByLabel(skewText.label);
  console.log("assets 2=>", props);
  cursor && (skewText.interactive = true);

  cursor &&
    skewText.on("pointerover", () => {
      app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
    });
  cursor &&
    skewText.on("pointerout", () => {
      app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
    });
  // Attach the custom click event function
  skewText.on("pointerdown", () => {
    console.log("Text clicked!");
    // onclick && props.onclick(); // Call the passed function
    props.onclick && props.onclick(); // Call the passed function
  });
  if (pt) {
    pt.text = text;
    pt.x = x;
    pt.y = y;
    // pt.visible = false;
  } else {
    container.addChild(skewText);
    app.stage.addChild(container);
  }

  return null;
};

export default PixiText;
