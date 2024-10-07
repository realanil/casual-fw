import PixiText from "../core/PixiText";

const CardAction: React.FC = () => {
  return (
    <>
      {/* <Bitmap /> */}

      <PixiText
        text="Lower and Same"
        x={500}
        y={400}
        textSize={12}
        name="leftButton"
        cursor={true}
      />
      <PixiText
        text="Higher and Same"
        x={1250}
        y={400}
        textSize={12}
        name="rightButton"
        cursor={true}
      />
    </>
  );
};
export default CardAction;
