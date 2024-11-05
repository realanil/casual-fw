import Box from "@/components/core/Box";
import Mask from "@/components/core/Mask";
import Sprite from "@/components/core/Sprite";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
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
  fontSize: 24,
  fontWeight: "lighter",
};

const dataConfiguraton: any = {
  cardPreview: {
    fontStyle: fontStyle,
    cursor: true,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: -200, //window.innerWidth / 2,
      y: 90, //window.innerHeight / 2,
    },
    mobile: {
      x: 0,
      y: 0,
    },
  },
  cardImg: {
    texture: "/assets/deck/1C.png",
    // x: 0,
    // y: 100,
    scaleX: 0.45,
    scaleY: 0.45,
    // label: "cardImg",
    cursor: false,
    desktop: {
      x: -200, //window.innerWidth / 2,
      y: 90, //window.innerHeight / 2,
    },
    mobile: {
      x: 0,
      y: 0,
    },
  },
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
      fill: "#ffffff",
      // stroke: { color: "#004620", width: 12, join: "round" },
      fontSize: 24,
      fontWeight: "lighter",
    },
    x: 0,
    y: 0,
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
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
    mask: {
      x: -350,
      y: 120,
    },
  },
  mobile: {
    mask: {
      x: 0,
      y: 550,
    },
  },
};

interface cardsObject {
  [key: string]: string;
}
const CardHistory: React.FC = () => {
  const width = window.innerWidth;
  dataConfiguraton.desktop.container.x = width / 2;

  const { app, device } = usePixi();
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | any>(null);
  const apidata = useAppSelector((state) => state.bet.history);
  const [history, setHistory] = useState<any>([]);
  const [cardType] = useState<cardsObject>({
    clubs: "C",
    diamonds: "D",
    hearts: "H",
    spades: "S",
  });
  useEffect(() => {
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "cardPreviewContainer",
      null
    );
    const container = continerRef.current;
    if (dataConfiguraton[device]?.container) {
      container.x = dataConfiguraton[device].container.x;
      container.y = dataConfiguraton[device].container.y;
    }
    setParentConRef(container);
    if (device == "mobile") {
      dataConfiguraton.cardImg.scaleX = 0.25;
      dataConfiguraton.cardImg.scaleY = 0.25;
    }
  }, []);
  useEffect(() => {
    if (apidata) {
      const modifyArr = [...apidata].reverse();
      modifyArr.splice(6, modifyArr.length);
      // console.log("apidata=>", modifyArr);
      setHistory(modifyArr);
    }
  }, [apidata]);
  const imgs: any = [];
  history &&
    history.map((dataApi: any, i: number) => {
      dataApi.round.events.forEach((event: any) => {
        imgs.push(
          <div key={`${i}-${event.c?.card?.value}`}>
            <Sprite
              key={`${i}-${event.c?.card?.value}`}
              {...dataConfiguraton.cardImg}
              {...dataConfiguraton.cardImg[device]}
              label={`hist_${event.c?.card?.value}`}
              x={device == "mobile" ? -80 * i + 350 : -113 * i + 580}
              y={5}
              app={app}
              textureUpdate={`/assets/deck/${event.c?.card?.value}${
                cardType[event.c?.card?.suit]
              }.png`}
              container={parentConRef && parentConRef.children[0]}
            />
            <Box
              key={`box-${i}-${event.c?.card?.value}`}
              {...dataConfiguraton.boxDesign}
              {...dataConfiguraton.boxDesign[device]}
              title={"success"}
              bgColor={
                event?.c?.chosenChoice?.action == "newCard"
                  ? "#68696f"
                  : event?.etn == "start"
                  ? "#232b53"
                  : event?.etn == "hit" && event?.c?.collectableWin > 0
                  ? "#28a745"
                  : event?.etn == "hit"
                  ? "#f20000"
                  : ""
              }
              x={device == "mobile" ? -80 * i + 350 : -113 * i + 580}
              y={device == "mobile" ? 90 : 150}
              width={device == "mobile" ? 60 : 100}
              label={"rightButton"}
              app={app}
              container={parentConRef && parentConRef.children[0]}
              cursor={false}
            />
          </div>
        );
      });
    });

  // Create a mask (e.g., a rectangle)
  // console.log("parentConRef=>", parentConRef);
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Mask
            x={dataConfiguraton[device].mask.x}
            y={dataConfiguraton[device].mask.y}
            app={app}
            container={parentConRef}
            key={4}
          />
          {imgs}
        </>
      )}
    </>
  );
};
export default CardHistory;
