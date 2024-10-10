
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
                // {
                //     alias: 'background',
                //     src: '/assets/bg.jpeg',
                // },
                // {
                //     alias: 'reel_fxPM',
                //     src: '/animations/reel_fx/reel_fx.png',
                // },
                // {
                //     alias: 'bar',
                //     src: 'load-bar.{png,webp}',
                // },
            ],
        },
        {
            name: 'intro-screen',
            assets: [
                {
                    alias: 'introScreen',
                    src: '/assets/introScreen.webp',
                },
                {
                    alias: 'bgL',
                    src: '/assets/introScreen.webp',
                }
            ],

        },
        {
            name: 'game-screen',
            assets: [
                {
                    alias: 'reel',
                    src: '/assets/reel.webp',
                },
                {
                    alias: 'rightArrow',
                    src: '/assets/rightArrow.png',
                },
                {
                    alias: 'cardImg',
                    src: '/assets/hand-cards-trump-spades.webp',
                },
                {
                    alias: 'reel_fx_spine',
                    src: '/animations/reel_fx/reel_fx.json',
                },
                {
                    alias: 'wild_skel',
                    src: '/animations/wild/wild.skel',
                },
                {
                    alias: 'wild_atlas',
                    src: '/animations/wild/wild.atlas',
                },
                {
                    alias: 'spineboyData',
                    src: '/assets/spineboy-pro.skel',
                },
                {
                    alias: 'spineboyAtlas',
                    src: '/assets/spineboy-pma.atlas',
                },
                // {
                //     alias: 'lemon',
                //     src: '/lemon/lemon.png',
                // },
                // {
                //     alias: 'lemonSkl',
                //     src: '/lemon/lemon.skel',
                // },
                // {
                //     alias: 'lemonAtlas',
                //     src: '/lemon/lemon.atlas',
                // },
                {
                    alias: 'lemonSkl',
                    src: '/win/win_texts.skel',
                },
                {
                    alias: 'lemonAtlas',
                    src: '/win/win_texts.atlas',
                }
            ],
            
        },
    ]
};
  export default manifest;
  