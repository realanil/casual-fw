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
}) => {
  const spriteRef = useRef<PIXI.Sprite | null>(null);

  useEffect(() => {
    // Create sprite on mount
    // console.log("useEffect sprite", container);
    const sprite = PIXI.Sprite.from(texture);
    // console.log("hello test...", sprite, spriteRef);
    sprite.label = label;
    sprite.x = x;
    sprite.y = y;
    sprite.scale.set(scaleX, scaleY);
    sprite.interactive = cursor;
    // app.stage.addChild(sprite); // Add sprite to the stage
    /*container && container.children.length > 0
      ? container.children[0].addChild(sprite)
      : container.addChild(sprite); // Add sprite to the stage*/
    container.addChild(sprite);

    spriteRef.current = sprite;

    // Add sprite to the stage of the PixiJS application
    // Note: This requires access to the app instance

    return () => {
      // console.log("destroy sprite");
      sprite.destroy(); // Cleanup on unmount
    };
  }, [app, texture, x, y, scaleX, scaleY, cursor, label, container]);
  return null;
};

export default Sprite;
