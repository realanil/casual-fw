import Sprite from "@/components/core/Sprite";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
const dataConfiguraton: any = {
  cardImg: {
    texture: "/assets/deck/8C.png",
    scaleX: 1.4,
    scaleY: 1.4,
    label: "cardImg",
    cursor: false,
    mobile: {
      x: 100,
      y: 150,
    },
    desktop: {
      x: -150,
      y: -300,
    },
  },
  desktop: {
    container: {
      x: 0,
      y: 0,
    },
  },
};
interface cardsObject {
  [key: string]: string;
}
interface interfaceGameScene {
  mainContainer: any;
}
const Card: React.FC<interfaceGameScene> = ({ mainContainer }) => {
  // const width = window.innerWidth;
  // dataConfiguraton.desktop.container.x = width / 2;
  const { app, device } = usePixi();
  const [cardType] = useState<cardsObject>({
    clubs: "C",
    diamonds: "D",
    hearts: "H",
    spades: "S",
  });
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  const playCardData: any = useAppSelector((state) => state.bet.responseCard);
  const dataApi: any = useAppSelector((state) => state.bet.data);
  // const [card, setCard] = useState<string>("0");
  const [texture, setTexture] = useState<string>("/assets/deck/8C.png");
  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "CardContainer",
      mainContainer
    );
    // const container = continerRef.current;
    const container = continerRef?.childContainerRef?.current;

    if (dataConfiguraton[device]?.container && container) {
      container.x = dataConfiguraton[device].container.x;
      container.y = dataConfiguraton[device].container.y;
    }
    setParentConRef(container);
  }, [dataConfiguraton[device]]);
  useEffect(() => {
    // console.log("action=>", dataApi);
    if (dataApi) {
      dataApi.round.events.forEach((event: any) => {
        event.c?.value &&
          setTexture(
            `/assets/deck/${event.c?.value}${cardType[event.c?.suit]}.png`
          );
      });
    }
  }, [dataApi]);
  useEffect(() => {
    // console.log("playCardData=>", playCardData);
    if (playCardData) {
      playCardData.round.events.forEach((event: any) => {
        // event.c?.chosenChoice?.action == "newCard" &&
        //   setTexture(
        //     `/assets/deck/${event.c?.card?.value}${
        //       cardType[event.c?.card?.suit]
        //     }.png`
        //   );

        ["greaterOrEqual", "lessOrEqual", "newCard"].includes(
          event.c?.chosenChoice?.action
        ) &&
          setTexture(
            `/assets/deck/${event.c?.card?.value}${
              cardType[event.c?.card?.suit]
            }.png`
          );
      });
    }
  }, [playCardData]);
  // useEffect(() => {
  //   if (card) {
  //     deviceConfig.cardImg.texture = `/assets/${card}.webp`;
  //     setTexture(`/assets/${card}.webp`);
  //     console.log("responseCard=>", deviceConfig);
  //     setDeviceConfig(deviceConfig);
  //   }
  // }, [card]);
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite
            {...dataConfiguraton.cardImg}
            {...dataConfiguraton.cardImg[device]}
            app={app}
            textureUpdate={texture}
            container={parentConRef}
            state
          />
        </>
      )}
    </>
  );
};
export default Card;
