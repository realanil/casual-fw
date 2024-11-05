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
}

interface TextProps {
  app: PIXI.Application; // Pass the PixiJS application instance
  title: string; // Path to the sprite texture
  container: any;
  label: string;
  cursor?: boolean; // Is the sprite interactive?
  bgHeight?: number;
  x: number; // X position
  y: number; // Y position
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  fontStyle?: TextStyleProps; //TextStyleProps
  onclick?: (() => void) | undefined;
}

const Button: React.FC<TextProps> = ({
  app,
  title,
  container,
  label,
  cursor,
  bgHeight,
  x,
  y,
  scaleX,
  scaleY,
  fontStyle,
  onclick,
}) => {
  const spriteRef = useRef<PIXI.Graphics | null>(null);
  useEffect(() => {
    const pt: any = app.stage.getChildByLabel(label);
    const button: any = new PIXI.Graphics();

    // Draw the button
    button.beginFill("#2d3663");
    button.drawRect(x - 10, y - 5, 200, bgHeight ? bgHeight : 50);
    button.endFill();
    // Create sprite on mount
    const skewStyle = new PIXI.TextStyle(fontStyle);
    const skewText: any = new PIXI.Text({
      text: title,
      style: skewStyle,
    });

    // console.log("useEffect sprite", container);
    skewText.label = label;
    skewText.x = x;
    skewText.y = y + 5;
    skewText.scale.set(scaleX, scaleY);
    button.interactive = cursor;
    button.buttonMode = cursor;

    // app.stage.addChild(sprite); // Add sprite to the stage
    /*container && container.children.length > 0
      ? container.children[0].addChild(sprite)
      : container.addChild(sprite); // Add sprite to the stage*/
    button.addChild(skewText);
    pt ? (pt.text = title) : container.addChild(button);

    spriteRef.current = button;
    cursor && (skewText.interactive = true);
    cursor &&
      button.on("pointerover", () => {
        app.renderer.canvas.style.cursor = "pointer"; // Change to pointer cursor
      });
    cursor &&
      button.on("pointerout", () => {
        app.renderer.canvas.style.cursor = "default"; // Change back to default cursor
      });
    // Attach the custom click event function
    button.on("pointerdown", () => {
      // console.log("Text clicked!");
      onclick && onclick(); // Call the passed function
    });
    // Add sprite to the stage of the PixiJS application
    // Note: This requires access to the app instance
    // console.log("skewText=>", skewText);
    return () => {
      // console.log("destroy sprite");
      button.destroy(); // Cleanup on unmount
    };
  }, [app, x, y, scaleX, scaleY, cursor, label, container, title, bgHeight]);
  return null;
};

export default Button;
