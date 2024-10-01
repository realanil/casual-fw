import { Application, BitmapText } from "pixi.js";
import { useRef } from "react";

interface BitmapProps {
  text: string;
  x?: number | undefined;
  y?: number | undefined;
  anchor?: number;
  style?: any; // Optional prop
}

const Bitmap: React.FC<BitmapProps> = ({ text, x, y, anchor, style }) => {
  const appRef = useRef<Application | null>(null);
  const textRef = useRef<BitmapText | null>(null); // Store the current text object
  // useEffect(() => {
  //   // Remove the previous text if it exists

  //   (async () => {
  //     await Assets.load("https://pixijs.com/assets/bitmap-font/desyrel.xml");

  //     const bitmapFontText: any = new BitmapText({
  //       text: text,
  //       style: style,
  //     });

  //     bitmapFontText.x = x;
  //     bitmapFontText.y = y;

  //     app.stage.addChild(bitmapFontText);
  //   })();
  // }, []);

  return null;
};
export default Bitmap;
