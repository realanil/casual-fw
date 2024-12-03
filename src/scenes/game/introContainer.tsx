import Text from "@/components/core/Text";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import IntroBox from "./IntroBox";
import IntroSlider from "./IntroSlider";

// Function to create the intro screen
interface IntroContainerInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isSlider?: boolean;
}
const styles = {
  fontFamily: "Desyrel",
  fontSize: 55,
  align: "left",
};
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
      x: -143, //window.innerWidth / 2,
      y: -400, //window.innerHeight / 2,
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
      x: -78,
      y: 250,
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
const boxes: PIXI.Container[] = [];
let firstTime: boolean = true;
const IntroContainer: React.FC<IntroContainerInterface> = (props: any) => {
  const { isSlider } = props;
  const { app, device } = usePixi();
  const width = window.innerWidth;
  // const height = window.innerHeight;
  // const scale = Math.min(width / 1170, height / 940); // Adjust based on your design
  dataConfiguraton.desktop.container.x = app.renderer.width / 2;
  dataConfiguraton.desktop.container.y = app.renderer.height / 2;

  // const [deviceConfig] = useState(dataConfiguraton[device]);
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Keeps track of the current slider index
  // const [isSlider, setIsSlider] = useState<boolean>(false);
  //!
  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "GameIntro",
      null
    );
    const container = continerRef?.current;
    if (dataConfiguraton[device]?.container && container) {
      container.x = dataConfiguraton[device].container.x;
      container.y = dataConfiguraton[device].container.y;
    }
    setParentConRef(container);
    // Cleanup on component unmount
    return () => {
      console.log("unmount");
      continerRef.current?.destroy(true, { children: true });
    };

    //!SECTION
  }, [app]);

  const clickContinueBtn = () => {
    const container = app.stage.getChildByLabel("GameIntro");
    app.stage.removeChild(container); // Remove intro screen
    props.setIntroScreen(true);
  };

  // const handleResize = () => {
  //   console.log("window.innerWidth=>", window.innerWidth);
  //   if (window.innerWidth <= 963) {
  //     setIsSlider(true);
  //   } else {
  //     setIsSlider(false);
  //   }
  // };
  // useEffect(() => {
  //   console.log("window.innerWidth=>", window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   if (window.innerWidth <= 963) {
  //     setIsSlider(true);
  //   } else {
  //     setIsSlider(false);
  //   }
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     app.destroy(true, { children: true });
  //   };
  // }, []);
  console.log("isSlider=>", isSlider);
  const contentHeading = ["Bet", "Choose", "Win"];
  const contentDesc = [
    "Press BET to play with the displayed card!",
    "Make your choice among the availale options to guess what the next card will be!",
    "Collect your accumulated winngins at any time!",
  ];
  const images = [
    "/assets/deck/1C.png", // Add the actual image paths
    "/assets/deck/4C.png",
    "/assets/deck/7C.png",
  ];
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
          {isSlider && (
            <IntroSlider
              container={parentConRef}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              introScreen={false}
              isSlider={isSlider}
              app={app}
              contentHeading={contentHeading}
              contentDesc={contentDesc}
            />
          )}
          {!isSlider && (
            <IntroBox
              container={parentConRef}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              introScreen={true}
              isSlider={isSlider}
              app={app}
              contentHeading={contentHeading}
              contentDesc={contentDesc}
            />
          )}
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
