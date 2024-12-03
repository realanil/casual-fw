import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import React, { useEffect, useRef, useState } from "react";
import Animation from "./game/Animation";
import CardHistory from "./game/cardHistory";
import GameButton from "./game/gameButton";
import GameScene from "./game/gameScene";
import GameTitle from "./game/GameTitle";
import IntroContainer from "./game/introContainer";
// const Animation = dynamic(() => import("@/scenes/game/Animation"), {
//   ssr: false,
// });
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
  const [animationSource, setAnimationSource] = useState<any>(null);
  const [isSlider, setIsSlider] = useState<boolean>(false);
  useEffect(() => {
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "layoutContainer",
      null
    );
    const container = continerRef.current;
    if (deviceConfig?.container && container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }
    setParentConRef(container);
  }, []);

  const handleResize = () => {
    // console.log("window.innerWidth=>", window.innerWidth);
    if (window.innerWidth <= 914) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
  };
  useEffect(() => {
    // console.log("window.innerWidth=>", window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 914) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      // app.destroy(true, { children: true });
    };
  }, []);

  return (
    <>
      {!props.introScreen && (
        <IntroContainer
          introScreen={props.introScreen}
          setIntroScreen={props.setIntroScreen}
          isSlider={isSlider}
        />
      )}
      {props.introScreen && (
        <>
          <GameTitle mainContainer={parentConRef} />
          <GameScene mainContainer={parentConRef} />
          {/* <PixiSpine label="reel_fx_spine"></PixiSpine> */}
          <GameButton mainContainer={parentConRef} />
          <CardHistory mainContainer={parentConRef} />
          <Animation />
        </>
      )}
      {/* <Bitmap
        text="Hello Pixi.js with Next.js and TypeScript! test123"
        x={400}
        y={300}
        anchor={0.5}
        style={textStyle} // Use the TextStyle object here
      ></Bitmap> */}
    </>
  );
};
export default GameManager;
