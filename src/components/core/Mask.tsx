import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";
interface maskInterface {
  app: any;
  x: number;
  y: number;
  container: any;
}
const Mask: React.FC<maskInterface> = ({ app, x, y, container }) => {
  const spriteRef: any = useRef<PIXI.Sprite | null>(null);
  useEffect(() => {
    const mask = new PIXI.Graphics();
    // mask.beginFill(0xffffff, 2); // Fill color and alpha
    mask.rect(0, 0, 700, 150); // Use rec instead of drawRect
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
