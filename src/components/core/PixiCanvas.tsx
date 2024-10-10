// import { app } from "@/pages";

import { usePixi } from "@/context/PixiContext";
import { Application, Text } from "pixi.js";
import { useEffect, useRef } from "react";
import Layout from "../Layout";
// import Sprite from "./Sprite";
interface PixiCanvasProps {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PixiCanvas: React.FC<PixiCanvasProps> = (props: any) => {
  const app = usePixi().app;
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  const textRef = useRef<Text | null>(null);
  // console.log("appRef=>", appRef, canvasRef, textRef);
  useEffect(() => {
    const appConst = async () => {
      // appRef.current = await app.init({ background: "#1099bb", resizeTo: window });
      if (!canvasRef.current) return;
      // Initialize the application

      // Append the application canvas to the document body
      if (canvasRef.current) {
        // const p: any = document.getElementById("gameCover");
        // p && p.appendChild(app.canvas);
        canvasRef.current.appendChild(app.canvas);
        // loadAssets().then(() => {
        //   const spinBtn = Sprite.from("sprite1");
        //   console.log("ppppppppp=>", spinBtn);
        //   app.stage.addChild(spinBtn);
        // });
        // loadAssets()
        //   .then(() => {
        //     const sprite1 = new Sprite(getAsset("sprite1"));
        //     console.log("ppppppppp=>", getAsset("sprite1"));
        //     app.stage.addChild(spinBtn);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        // Add a container to center our sprite stack on the page
        /*const container = new Container({
          x: app.screen.width / 2,
          y: app.screen.height / 2,
        });

        app.stage.addChild(container);

        const sprites = [];
        let parent = container;
        for (let i = 0; i < 3; i++) {
          let wrapper = new Container();
          let sprite = Sprite.from("/background/bg.webp");
          sprite.anchor.set(0.5);
          wrapper.addChild(sprite);
          parent.addChild(wrapper);
          sprites.push(wrapper);
          parent = wrapper;
        }*/
      }

      // console.log("text name is=>", showtext);
      // Clean up the PixiJS app when the component is unmounted
      // return () => {
      //   app.destroy(true, { children: true });
      // };
      return () => {
        app.destroy(true, { children: true, texture: true, baseTexture: true });
      };
    };
    appConst();
  }, []);
  // const [spriteProps, setSpriteProps] = useState({
  //   texture: "/assets/introScreen.webp", // Initial sprite texture
  //   x: 100,
  //   y: 100,
  //   scaleX: 1,
  //   scaleY: 1,
  //   cursor: true,
  //   label: "BgImg",
  // });
  // const updateSprite = () => {
  //   setSpriteProps((prev) => ({
  //     ...prev,
  //     x: Math.random() * 100, // Update x position to a random value
  //     y: Math.random() * 220, // Update y position to a random value
  //     scaleX: Math.random() * 2, // Random scale X
  //     scaleY: Math.random() * 2, // Random scale Y
  //   }));
  // };
  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* <Sprite {...spriteProps} app={app} />
      <button onClick={updateSprite}>Update Sprite</button> */}
      <Layout
        introScreen={props.introScreen}
        setIntroScreen={props.setIntroScreen}
      />
    </div>
  );
};
export default PixiCanvas;
