import BoxWithTitileAndDesc from "@/components/core/BoxWithTitileAndDesc";
import Text from "@/components/core/Text";
import { createContainer } from "@/helpers/container";
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
  contentDesc?: Array<string>;
  contentHeading?: Array<string>;
}

const boxes: PIXI.Container[] = [];
// Box settings
const boxWidth = 340;
const boxHeight = 500;
const boxDistance = 500; // Distance between boxes
let firstTime: boolean = true;
let boxIndex: number = 0;
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

const IntroBox: React.FC<IntroSliderInterface> = (props: any) => {
  const boxRef: any = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  // const [currentIndex, setCurrentIndex] = useState(0); // Keeps track of the current slider index
  const {
    currentIndex,
    setCurrentIndex,
    isSlider,
    app,
    contentHeading,
    contentDesc,
  } = props;
  //!SECTION

  useEffect(() => {
    console.log("isSlider yes=>", isSlider);
    // isSlider && animateSlider(0);
    const timer = setTimeout(() => {
      !isSlider && showStaticBox();
      clearTimeout(timer);
    }, 0);
  }, [isSlider]);
  const showStaticBox = () => {
    const GameIntro: any = app.stage.getChildByLabel("GameIntro");
    let container: any = GameIntro.getChildByLabel("IntroBox").children;
    if (container) {
      for (let box of container) {
        box.visible = true;
      }
    }
  };
  // //!
  useEffect(() => {
    const GameIntro: any = app.stage.getChildByLabel("GameIntro");
    let container: any = GameIntro.getChildByLabel("IntroBox");
    setParentConRef(container);
    if (!container) {
      const continerRef: any = createContainer(
        PIXI,
        app,
        containerRef,
        "IntroBox",
        props.container
      );
      container = continerRef?.childContainerRef?.current;
      container.x = 200;
      container.y = -280;
      console.log("container=>", container, props.container, continerRef);
      setParentConRef(container);
    }
  }, []);

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
                labelMain={`StaticBox-${key}`}
                desc={contentDesc[key]}
                bgColor={"0x3498db"}
                visible={true}
                x={-200 * key}
                y={0}
                x_desc={-200 * key}
                y_desc={400}
                bgWidth={boxWidth + 10}
                bgHeight={boxHeight}
                label={`box-${key}`}
                app={app}
                container={parentConRef}
                cursor={false}
                color={`#2d3663`}
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
export default IntroBox;
