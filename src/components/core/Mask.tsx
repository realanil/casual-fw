import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";
interface maskInterface {
  app: any;
  x: number;
  y: number;
  container: any;
  height?: number;
  width?: number;
  maskLeft?: number;
}
const Mask: React.FC<maskInterface> = ({
  app,
  x,
  y,
  height,
  width,
  maskLeft,
  container,
}) => {
  const spriteRef: any = useRef<PIXI.Sprite | null>(null);
  useEffect(() => {
    const mask = new PIXI.Graphics();
    // mask.beginFill(0xffffff, 2); // Fill color and alpha
    mask.rect(
      maskLeft ? maskLeft : 0,
      0,
      width ? width : 700,
      height ? height : 180
    ); // Use rec instead of drawRect
    // mask.drawRect(0, 0, 600, 150); // Adjust size as needed
    mask.endFill();
    mask.x = x;
    mask.y = y;
    // mask.width = 600;
    // console.log("mask=>", mask);
    spriteRef.current = mask;
    // console.log("container=>", container);
    container.addChild(mask);
    return () => {
      // console.log("destroy sprite");
      mask.destroy(); // Cleanup on unmount
    };
  }, [x, y, container]);

  return null;
};

export default Mask;
