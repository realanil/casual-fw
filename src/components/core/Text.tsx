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
  x: number; // X position
  y: number; // Y position
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  cursor?: boolean; // Is the sprite interactive?
  fontStyle?: TextStyleProps;
  onclick?: (() => void) | undefined;
}
interface TextProps {
  app: PIXI.Application; // Pass the PixiJS application instance
  title: string; // Path to the sprite texture
  TextStyle: textObj;
  container: any;
  label: string;
}

const Text: React.FC<TextProps> = ({
  app,
  title,
  TextStyle,
  container,
  label,
}) => {
  const spriteRef = useRef<PIXI.Sprite | null>(null);
  const { x, y, scaleX, scaleY, cursor, fontStyle, onclick } = TextStyle;
  useEffect(() => {
    const pt: any = app.stage.getChildByLabel(label);
    // Create sprite on mount
    const skewStyle = new PIXI.TextStyle(fontStyle);
    const skewText: any = new PIXI.Text({
      text: title,
      style: skewStyle,
    });
    // console.log("useEffect sprite", container);
    skewText.label = label;
    skewText.x = x;
    skewText.y = y;
    skewText.scale.set(scaleX, scaleY);
    skewText.interactive = cursor;
    // app.stage.addChild(sprite); // Add sprite to the stage
    /*container && container.children.length > 0
      ? container.children[0].addChild(sprite)
      : container.addChild(sprite); // Add sprite to the stage*/
    pt ? (pt.text = title) : container.addChild(skewText);

    spriteRef.current = skewText;
    cursor && (skewText.interactive = true);
    cursor &&
      skewText.on("pointerover", () => {
        app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
      });
    cursor &&
      skewText.on("pointerout", () => {
        app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
      });
    // Attach the custom click event function
    skewText.on("pointerdown", () => {
      // console.log("Text clicked!");
      onclick && onclick(); // Call the passed function
    });
    // Add sprite to the stage of the PixiJS application
    // Note: This requires access to the app instance
    // console.log("skewText=>", skewText);
    return () => {
      // console.log("destroy sprite");
      skewText.destroy(); // Cleanup on unmount
    };
  }, [app, x, y, scaleX, scaleY, cursor, label, container, title]);
  return null;
};

export default Text;
