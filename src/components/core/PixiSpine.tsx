// components/PixiCanvas.tsx

import { usePixi } from "@/context/PixiContext";
import { Spine } from "@pixi/spine-pixi";
// import { Spine } from "pixi-spine";
import React, { useEffect } from "react";

interface spineInterface {
  label: string;
}
const PixiSpine: React.FC<spineInterface> = ({ label }) => {
  const app = usePixi().app;
  /*
  const loadContent = app.stage.getChildByLabel(label);
  if (loadContent) {
    loadContent.label = label;
  } else {
    const img = Spine.from({
      skeleton: "anticipationSkel",
      atlas: "anticipationAtlas",
  });
    img.label = label;
    app.stage.addChild(img);
  }*/

  useEffect(() => {
    const spineAnimation: Spine = Spine.from({
      skeleton: "lemonSkl",
      atlas: "lemonAtlas",
      scale: 2,
    });
    console.log("spineAnimation=>", spineAnimation);
    // app.stage.addChild(spineAnimation);
    // Play a specific animation
    const animationName = "mega_win_loop"; // Replace with your actual animation name
    // testSymbol1.state.setAnimation(0, animationName, true);
    // Play the default animation
    // spineAnimation.state.setAnimation(0, animationName, true); // Use your actual animation name

    // Update the animation in the ticker
    // app.ticker.add(() => {
    //   spineAnimation.update(app.ticker.deltaMS / 1000);
    // });

    // Create object to store sprite sheet data
  }, []);

  return null;
};
// Load Spine assets using the shared loader

export default PixiSpine;
