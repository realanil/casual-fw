import React from "react";
import PixiSpine from "./core/PixiSpine";
import PixiSprite from "./core/PixiSprite";
import PixiText from "./core/PixiText";
import Card from "./game/card";
import CardAction from "./game/cardAction";
import CardReview from "./game/cardReview";
import IntroContainer from "./game/introContainer";
interface layoutInterface {
  introScreen: boolean;
  setIntroScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Layout: React.FC<layoutInterface> = (props) => {
  // const [introScreen, setIntroScreen] = useState<boolean>(false);
  return (
    <>
      {/* <Bitmap /> */}
      <PixiSprite label="background" />
      {!props.introScreen && (
        <IntroContainer
          introScreen={props.introScreen}
          setIntroScreen={props.setIntroScreen}
        />
      )}
      {props.introScreen && (
        <>
          <Card />
          <PixiSprite
            label="rightArrow"
            x={1010}
            y={200}
            scaleX={0.5}
            scaleY={0.5}
            cursor={true}
          />
          <PixiSpine label="reel_fx_spine"></PixiSpine>
          <PixiText
            text="Game Title"
            x={850}
            y={100}
            textSize={32}
            name="gameTitle"
          />

          <CardAction />
          <CardReview />
        </>
      )}

      {/* <PixiText text="Casual Game test" x={500} y={100} name="text_12" /> */}

      {/* <PixiText text="Casual Game 11" x={200} y={200} name={`text_3`} />
      <PixiText text="Bonanza" x={100} y={300} name={`text_5`} /> */}
      {/* <Bitmap
        text="Hello Pixi.js with Next.js and TypeScript! test123"
        x={400}
        y={300}
        anchor={0.5}
        style={textStyle} // Use the TextStyle object here
      ></Bitmap>
      <Bitmap
        text="Hello Pixi.js with Next.js and TypeScript! test123"
        x={400}
        y={100}
        anchor={0.5}
        style={textStyle} // Use the TextStyle object here
      ></Bitmap> */}
    </>
  );
};
export default Layout;
