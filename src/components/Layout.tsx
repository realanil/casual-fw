import PixiSprite from "./core/PixiSprite";
import PixiText from "./core/PixiText";

const Layout: React.FC = () => {
  return (
    <>
      {/* <Bitmap /> */}
      <PixiSprite label="background" />
      <PixiText text="Casual Game test" x={500} y={100} name="text_2" />
      <PixiText text="Casual Game test" x={500} y={100} name="text_12" />

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
