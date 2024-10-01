// import React, {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { loadAssets } from "../utils/assetLoader";

// const AssetContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });
// interface PixiProviderProps {
//   children: ReactNode; // Accept children as a prop
// }
// const AssetProvider: React.FC<PixiProviderProps> = ({ children }) => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     loadAssets().then(() => setIsLoaded(true));
//   }, []);

//   return (
//     <AssetContext.Provider value={{ isLoaded }}>
//       {children}
//     </AssetContext.Provider>
//   );
// };
// export default AssetProvider;
// export const useAssets = () => useContext(AssetContext);
