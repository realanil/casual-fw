import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import React, { useEffect, useRef, useState } from "react";
import CardHistory from "./game/cardHistory";
import GameButton from "./game/gameButton";
import GameScene from "./game/gameScene";
import GameTitle from "./game/GameTitle";
import IntroContainer from "./game/introContainer";
interface layoutInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const dataConfiguraton: any = {
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
  },
};
const GameManager: React.FC<layoutInterface> = (props) => {
  const { app, device } = usePixi();
  const [deviceConfig] = useState(dataConfiguraton[device]);
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
    if (deviceConfig?.container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }
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
          <GameTitle />
          <GameScene />
          {/* <PixiSpine label="reel_fx_spine"></PixiSpine> */}
          <GameButton />
          <CardHistory />
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
export default GameManager;
