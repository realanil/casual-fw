import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import React, { useEffect, useRef, useState } from "react";
import Text from "./core/Text";
import Card from "./game/card";
import CardAction from "./game/cardAction";
import CardReview from "./game/cardReview";
import IntroContainer from "./game/introContainer";
interface layoutInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
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
  fontSize: 40,
  fontWeight: "lighter",
};
const textObj = {
  fontStyle: fontStyle,
  x: 850, //window.innerWidth / 2,
  y: 100, //window.innerHeight / 2,
  cursor: false,
  scaleX: 1,
  scaleY: 1,
};
const Layout: React.FC<layoutInterface> = (props) => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  useEffect(() => {
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "layoutContainer",
      null
    );
    const container = continerRef.current;
    setParentConRef(container);
  }, []);

  return (
    <>
      {!props.introScreen && (
        <IntroContainer
          introScreen={props.introScreen}
          setIntroScreen={props.setIntroScreen}
        />
      )}
      {props.introScreen && (
        <>
          <Text
            TextStyle={textObj}
            title={"Game Title"}
            label={"gameTitle"}
            app={app}
            container={parentConRef}
          />
          <Card />
          {/* <PixiSpine label="reel_fx_spine"></PixiSpine> */}
          <CardAction />
          <CardReview />
        </>
      )}
      {/* <Bitmap
        text="Hello Pixi.js with Next.js and TypeScript! test123"
        x={400}
        y={300}
        anchor={0.5}
        style={textStyle} // Use the TextStyle object here
      ></Bitmap> */}
      {/* <Animation /> */}
    </>
  );
};
export default Layout;
