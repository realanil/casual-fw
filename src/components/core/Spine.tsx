// components/PixiCanvas.tsx

import { Spine } from "@pixi/spine-pixi";
import * as PIXI from "pixi.js";
// import { Spine } from "pixi-spine";
import React, { useEffect } from "react";

interface spineInterface {
  label: string;
  app: PIXI.Application; // Pass the PixiJS application instance
  container: any;
}
const PixiSpine: React.FC<spineInterface> = ({ app, container }) => {
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
    container.addChild(spineAnimation);
    // Play a specific animation
    const animationName = "mega_win_loop"; // Replace with your actual animation name
    spineAnimation.state.setAnimation(0, animationName, true);
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
