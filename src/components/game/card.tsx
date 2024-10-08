import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Sprite from "../core/Sprite";

const spriteObj = {
  texture: "/assets/hand-cards-trump-spades.webp",
  x: 700,
  y: 200,
  scaleX: 1,
  scaleY: 1,
  label: "cardImg",
  cursor: true,
};
const Card: React.FC = () => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);

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
    setParentConRef(container);
  }, []);

  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite {...spriteObj} app={app} container={parentConRef} />
        </>
      )}
    </>
  );
};
export default Card;
