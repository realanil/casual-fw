// import { app } from "@/pages";

import { usePixi } from "@/context/PixiContext";
import GameManager from "@/scenes/GameManager";
import { useEffect, useRef } from "react";
// import Sprite from "./Sprite";
interface PixiCanvasProps {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PixiCanvas: React.FC<PixiCanvasProps> = (props: any) => {
  const app = usePixi().app;
  const appRef = usePixi().appRef;
  appRef.current = app;
  const canvasRef = useRef<HTMLDivElement>(null);
  // const appRef = useRef<Application | null>(null);
  // appRef.current = app;
  useEffect(() => {
    const appConst = async () => {
      // appRef.current = await app.init({ background: "#1099bb", resizeTo: window });
      if (!canvasRef.current) return;
      // Initialize the application

      // Append the application canvas to the document body
      if (canvasRef.current) {
        // const p: any = document.getElementById("gameCover");
        // p && p.appendChild(app.canvas);
        // canvasRef.current.appendChild(app.canvas);
        canvasRef.current.appendChild(appRef.current.canvas);
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
      window.addEventListener("resize", handleResize);
      return () => {
        // app.destroy(true, { children: true, texture: true, baseTexture: true });
        window.removeEventListener("resize", handleResize);
        appRef.current?.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true,
        });
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

  // Handle window resize
  const handleResize = () => {
    // console.log("appRef=>", appRef);
    if (appRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      appRef.current.renderer.resize(width, height);
      // console.log("appRef=>", appRef);
      // Scale all children to fit the new canvas size
      // const scale = Math.min(width / 800, height / 600); // Adjust based on your design
      const scale = Math.min(width / 1170, height / 940); // Adjust based on your design
      appRef.current.stage.children.forEach((child: any) => {
        child.scale.set(scale);
        // console.log(
        //   "height / 3=>",
        //   height / 3,
        //   height / 3.9,
        //   window.innerHeight
        // );
        child.position.set(width / 2, height / 2); // Centering
        // child.children.forEach((child: any) => {
        //   child.scale.set(scale);
        //   child.position.set(width / 2, height / 2); // Centering
        // });
      });
    }
  };
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
      <GameManager
        introScreen={props.introScreen}
        setIntroScreen={props.setIntroScreen}
      />
    </div>
  );
};
export default PixiCanvas;
