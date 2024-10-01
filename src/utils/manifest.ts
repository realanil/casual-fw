
// const manifest: AssetsManifest = {bundles:[
//     { name: 'sprite1', AssetsBundle: '/background/bg.webp' },
//     { name: 'sprite2', url: '/path/to/sprite2.png' },
//     // Add more assets as needed
//   ]};
  /*export const manifest: AssetsManifest = {
    bundles: [
        // {
        //     name: 'load-screen',
        //     assets: [
        //     ]
        // },
        {
            name: 'bg',
            assets: [
                {
                    alias: 'sprite1',
                    src: '/background/bg.webp',
                    
                },  
            ]
        }
    ]
};*/
const manifest = {
    bundles: [
        {
            name: 'load-screen',
            assets: [
                {
                    alias: 'background',
                    src: '/background/bg.webp',
                },
                // {
                //     alias: 'bar',
                //     src: 'load-bar.{png,webp}',
                // },
            ],
        },
        // {
        //     name: 'game-screen',
        //     assets: [
        //         {
        //             alias: 'character',
        //             src: 'robot.png',
        //         },
        //         {
        //             alias: 'enemy',
        //             src: 'bad-guy.png',
        //         },
        //     ],
        // },
    ]
};
  export default manifest;
  