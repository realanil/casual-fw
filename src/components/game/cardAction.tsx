import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Sprite from "../core/Sprite";
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
  x: 450, //window.innerWidth / 2,
  y: 400, //window.innerHeight / 2,
  cursor: true,
  scaleX: 1,
  scaleY: 1,
};
const textObj2: any = {
  fontStyle: fontStyle,
  x: 1200, //window.innerWidth / 2,
  y: 400, //window.innerHeight / 2,
  cursor: true,
  scaleX: 1,
  scaleY: 1,
};
const spriteObj = {
  texture: "/assets/rightArrow.png",
  x: 1010,
  y: 200,
  scaleX: 0.5,
  scaleY: 0.5,
  label: "rightArrow",
  cursor: false,
};

const CardAction: React.FC = () => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);

  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "cardActionContainer",
      null
    );
    const container = continerRef.current;
    setParentConRef(container);
  }, []);

  const clickEventBtn = () => {
    console.log("Coming soon...");
  };
  textObj.onclick = clickEventBtn;
  textObj2.onclick = clickEventBtn;
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite {...spriteObj} app={app} container={parentConRef} />
          <Text
            TextStyle={textObj}
            title={"Lower and Same"}
            label={"leftButton"}
            app={app}
            container={parentConRef}
          />
          <Text
            TextStyle={textObj2}
            title={"Higher and Same"}
            label={"rightButton"}
            app={app}
            container={parentConRef}
          />
        </>
      )}
    </>
  );
};
export default CardAction;
