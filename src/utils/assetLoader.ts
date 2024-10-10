import { Assets } from 'pixi.js';
import manifest from './manifest'; // Adjust the path as needed
let isAssetsLoaded = false;
export const loadAssets = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    // if (isAssetsLoaded) {
    //   resolve();
    //   return;
    // }
    await Assets.init({ manifest: manifest });

    // Black js magic to extract the bundle names into an array.
    // const bundleNames = manifest.bundles.map(b => b.name);
    await Assets.loadBundle('load-screen', onProgress).then((onProgress)=>{
      // console.log("onProgress=>", onProgress)
    });
    await Assets.loadBundle('intro-screen', onProgress).then((onProgress)=>{
      // console.log("onProgress=>", onProgress)
    });
    await Assets.loadBundle('game-screen', onProgress).then((onProgress)=>{
      // console.log("game-screen onProgress=>", onProgress)
    });
    // console.log("loadScreenAssets=>", loadScreenAssets)
    // Bundles can be loaded in the background too!
    // await Assets.backgroundLoadBundle(bundleNames);
    resolve();
   /* Assets.init({ manifest }).then(() => {
      console.log("manifest=>", manifest)
      isAssetsLoaded = true; // Mark as loaded
      resolve();
    }).catch((error) => {
      reject(new Error(`Failed to load assets: ${error}`));
    });*/
  });
};
const onProgress = (res: any) => {
  // console.log("res=>", res)
}
export const getAsset = (name: string) => {
  return Assets.get(name);
};
