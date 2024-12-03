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
  desc?: string;
}

interface TextProps {
  app: PIXI.Application; // Pass the PixiJS application instance
  title: string; // Path to the sprite texture
  container: any;
  label: string;
  cursor?: boolean; // Is the sprite interactive?
  bgHeight?: number;
  bgWidth?: number;
  x: number; // X position
  y: number; // Y position
  scaleX: number; // Scale in X direction
  scaleY: number; // Scale in Y direction
  fontStyle?: TextStyleProps; //TextStyleProps
  desc?: string;
  x_desc?: string;
  y_desc?: string;
  visible?: boolean;
  labelMain?: string;
  color?: string;
  childAdd?: any;
  onclick?: (() => void) | undefined;
}

const BoxWithTitileAndDesc: React.FC<TextProps> = ({
  app,
  title,
  container,
  label,
  cursor,
  bgHeight,
  bgWidth,
  x,
  y,
  scaleX,
  scaleY,
  fontStyle,
  desc,
  x_desc,
  y_desc,
  visible,
  labelMain,
  color,
  childAdd,
  onclick,
}) => {
  const spriteRef = useRef<PIXI.Graphics | null>(null);
  useEffect(() => {
    const pt: any = app.stage.getChildByLabel(label);
    const button: any = new PIXI.Graphics();
    button.visible = visible;
    button.label = labelMain ? labelMain : title;
    // Draw the button
    button.beginFill(color ? color : "#2d3663");
    button.x = x;
    button.y = y;
    button.drawRect(
      x - 10,
      y - 5,
      bgWidth ? bgWidth : 200,
      bgHeight ? bgHeight : 50
    );
    // button.x = x;
    // button.x = -button.width;
    button.endFill();
    // Create sprite on mount
    const skewStyle = new PIXI.TextStyle(fontStyle);
    button.interactive = cursor;
    button.buttonMode = cursor;

    // app.stage.addChild(sprite); // Add sprite to the stage
    /*container && container.children.length > 0
      ? container.children[0].addChild(sprite)
      : container.addChild(sprite); // Add sprite to the stage*/

    //!SECTION
    const skewStyle1 = skewStyle;
    // skewStyle1.align = "center";
    const skewText_1: any = new PIXI.Text({
      text: title,
      style: skewStyle1,
    });
    skewText_1.label = label;
    skewText_1.x = x + 120;
    skewText_1.y = y + 5;
    skewText_1.scale.set(scaleX, scaleY);
    button.addChild(skewText_1);
    // childAdd && button.addChild(childAdd);
    if (desc) {
      //!SECTION
      const fontStyle_2: any = { ...fontStyle };
      fontStyle_2.align = "left";
      fontStyle_2.fontSize = 20;
      const skewStyle = new PIXI.TextStyle(fontStyle_2);
      const skewText_2: any = new PIXI.Text({
        text: desc,
        style: skewStyle,
      });
      skewText_2.label = `${label}-desc`;
      skewText_2.x = x_desc;
      skewText_2.y = y_desc;
      skewText_2.scale.set(scaleX, scaleY);
      button.addChild(skewText_2);
      //!SECTION
    }

    pt ? (pt.text = title) : container.addChild(button);

    spriteRef.current = button;
    cursor && (skewText_1.interactive = true);
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

export default BoxWithTitileAndDesc;
