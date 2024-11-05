import Sprite from "@/components/core/Sprite";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

const spriteObj = {
  texture: "/assets/introScreen.webp",
  x: 0,
  y: 10,
  scaleX: 1,
  scaleY: 1,
  label: "bgL19",
  cursor: true,
};
const spriteObj2 = {
  texture: "/assets/rightArrow.png",
  x: 201,
  y: 350,
  scaleX: 1,
  scaleY: 1,
  label: "arrow1656",
  cursor: true,
};
const Background: React.FC = () => {
  const app = usePixi().app;
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  //   console.log("hello ...");
  //   Container(PIXI.Container);

  const containerChildRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "BG",
      null
    );
    // console.log("data.containerRef=>", continerRef.current);
    const container = continerRef.current;
    // console.log("container=>", container);
    /*const { parentContainer, childContainerRef } = createContainer(
      PIXI,
      app,
      containerChildRef,
      "containerChild",
      container
    );
    console.log("continerChildRef=>", childContainerRef, parentContainer);*/
    // containerChildRef = childContainerRef.current;
    // setParentConRef(parentContainer);
    setParentConRef(container);
    // setParentConRef(parentContainer.children[2]);

    return () => {
      //   console.log("unmount=>", container);
      // Cleanup on unmount
      //   app.stage.removeChild(containerChild);
      //   containerChild.destroy({ children: false }); // Destroy container and its children
    };
  }, [app]);
  //   console.log("unmount 123=>", spriteObj, app, containerChildRef, parentConRef);
  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite {...spriteObj} app={app} container={parentConRef} />
          <Sprite {...spriteObj2} app={app} container={parentConRef} />
        </>
      )}
      {/* <Sprite {...spriteObj2} app={app} container={containerChildRef} /> */}
    </>
  );
};
export default Background;
