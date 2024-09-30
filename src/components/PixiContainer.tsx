import { app } from "@/pages";
import { Application, Text, TextStyle } from "pixi.js";
import { useEffect, useRef } from "react";
import PixiText from "./PixiText";

const PixiContainer: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  const textRef = useRef<Text | null>(null);
  console.log("appRef=>", appRef, canvasRef, textRef);
  useEffect(() => {
    const appConst = async () => {
      // appRef.current = await app.init({ background: "#1099bb", resizeTo: window });
      if (!canvasRef.current) return;
      // Initialize the application

      // Append the application canvas to the document body
      if (canvasRef.current) {
        // const p: any = document.getElementById("gameCover");
        // p && p.appendChild(app.canvas);
        canvasRef.current.appendChild(app.canvas);
      }

      // console.log("text name is=>", showtext);
      // Clean up the PixiJS app when the component is unmounted
      return () => {
        app.destroy(true, { children: true });
      };
    };
    appConst();
  }, []);
  const textStyle: any = new TextStyle({
    fontSize: 15,
    fill: "#ffffff",
    align: "center",
    // Add any other properties you need
  });
  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* <Bitmap /> */}
      <PixiText text="Casual Game test" x={500} y={100} name="text_2" />
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
    </div>
  );
};
export default PixiContainer;
