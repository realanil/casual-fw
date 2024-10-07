import { usePixi } from "@/context/PixiContext";
import * as PIXI from "pixi.js";
import PixiSprite from "../core/PixiSprite";
import PixiText from "../core/PixiText";
// Function to create the intro screen
interface IntroContainerInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const IntroContainer: React.FC<IntroContainerInterface> = (props: any) => {
  const app = usePixi().app;
  const introContainer: any = new PIXI.Container();

  // Add a background
  /*const background = new PIXI.Graphics();
  background.beginFill(0x1099bb); // Light blue color
  background.drawRect(0, 0, app.renderer.width, app.renderer.height);
  background.endFill();
  introContainer.addChild(background);*/

  // Add a title
  /*const titleStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 48,
    fill: "white",
    align: "center",
  });

  const title = new PIXI.Text("Game Intro", titleStyle);
  title.x = app.renderer.width / 2;
  title.y = 100;
  title.anchor.set(0.5);
  introContainer.addChild(title);

  // Add a description
  const descriptionStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fill: "white",
    align: "center",
  });

  const description = new PIXI.Text(
    "Welcome to the game! Press Start to begin.",
    descriptionStyle
  );
  description.x = app.renderer.width / 2;
  description.y = 200;
  description.anchor.set(0.5);
  introContainer.addChild(description);

  // Create a "Start" button
  const startButton = new PIXI.Text("Continue", {
    fontFamily: "Arial",
    fontSize: 36,
    fill: "yellow",
    align: "center",
  });
  startButton.x = app.renderer.width / 2;
  startButton.y = 300;
  startButton.anchor.set(0.5);
  startButton.interactive = true;
  startButton.buttonMode = true;

  startButton.on("pointerover", () => {
    startButton.style.fill = "orange"; // Change color on hover
  });

  startButton.on("pointerout", () => {
    startButton.style.fill = "yellow"; // Reset color
  });

  startButton.on("pointerdown", () => {
    console.log("Game Started!"); // Replace with your game start logic

    app.stage.removeChild(introContainer); // Remove intro screen
    props.setIntroScreen(true);
  });

  introContainer.addChild(startButton);
  app.stage.addChild(introContainer);*/
  const clickContinueBtn = () => {
    const container = app.stage.getChildByName("introScreen");

    app.stage.removeChild(container); // Remove intro screen
    const introTitle = app.stage.getChildByName("introTitle");
    console.log("Game introTitle!", introTitle); // Replace with your game start logic
    app.stage.removeChild(introTitle);
    const continueBtn = app.stage.getChildByLabel("continueBtn");
    app.stage.removeChild(introTitle);
    app.stage.removeChild(continueBtn);
    props.setIntroScreen(true);
  };
  // Return the intro container
  //   return introContainer;
  console.log("object");
  const data = <PixiSprite label="introScreen" />;
  //   introContainer.stage.addChild(data);
  //   return app.stage.addChild(introContainer);
  return (
    <>
      <PixiSprite label="introScreen" />
      <PixiText
        text="Welcome to the game!"
        x={800}
        y={280}
        textSize={42}
        name="introTitle"
      />
      <PixiText
        text="Continue"
        x={950}
        y={600}
        textSize={24}
        name="continueBtn"
        cursor={true}
        onclick={clickContinueBtn}
      />
    </>
  );
};

// Call the function to create the intro container
export default IntroContainer;
