// components/Sprite.tsx
import * as PIXI from "pixi.js";
import React, { useEffect, useRef } from "react";

interface SpriteProps {
  app: PIXI.Application; // Pass the PixiJS application instance

  texture: string; // Path to the sprite texture
  x: number; // X position
  y: number; // Y position
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  cursor?: boolean; // Is the sprite interactive?
  label: string;
  container: any;
  onclick?: (() => void) | undefined;
  textureUpdate?: string | undefined;
}

const Sprite: React.FC<SpriteProps> = ({
  app,
  texture,
  x,
  y,
  scaleX,
  scaleY,
  cursor,
  label,
  container,
  onclick,
  textureUpdate,
}) => {
  const spriteRef = useRef<PIXI.Sprite | null>(null);
  // console.log("textureUpdate=>", textureUpdate);
  useEffect(() => {
    // console.log("textureUpdate=>", textureUpdate, texture);
    // Create sprite on mount
    // console.log("useEffect sprite", container);
    const sprite = PIXI.Sprite.from(textureUpdate ? textureUpdate : texture);
    // console.log("hello test...", sprite, spriteRef);
    sprite.label = label;
    sprite.x = x;
    sprite.y = y;
    // console.log("object=>", app.screen.width);
    // sprite.x = app.screen.width / 2;
    // sprite.y = app.screen.height / 2;
    sprite.scale.set(scaleX, scaleY);
    cursor && (sprite.interactive = true);
    cursor &&
      sprite.on("pointerover", () => {
        app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
      });
    cursor &&
      sprite.on("pointerout", () => {
        app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
      });
    // app.stage.addChild(sprite); // Add sprite to the stage
    /*container && container.children.length > 0
      ? container.children[0].addChild(sprite)
      : container.addChild(sprite); // Add sprite to the stage*/
    container.addChild(sprite);

    spriteRef.current = sprite;
    // Attach the custom click event function
    sprite.on("pointerdown", () => {
      onclick && onclick(); // Call the passed function
    });
    // Add sprite to the stage of the PixiJS application
    // Note: This requires access to the app instance

    return () => {
      // console.log("destroy sprite");
      sprite.destroy(); // Cleanup on unmount
    };
  }, [
    app,
    texture,
    x,
    y,
    scaleX,
    scaleY,
    cursor,
    label,
    container,
    textureUpdate,
  ]);
  return null;
};

export default Sprite;
