import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Text from "../core/Text";

// Function to create the intro screen
interface IntroContainerInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const dataConfiguraton: any = {
  mobile: {
    introScreenSprite: {
      texture: "/assets/introScreen.webp",
      x: -950,
      y: -467,
      scaleX: 1,
      scaleY: 1,
      label: "introScreen",
      cursor: false,
    },
    introTitle: {
      fontStyle: {
        fontFamily: "Arial",
        dropShadow: {
          alpha: 0.8,
          angle: 2.1,
          blur: 4,
          color: "0x111111",
          distance: 10,
        },
        fill: "#ffffff",
        stroke: { color: "gray", width: 12, join: "round" },
        fontSize: 24,
        fontWeight: "lighter",
      },
      x: 70,
      y: 50,
      cursor: false,
      scaleX: 1,
      scaleY: 1,
    },
    continueBtn: {
      fontStyle: {
        fontFamily: "Arial",
        dropShadow: {
          alpha: 0.8,
          angle: 2.1,
          blur: 4,
          color: "0x111111",
          distance: 10,
        },
        fill: "#ffffff",
        stroke: { color: "gray", width: 12, join: "round" },
        fontSize: 24,
        fontWeight: "lighter",
      },
      x: 120,
      y: 400,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
    },
  },
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
    introScreenSprite: {
      texture: "/assets/introScreen.webp",
      x: -950,
      y: -467,
      scaleX: 1,
      scaleY: 1,
      label: "introScreen",
      cursor: false,
    },
    introTitle: {
      fontStyle: {
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
      },
      x: -190, //window.innerWidth / 2,
      y: -275, //window.innerHeight / 2,
      cursor: false,
      scaleX: 1,
      scaleY: 1,
    },
    continueBtn: {
      fontStyle: {
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
      },
      x: 0,
      y: 200,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
    },
  },
};

const IntroContainer: React.FC<IntroContainerInterface> = (props: any) => {
  const { app, device } = usePixi();
  const [deviceConfig] = useState(dataConfiguraton[device]);
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
    if (deviceConfig?.container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }

    setParentConRef(container);
  }, [app]);

  const clickContinueBtn = () => {
    const container = app.stage.getChildByLabel("GameIntro");
    app.stage.removeChild(container); // Remove intro screen
    props.setIntroScreen(true);
  };

  return (
    <>
      {!parentConRef ? null : (
        <>
          {/* <Sprite {...spriteObj} app={app} container={parentConRef} /> */}
          <Text
            TextStyle={deviceConfig?.introTitle}
            title={"Welcome to the game!"}
            label={"introTitle"}
            app={app}
            container={parentConRef}
          />
          <Text
            TextStyle={deviceConfig?.continueBtn}
            title={"Continue"}
            label={"continueBtn"}
            app={app}
            container={parentConRef}
            onclick={clickContinueBtn}
          />
        </>
      )}
    </>
  );
};

// Call the function to create the intro container
export default IntroContainer;
