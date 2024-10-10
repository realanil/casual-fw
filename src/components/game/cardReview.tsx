import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Text from "../core/Text";
const fontStyle = {
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
  fontSize: 24,
  fontWeight: "lighter",
};
const textObj: any = {
  fontStyle: fontStyle,
  x: 800, //window.innerWidth / 2,
  y: 700, //window.innerHeight / 2,
  cursor: true,
  scaleX: 1,
  scaleY: 1,
};
const CardReview: React.FC = () => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);

  useEffect(() => {
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "cardPreviewContainer",
      null
    );
    const container = continerRef.current;
    setParentConRef(container);
  }, []);
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Text
            TextStyle={textObj}
            title={"Card Preview"}
            label={"cardPreview"}
            app={app}
            container={parentConRef}
          />
        </>
      )}
    </>
  );
};
export default CardReview;
