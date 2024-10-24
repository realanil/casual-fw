import { usePixi } from "@/context/PixiContext";
import * as PIXI from "pixi.js";
import React from "react";
interface spriteInterface {
  label: string;
  x?: number | undefined;
  y?: number | undefined;
  anchor?: number;
  scaleX?: number;
  scaleY?: number;
  cursor?: boolean;
}

// interface SpriteProps {
//   spriteObj: {
//     label: string;
//     x?: number;
//     y?: number;
//     scaleX?: number;
//     scaleY?: number;
//     cursor?: boolean;
//   };
// }
const PixiSprite: React.FC<spriteInterface> = (props) => {
  const { label, x, y, scaleX, scaleY, cursor } = props;
  // console.log("PixiSprite=>", props);
  const app = usePixi().app;
  const container: any = new PIXI.Container();
  container.label = label; // Assign a name to the container

  const loadContent = app.stage.getChildByLabel(label);
  if (loadContent) {
    loadContent.label = label;
    loadContent.x = x ? x : 0;
    loadContent.y = y ? y : 0;
    loadContent.scale.x = scaleX ? scaleX : 1;
    loadContent.scale.y = scaleY ? scaleY : 1;
    if (label == "introScreen") {
      loadContent.width = 1920;
      loadContent.height = 945;
    }
  } else {
    const sprite: any = PIXI.Sprite.from(label);
    // console.log("img=>", sprite);
    sprite.label = label;
    sprite.x = x ? x : 0;
    sprite.y = y ? y : 0;
    sprite.scale.x = scaleX ? scaleX : 1;
    sprite.scale.y = scaleY ? scaleY : 1;
    sprite.interactive = true;
    sprite.buttonMode = true; // Change the cursor to a pointer on hover
    cursor &&
      sprite.on("pointerdown", () => {
        // console.log("Sprite clicked!");
        // Add any click handling logic here
      });

    cursor &&
      sprite.on("pointerover", () => {
        sprite.tint = 0xaaaaaa; // Example of changing color on hover
      });

    cursor &&
      sprite.on("pointerout", () => {
        sprite.tint = 0xffffff; // Reset color on mouse out
      });

    // app.stage.addChild(sprite);
    container.addChild(sprite);
    // app.stage.addChild(container);
    cursor &&
      sprite.on("pointerover", () => {
        app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
      });
    sprite.on("pointerout", () => {
      app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
    });
    if (label == "introScreen") {
      sprite.width = 1920;
      sprite.height = 945;
    }
  }

  // });
  // const texturePromise = PIXI.Assets.load("/background/bg.webp");

  //   // When the promise resolves, we have the texture!
  /*exturePromise.then((resolvedTexture) => {
    console.log("resolvedTexture=>", resolvedTexture);
    // create a new Sprite from the resolved loaded Texture
    const bunny = PIXI.Sprite.from(resolvedTexture);

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.stage.addChild(bunny);
  });*/
  return container;
  // return null;
};

export default PixiSprite;
