import BoxWithTitileAndDesc from "@/components/core/BoxWithTitileAndDesc";
import Text from "@/components/core/Text";
import { createContainer } from "@/helpers/container";
import gsap from "gsap";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

// Function to create the intro screen
interface IntroSliderInterface {
  introScreen: boolean;
  container?: any;
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  isSlider?: boolean;
  app?: any;
  contentDesc: Array<string>;
  contentHeading: Array<string>;
}
// Box settings
const boxWidth = 340;
const boxHeight = 500;
const dataConfiguraton: any = {
  boxDesign: {
    fontStyle: {
      fontFamily: "Arial",
      dropShadow: {
        alpha: 0.8,
        angle: 2.1,
        blur: 4,
        color: "0x111111",
        distance: 10,
      },
      align: "center",
      wordWrap: true,
      wordWrapWidth: boxWidth,
      fill: "#ffffff",
      // stroke: { color: "#004620", width: 12, join: "round" },
      fontSize: 32,
      fontWeight: "lighter",
    },
    cursor: true,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: 0,
      y: 0,
    },
    mobile: {
      x: 0,
      y: 0,
    },
  },
};

const IntroSlider: React.FC<IntroSliderInterface> = ({
  introScreen,
  isSlider,
  currentIndex,
  setCurrentIndex,
  app,
  contentHeading,
  contentDesc,
  container,
}) => {
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);

  //!SECTION

  useEffect(() => {
    const timer = setTimeout(() => {
      isSlider && animateSlider(0);
      clearTimeout(timer);
    }, 100);
  }, [isSlider]);
  // //!
  useEffect(() => {
    const GameIntro: any = app.stage.getChildByLabel("GameIntro");
    let containerRes: any = GameIntro.getChildByLabel("IntroSlider");
    setParentConRef(containerRes);
    if (!containerRes) {
      const continerRef: any = createContainer(
        PIXI,
        app,
        containerRef,
        "IntroSlider",
        container
      );
      containerRes = continerRef?.childContainerRef?.current;
      containerRes.x = -180;
      containerRes.y = -280;
      setParentConRef(containerRes);
    }
    return () => {
      console.log("unmount");
      const IntroSlider = GameIntro?.getChildByLabel("IntroSlider");
      if (IntroSlider) {
        const dis_1 = IntroSlider.getChildByLabel("Bet");
        const dis_2 = IntroSlider.getChildByLabel("Choose");
        const dis_3 = IntroSlider.getChildByLabel("Win");
        if (dis_1) gsap.killTweensOf(dis_1);
        if (dis_2) gsap.killTweensOf(dis_2);
        if (dis_3) gsap.killTweensOf(dis_3);
      }

      // const GameIntro = app.stage.getChildByLabel("GameIntro");
      // const IntroSlider = GameIntro?.getChildByLabel("IntroSlider");
      // const elementsToKill = contentHeading.map((label) =>
      //   IntroSlider?.getChildByLabel(label)
      // );
      // elementsToKill.forEach((element) => {
      //   if (element) gsap.killTweensOf(element);
      // });
    };
  }, []);

  // Function to animate the slider to the next box
  const animateSlider = (index: number) => {
    // Animate all boxes to move left/right based on the index
    const GameIntro: any = app.stage.getChildByLabel("GameIntro");
    if (GameIntro) {
      let containerRes: any = GameIntro.getChildByLabel("IntroSlider");
      const sliderMp = () => {
        if (containerRes.children) {
          // prevIndex = index;
          const IntroSlider = GameIntro.getChildByLabel("IntroSlider");
          const dis_1 = IntroSlider.getChildByLabel("Bet");
          const dis_2 = IntroSlider.getChildByLabel("Choose");
          const dis_3 = IntroSlider.getChildByLabel("Win");
          const elements = [dis_1, dis_2, dis_3];
          const currentElement = elements[index];
          if (currentElement) {
            gsap.to(currentElement, {
              x: 0,
              // x: -180,
              duration: 0.5, // Time in seconds for the transition
              ease: "power2.inOut",
              delay: 0,
              onComplete: () => {
                gsap.to(currentElement, {
                  x: app.screen.width + 400,
                  // x: -180,
                  duration: 0.5, // Time in seconds for the transition
                  ease: "power2.inOut",
                  delay: 0.5,
                  onComplete: () => {
                    if (dis_1) {
                      dis_1.x = -app.screen.width - 400;
                      dis_2.x = -app.screen.width - 400;
                      dis_3.x = -app.screen.width - 400;
                      if (index == 0) {
                        dis_1.visible = false;
                        dis_2.visible = true;
                        dis_3.visible = false;
                      } else if (index == 1) {
                        dis_1.visible = false;
                        dis_2.visible = false;
                        dis_3.visible = true;
                      } else if (index == 2) {
                        dis_1.visible = true;
                        dis_2.visible = false;
                        dis_3.visible = false;
                      }
                    }
                    currentElement && gsap.killTweensOf(currentElement);
                    animateSlider(
                      index == 0 ? 1 : index == 1 ? 2 : index == 2 ? 0 : 0
                    );
                  },
                });
                // currentElement && gsap.killTweensOf(currentElement);

                setCurrentDisplay(currentDisplay == 2 ? 0 : currentDisplay + 1);
              },
            });
          }
        }
      };
      sliderMp();
    }
  };

  return (
    <>
      {parentConRef
        ? contentHeading.map((str: string, key: number) => {
            return (
              <BoxWithTitileAndDesc
                key={`box-${key}`}
                {...dataConfiguraton.boxDesign}
                {...dataConfiguraton.boxDesign["desktop"]}
                title={str}
                desc={contentDesc[key]}
                visible={[currentDisplay].includes(key) ? true : false}
                bgColor={"0x3498db"}
                x={0}
                y={0}
                x_desc={0}
                y_desc={400}
                bgWidth={boxWidth + 10}
                bgHeight={boxHeight}
                label={`box-${key}`}
                app={app}
                container={parentConRef}
                cursor={false}
                color="#2d3663"
              >
                <Text
                  {...dataConfiguraton.boxDesign}
                  {...dataConfiguraton.boxDesign["desktop"]}
                  title={str}
                />
              </BoxWithTitileAndDesc>
            );
          })
        : null}
    </>
  );
};

// Call the function to create the intro container
export default IntroSlider;
