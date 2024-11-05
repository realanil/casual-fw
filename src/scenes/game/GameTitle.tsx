import Text from "@/components/core/Text";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

const dataConfiguraton: any = {
  introTitle: {
    title: "Hi-Lo Casual Game!",
    label: "gameTitle",
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
      fontSize: 35,
    },
    cursor: false,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: -114, //window.innerWidth / 2,
      y: -332, //window.innerHeight / 2,
    },
    mobile: {
      x: 70,
      y: 50,
    },
  },
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
  },
};

const GameTitle: React.FC = () => {
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
      "GameTitle",
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

  return (
    <>
      {!parentConRef ? null : (
        <Text
          {...dataConfiguraton.introTitle}
          {...dataConfiguraton.introTitle[device]}
          app={app}
          container={parentConRef}
        />
      )}
    </>
  );
};

// Call the function to create the intro container
export default GameTitle;
