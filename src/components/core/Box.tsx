// components/Sprite.tsx
import * as PIXI from "pixi.js";
import React, { useEffect, useRef } from "react";

interface TextStyleProps {
  fontFamily?: string;
  dropShadow: {
    alpha?: number;
    angle?: number;
    blur?: number;
    color?: string;
    distance?: number;
  };
  fill?: string;
  fontSize?: number;
  fontWeight?: string;
}
interface textObj {
  x?: number; // X position
  y?: number; // Y position
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  fontStyle?: any; //TextStyleProps
}
interface TextProps {
  app: PIXI.Application; // Pass the PixiJS application instance
  title: string; // Path to the sprite texture
  TextStyle: textObj;
  container: any;
  label: string;
  cursor?: boolean; // Is the sprite interactive?
  x?: number;
  y?: number;
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  bgColor?: string;
  width?: string;
  height?: string;
  onclick?: (() => void) | undefined;
}

const Box: React.FC<TextProps> = ({
  app,
  title,
  TextStyle,
  container,
  label,
  cursor,
  x,
  y,
  scaleX,
  scaleY,
  bgColor,
  width,
  height,
  onclick,
}) => {
  const spriteRef = useRef<PIXI.Graphics | null>(null);
  // const { scaleX, scaleY, fontStyle } = TextStyle;
  useEffect(() => {
    const pt: any = app.stage.getChildByLabel(label);
    const button: any = new PIXI.Graphics();

    // Draw the button
    console.log("bgColor=>", container);
    button.beginFill(bgColor);
    button.drawRect(x, y, width ? width : 100, height ? height : 10);
    button.endFill();

    button.interactive = cursor;
    button.buttonMode = cursor;
    pt ? (pt.text = title) : container.addChild(button);

    spriteRef.current = button;
    cursor &&
      button.on("pointerover", () => {
        app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
      });
    cursor &&
      button.on("pointerout", () => {
        app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
      });
    // Attach the custom click event function
    button.on("pointerdown", (ev: MouseEvent) => {
      // var this: Window & typeof globalThis
      onclick && onclick(); // Call the passed function
    });
    return () => {
      // console.log("destroy sprite");
      button.destroy(); // Cleanup on unmount
    };
  }, [app, x, y, scaleX, scaleY, cursor, label, container, title, bgColor]);
  return null;
};

export default Box;
