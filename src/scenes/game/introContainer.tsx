import Text from "@/components/core/Text";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

// Function to create the intro screen
interface IntroContainerInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const dataConfiguraton: any = {
  introScreenSprite: {
    texture: "/assets/introScreen.webp",
    scaleX: 1,
    scaleY: 1,
    label: "introScreen",
    cursor: false,
    desktop: {
      x: -950,
      y: -467,
    },
    mobile: {
      x: -950,
      y: -467,
    },
  },
  introTitle: {
    title: "Hi-Lo Casual Game!!",
    label: "introTitle",
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
      fontSize: 30,
    },
    cursor: false,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: -100, //window.innerWidth / 2,
      y: -275, //window.innerHeight / 2,
    },
    mobile: {
      x: 70,
      y: 50,
    },
  },
  continueBtn: {
    title: "Continue",
    label: "continueBtn",
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
      fontSize: 30,
    },
    cursor: true,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: -50,
      y: 100,
    },
    mobile: {
      x: 120,
      y: 500,
    },
  },
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
  },
};

const IntroContainer: React.FC<IntroContainerInterface> = (props: any) => {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  // const scale = Math.min(width / 1170, height / 940); // Adjust based on your design
  dataConfiguraton.desktop.container.x = width / 2;
  const { app, device } = usePixi();
  // const [deviceConfig] = useState(dataConfiguraton[device]);
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
    if (dataConfiguraton[device]?.container) {
      container.x = dataConfiguraton[device].container.x;
      container.y = dataConfiguraton[device].container.y;
    }

    setParentConRef(container);
  }, [app]);

  const clickContinueBtn = () => {
    const container = app.stage.getChildByLabel("GameIntro");
    app.stage.removeChild(container); // Remove intro screen
    props.setIntroScreen(true);
  };
  console.log("ttttttttt=>", { ...dataConfiguraton.introTitle });
  return (
    <>
      {!parentConRef ? null : (
        <>
          {/* <Sprite {...spriteObj} app={app} container={parentConRef} /> */}
          <Text
            {...dataConfiguraton.introTitle}
            {...dataConfiguraton.introTitle[device]}
            app={app}
            container={parentConRef}
          />
          <Text
            {...dataConfiguraton.continueBtn}
            {...dataConfiguraton.continueBtn[device]}
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
