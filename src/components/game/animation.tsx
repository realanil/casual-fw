import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Spine from "../core/Spine";

const spriteObj = {
  texture: "/assets/hand-cards-trump-spades.webp",
  x: 700,
  y: 200,
  scaleX: 1,
  scaleY: 1,
  label: "cardImg",
  cursor: true,
};
const Animation: React.FC = () => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);

  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "Animation",
      null
    );
    const container = continerRef.current;
    setParentConRef(container);
  }, []);

  return (
    <>
      {!parentConRef ? null : (
        <>
          <Spine {...spriteObj} app={app} container={parentConRef} />
        </>
      )}
    </>
  );
};
export default Animation;
