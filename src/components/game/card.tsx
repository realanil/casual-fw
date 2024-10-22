import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Sprite from "../core/Sprite";
const dataConfiguraton: any = {
  mobile: {
    cardImg: {
      texture: "/assets/0.webp",
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      label: "cardImg",
      cursor: false,
    },
  },
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
    cardImg: {
      texture: "/assets/deck/8C.png",
      x: -50,
      y: -250,
      scaleX: 1,
      scaleY: 1,
      label: "cardImg",
      cursor: false,
    },
  },
};
interface cardsObject {
  [key: string]: string;
}
const Card: React.FC = () => {
  const { app, device } = usePixi();
  const [cardType] = useState<cardsObject>({
    clubs: "C",
    diamonds: "D",
    hearts: "H",
    spades: "S",
  });
  const [deviceConfig, setDeviceConfig] = useState(dataConfiguraton[device]);
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  const dataApi: any = useAppSelector((state) => state.bet.responseCard);
  // const [card, setCard] = useState<string>("0");
  const [texture, setTexture] = useState<string>("/assets/deck/8C.png");
  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "CardContainer",
      null
    );
    const container = continerRef.current;
    if (deviceConfig?.container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }
    setParentConRef(container);
  }, [deviceConfig]);
  useEffect(() => {
    console.log("action=>", dataApi);
    if (dataApi) {
      dataApi.round.events.forEach((event: any) => {
        event.c?.chosenChoice?.action == "newCard" &&
          setTexture(
            `/assets/deck/${event.c?.card?.value}${
              cardType[event.c?.card?.suit]
            }.png`
          );

        event.c?.chosenChoice?.action == "lessOrEqual" &&
          setTexture(
            `/assets/deck/${event.c?.card?.value}${
              cardType[event.c?.card?.suit]
            }.png`
          );
      });
    }
  }, [dataApi]);
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
            {...deviceConfig?.cardImg}
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
