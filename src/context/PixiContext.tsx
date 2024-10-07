import * as PIXI from "pixi.js";
import React, { ReactNode, createContext, useContext, useRef } from "react";

interface PixiContextType {
  renderer: PIXI.Renderer | null;
  app?: any;
}

interface PixiProviderProps {
  children: ReactNode; // Accept children as a prop
  app: any;
}
const PixiContext = createContext<PixiContextType | undefined>(undefined);

// const PixiProvider: React.FC = ({ children }) => {
const PixiProvider: React.FC<PixiProviderProps> = ({ children, app }) => {
  const rendererRef = useRef<PIXI.Renderer | null>(null);
  return (
    <PixiContext.Provider value={{ renderer: rendererRef.current, app: app }}>
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
