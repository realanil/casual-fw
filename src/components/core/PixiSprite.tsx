// components/PixiCanvas.tsx
import { app } from "@/pages";
import * as PIXI from "pixi.js";
import React from "react";
interface spriteInterface {
  label: string;
}
const PixiSprite: React.FC<spriteInterface> = ({ label }) => {
  /* const pixiContainer = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  // Load an image and add it to the stage
  const texture = PIXI.Texture.from("/background/bg.webp"); // Replace with your image path
  const sprite = new PIXI.Sprite(texture);

  // Center the sprite's anchor point
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  // Add the sprite to the stage
  app.stage.addChild(sprite);*/

  // Use the loader to load assets
  // Start loading right away and create a promise

  // loadAssets().then(async () => {
  // const assets = await Assets.loadBundle("load-screen");
  const loadContent = app.stage.getChildByLabel(label);
  if (loadContent) {
    loadContent.label = label;
  } else {
    const img = PIXI.Sprite.from(label);
    img.label = label;
    app.stage.addChild(img);
  }

  console.log("assets=>");
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

  return null;
};

export default PixiSprite;
