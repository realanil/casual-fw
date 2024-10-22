import * as PIXI from "pixi.js";
import { Assets, BitmapText } from "pixi.js";
import { useEffect, useRef } from "react";
interface BitmapProps {
  text: string;
  label: string;
  x?: number | undefined;
  y?: number | undefined;
  anchor?: number;
  style?: any; // Optional prop
  container: any;
  app: PIXI.Application; // Pass the PixiJS application instance
}

const Bitmap: React.FC<BitmapProps> = ({
  text,
  label,
  x,
  y,
  anchor,
  style,
  container,
  app,
}) => {
  // const appRef = useRef<Application | null>(null);
  const textRef: any = useRef<BitmapText | null>(null); // Store the current text object
  useEffect(() => {
    // Remove the previous text if it exists

    (async () => {
      await Assets.load("https://pixijs.com/assets/bitmap-font/desyrel.xml");
      // const chkLabel: any = app.stage.getChildByName(label);
      let bitmapFontText: any = textRef.current;
      if (!textRef.current) {
        bitmapFontText = new BitmapText({
          text: text,
          style: style,
        });
      }
      // bitmapFontText = textRef.current;
      // const bitmapFontText: any = new BitmapText({
      //   text: text,
      //   style: style,
      // });
      bitmapFontText.label = label;
      bitmapFontText.name = label;
      bitmapFontText.x = x;
      bitmapFontText.y = y;

      // console.log("chkLabel=>", bitmapFontText, textRef.current);
      if (textRef.current) {
        bitmapFontText.text = text;
      } else {
        container.addChild(bitmapFontText);
      }
      textRef.current = bitmapFontText;
      return () => {
        // console.log("destroy bitmap");
        textRef.current.destroy(); // Cleanup on unmount
        bitmapFontText.destroy(); // Cleanup on unmount
      };
    })();
  }, [x, y, label, style]);

  return null;
};
export default Bitmap;
