import Bitmap from "@/components/core/Bitmap";
import Spine from "@/components/core/Spine";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

const spineObj = {
  x: 500,
  y: 800,
  scaleX: 1,
  scaleY: 1,
  label: "spineAnimation",
  cursor: true,
};

const spineObj2 = {
  x: 800,
  y: 800,
  scaleX: 1,
  scaleY: 1,
  label: "spineAnimation",
  cursor: true,
};

const styles = {
  fontFamily: "Desyrel",
  fontSize: 55,
  align: "left",
};
const bitmapObj = {
  text: "Hello Bonanza 123455!",
  x: 400,
  y: 300,
  anchor: 0.5,
  style: styles, // Use the TextStyle object here
  label: "bitmapTxt",
};

const bitmapObj2 = {
  text: "Hello !",
  x: 700,
  y: 500,
  anchor: 0.5,
  style: styles, // Use the TextStyle object here
  label: "bitmapTxt2",
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
          <Spine {...spineObj} container={parentConRef} />
          <Bitmap {...bitmapObj} container={parentConRef} app={app} />
          {/* <Bitmap {...bitmapObj2} container={parentConRef} app={app} /> */}
          <Spine {...spineObj2} container={parentConRef} />
        </>
      )}
    </>
  );
};
export default Animation;
