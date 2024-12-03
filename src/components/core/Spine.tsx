// components/PixiCanvas.tsx

import { Spine } from "@pixi/spine-pixi";
import React, { useEffect, useRef } from "react";

interface spineInterface {
  label: string;
  container: any;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  cursor?: boolean;
}
const PixiSpine: React.FC<spineInterface> = ({ container, label, x, y }) => {
  const spineRef = useRef<any | null>(null);
  useEffect(() => {
      const spine = Spine.from({
        skeleton: "boySpinSkel",
        atlas: "boySpinAtlas",
      });
      spine.label = label;
      spine.x = x;
      spine.y = y;
      spine.alpha = 0.02;
      // Add the spine to the main view.
      container.addChild(spine);
      spineRef.current = spine;
      // console.log("view=>", spine);
      spine.state.setAnimation(0, "run", true);
      return () => {
        // console.log("destroy spine");
        spine.destroy(); // Cleanup on unmount
      };
  }, [container, label, x, y]);

  return null;
};
// Load Spine assets using the shared loader

export default PixiSpine;
