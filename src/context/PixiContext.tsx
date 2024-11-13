import * as PIXI from "pixi.js";
import React, { ReactNode, createContext, useContext, useRef } from "react";

interface PixiContextType {
  renderer: PIXI.Renderer | null;
  app?: any;
  appRef?: any;
  device: string;
}

interface PixiProviderProps {
  children: ReactNode; // Accept children as a prop
  app: any;
  appRef: any;
  device: string;
}
const PixiContext = createContext<PixiContextType | undefined>(undefined);

// const PixiProvider: React.FC = ({ children }) => {
const PixiProvider: React.FC<PixiProviderProps> = ({
  children,
  app,
  appRef,
  device,
}) => {
  const rendererRef = useRef<PIXI.Renderer | null>(null);
  // const { device, orientation } = useWindowMode();
  // console.log("useWindowMode=>", device, orientation);
  return (
    <PixiContext.Provider
      value={{
        renderer: rendererRef.current,
        app: app,
        appRef: appRef,
        device: device,
      }}
    >
      {children}
    </PixiContext.Provider>
  );
};

export const usePixi = () => {
  const context = useContext(PixiContext);
  if (!context) {
    throw new Error("usePixi must be used within a PixiProvider");
  }
  return context;
};

export default PixiProvider;
