import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Box from "../core/Box";
import Mask from "../core/Mask";
import Sprite from "../core/Sprite";
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
  mobile: {
    cardPreview: {
      fontStyle: fontStyle,
      x: 0,
      y: 0,
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
    cardPreview: {
      fontStyle: fontStyle,
      x: -200, //window.innerWidth / 2,
      y: 90, //window.innerHeight / 2,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
    },
    cardImg: {
      texture: "/assets/deck/1C.png",
      // x: 0,
      // y: 100,
      scaleX: 0.45,
      scaleY: 0.45,
      // label: "cardImg",
      cursor: false,
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
    },
  },
};

interface cardsObject {
  [key: string]: string;
}
const CardReview: React.FC = () => {
  const { app, device } = usePixi();
  const [deviceConfig] = useState(dataConfiguraton[device]);
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
    if (deviceConfig?.container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }
    setParentConRef(container);
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
        // console.log(
        //   "ppppppppp=>",
        //   `/assets/deck/${event.c?.card?.value}${
        //     cardType[event.c?.card?.suit]
        //   }.png`
        // );
        console.log(
          "event?.etn=>",
          event,
          event?.c?.collectableWin,
          event?.etn == "hit" && event?.c?.collectableWin > 0
            ? "#232b53"
            : event?.etn == "hit"
            ? "#cccccc"
            : event?.etn == "start"
            ? "#232b53"
            : "#28a745"
        );
        imgs.push(
          <>
            <Sprite
              key={`${i}-${event.c?.card?.value}`}
              {...deviceConfig?.cardImg}
              label={`hist_${event.c?.card?.value}`}
              x={-113 * i + 580}
              y={5}
              app={app}
              textureUpdate={`/assets/deck/${event.c?.card?.value}${
                cardType[event.c?.card?.suit]
              }.png`}
              container={parentConRef && parentConRef.children[0]}
            />
            <Box
              key={`box-${i}-${event.c?.card?.value}`}
              TextStyle={deviceConfig?.boxDesign}
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
              x={-113 * i + 580}
              y={150}
              label={"rightButton"}
              app={app}
              container={parentConRef && parentConRef.children[0]}
              cursor={false}
            />
          </>
        );
      });
    });

  // Create a mask (e.g., a rectangle)
  // console.log("parentConRef=>", parentConRef);
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Mask x={-350} y={120} app={app} container={parentConRef} />
          {/* <Text
            TextStyle={deviceConfig?.cardPreview}
            title={"Card Preview"}
            label={"cardPreview"}
            app={app}
            container={parentConRef}
          /> */}
          {imgs}
        </>
      )}
    </>
  );
};
export default CardReview;
