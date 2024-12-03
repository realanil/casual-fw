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
      let timeout: NodeJS.Timeout;
      const throttledResize = () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          handleResize();
        }, 0); // 200ms throttle interval
      };
      window.addEventListener("resize", throttledResize);
      setTimeout(() => {
        handleResize();
      }, 0);
      return () => {
        // app.destroy(true, { children: true, texture: true, baseTexture: true });
        window.removeEventListener("resize", throttledResize);
        if (timeout) {
          clearTimeout(timeout);
        }
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
      const { width, height } = checkMobileOrDesktop();
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      // const width = window.outerWidth;
      // const height = window.outerHeight;
      appRef.current.renderer.resize(width, height);
      // console.log("appRef=>", appRef);
      // Scale all children to fit the new canvas size
      // const scale = Math.min(width / 800, height / 600); // Adjust based on your design
      const scale1 = Math.min(width / 1170, height / 940); // Adjust based on your design

      const isLandscape = window.innerWidth > window.innerHeight;
      const scale = Math.min(
        window.innerWidth / (isLandscape ? 1920 : 1080),
        window.innerHeight / (isLandscape ? 1080 : 1920)
      );
      // const isLandscape = width > height;

      // const scale = Math.min(
      //   width / (isLandscape ? 1920 : 1080),
      //   height / (isLandscape ? 1080 : 1920)
      // );
      appRef.current.stage.children.forEach((child: any) => {
        if (width > length && window.innerWidth >= 315) {
          // console.log("isLandscape 7899=>", isLandscape, scale);
          scale > 0.7
            ? child.scale.set(scale)
            : isLandscape && window.innerHeight <= 500
            ? child.scale.set(scale)
            : child.scale.set(0.7);
          if (!props.introScreen && window.innerWidth <= 963 && !isLandscape) {
            introScreenMode(false);
          } else if (!props.introScreen) {
            introScreenMode(true);
          }
        } else {
          // console.log("isLandscape=>", isLandscape, scale);
          child.scale.set(scale * 2);
        }

        // console.log(
        //   "height / 3=>",
        //   scale,
        //   height / 3,
        //   height / 3.9,
        //   window.innerHeight,
        //   window.innerWidth,
        //   window.outerWidth,
        //   window.outerHeight,
        //   isLandscape,
        //   scale1
        // );
        child.position.set(width / 2, height / 2); // Centering
        // child.children.forEach((child: any) => {
        //   child.scale.set(scale);
        //   child.position.set(width / 2, height / 2); // Centering
        // });
      });
    }
  };
  const introScreenMode = (visible: boolean) => {
    // if (
    //   appRef.current.stage.children[0].children[0] &&
    //   appRef.current.stage.children[0].children[0].label == "intro-0"
    // ) {
    //   appRef.current.stage.children[0].children[0].visible = visible;
    // }
    // if (
    //   appRef.current.stage.children[0].children[2] &&
    //   appRef.current.stage.children[0].children[2].label == "intro-2"
    // ) {
    //   appRef.current.stage.children[0].children[2].visible = visible;
    // }
  };
  const checkMobileOrDesktop = () => {
    const userAgent = window.navigator.userAgent;
    const isCheck = /Mobi|Android/i.test(userAgent) ? "mobile" : "desktop";
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (isCheck == "mobile") {
      width = window.outerWidth;
      height = window.outerHeight;
    }
    return { width, height };
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
