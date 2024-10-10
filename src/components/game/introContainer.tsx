import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Sprite from "../core/Sprite";
import Text from "../core/Text";
// Function to create the intro screen
interface IntroContainerInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const spriteObj = {
  texture: "/assets/introScreen.webp",
  x: 0,
  y: 0,
  scaleX: 4,
  scaleY: 3.5,
  label: "introScreen",
  cursor: false,
};
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
  x: 800, //window.innerWidth / 2,
  y: 280, //window.innerHeight / 2,
  cursor: false,
  scaleX: 1,
  scaleY: 1,
};
const textObj2: any = {
  fontStyle: fontStyle,
  x: 950, //window.innerWidth / 2,
  y: 600, //window.innerHeight / 2,
  cursor: true,
  scaleX: 1,
  scaleY: 1,
};
const IntroContainer: React.FC<IntroContainerInterface> = (props: any) => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "GameIntro",
      null
    );
    // console.log("data.containerRef=>", continerRef.current);
    const container = continerRef.current;
    setParentConRef(container);
  }, [app]);

  const clickContinueBtn = () => {
    const container = app.stage.getChildByLabel("GameIntro");
    app.stage.removeChild(container); // Remove intro screen
    props.setIntroScreen(true);
  };

  textObj2.onclick = clickContinueBtn;
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite {...spriteObj} app={app} container={parentConRef} />
          <Text
            TextStyle={textObj}
            title={"Welcome to the game!"}
            label={"introTitle"}
            app={app}
            container={parentConRef}
          />
          <Text
            TextStyle={textObj2}
            title={"Continue"}
            label={"continueBtn"}
            app={app}
            container={parentConRef}
          />
        </>
      )}
    </>
  );
};

// Call the function to create the intro container
export default IntroContainer;
