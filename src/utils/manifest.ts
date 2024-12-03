
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
            name: 'sound',
            assets: [
                {
                    alias: 'soundAll',
                    src: '/sound/sound.mp3',
                    
                },
            ]
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
                    alias: 'leftAction',
                    src: '/assets/downArrow.png',
                },
                {
                    alias: 'rightAction',
                    src: '/assets/upArrow.png',
                },
                {
                    alias: '1C',
                    src: '/assets/deck/1C.png',
                },
                {
                    alias: '1D',
                    src: '/assets/deck/1D.png',
                },
                {
                    alias: '1H',
                    src: '/assets/deck/1H.png',
                },
                {
                    alias: '1S',
                    src: '/assets/deck/1S.png',
                },
                {
                    alias: '2C',
                    src: '/assets/deck/2C.png',
                },
                {
                    alias: '2D',
                    src: '/assets/deck/2D.png',
                },
                {
                    alias: '2H',
                    src: '/assets/deck/2H.png',
                },
                {
                    alias: '2S',
                    src: '/assets/deck/2S.png',
                },
                {
                    alias: '3C',
                    src: '/assets/deck/3C.png',
                },
                {
                    alias: '3D',
                    src: '/assets/deck/3D.png',
                },
                {
                    alias: '3H',
                    src: '/assets/deck/3H.png',
                },
                {
                    alias: '3S',
                    src: '/assets/deck/3S.png',
                },
                {
                    alias: '4C',
                    src: '/assets/deck/4C.png',
                },
                {
                    alias: '4D',
                    src: '/assets/deck/4D.png',
                },
                {
                    alias: '4H',
                    src: '/assets/deck/4H.png',
                },
                {
                    alias: '4S',
                    src: '/assets/deck/4S.png',
                },
                {
                    alias: '5C',
                    src: '/assets/deck/5C.png',
                },
                {
                    alias: '5D',
                    src: '/assets/deck/5D.png',
                },
                {
                    alias: '5H',
                    src: '/assets/deck/5H.png',
                },
                {
                    alias: '5S',
                    src: '/assets/deck/5S.png',
                },
                {
                    alias: '6C',
                    src: '/assets/deck/6C.png',
                },
                {
                    alias: '6D',
                    src: '/assets/deck/6D.png',
                },
                {
                    alias: '6H',
                    src: '/assets/deck/6H.png',
                },
                {
                    alias: '6S',
                    src: '/assets/deck/6S.png',
                },
                {
                    alias: '7C',
                    src: '/assets/deck/7C.png',
                },
                {
                    alias: '7D',
                    src: '/assets/deck/7D.png',
                },
                {
                    alias: '7H',
                    src: '/assets/deck/7H.png',
                },
                {
                    alias: '7S',
                    src: '/assets/deck/7S.png',
                },
                {
                    alias: '8C',
                    src: '/assets/deck/8C.png',
                },
                {
                    alias: '8D',
                    src: '/assets/deck/8D.png',
                },
                {
                    alias: '8H',
                    src: '/assets/deck/8H.png',
                },
                {
                    alias: '8S',
                    src: '/assets/deck/8S.png',
                },
                {
                    alias: '9C',
                    src: '/assets/deck/9C.png',
                },
                {
                    alias: '9D',
                    src: '/assets/deck/9D.png',
                },
                {
                    alias: '9H',
                    src: '/assets/deck/9H.png',
                },
                {
                    alias: '9S',
                    src: '/assets/deck/9S.png',
                },
                {
                    alias: '10C',
                    src: '/assets/deck/10C.png',
                },
                {
                    alias: '10D',
                    src: '/assets/deck/10D.png',
                },
                {
                    alias: '10H',
                    src: '/assets/deck/10H.png',
                },
                {
                    alias: '10S',
                    src: '/assets/deck/10S.png',
                },
                {
                    alias: '11C',
                    src: '/assets/deck/11C.png',
                },
                {
                    alias: '11D',
                    src: '/assets/deck/11D.png',
                },
                {
                    alias: '11H',
                    src: '/assets/deck/11H.png',
                },
                {
                    alias: '11S',
                    src: '/assets/deck/11S.png',
                },
                {
                    alias: '12C',
                    src: '/assets/deck/12C.png',
                },
                {
                    alias: '12D',
                    src: '/assets/deck/12D.png',
                },
                {
                    alias: '12H',
                    src: '/assets/deck/12H.png',
                },
                {
                    alias: '12S',
                    src: '/assets/deck/12S.png',
                },
                {
                    alias: '13C',
                    src: '/assets/deck/13C.png',
                },
                {
                    alias: '13D',
                    src: '/assets/deck/13D.png',
                },
                {
                    alias: '13H',
                    src: '/assets/deck/13H.png',
                },
                {
                    alias: '13S',
                    src: '/assets/deck/13S.png',
                },


                {
                    alias: 'card0',
                    src: '/assets/0.webp',
                },
                {
                    alias: 'card1',
                    src: '/assets/1.webp',
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
                    alias: 'boySpinSkel',
                    src: '/animations/spinBoy/spineboy-pro.skel',
                },
                {
                    alias: 'boySpinAtlas',
                    src: '/animations/spinBoy/spineboy-pma.atlas',
                },
                {
                    alias: 'basegameSpinSkel',
                    src: '/animations/basegame/basegame.skel',
                },
                {
                    alias: 'basegameSpinAtlas',
                    src: '/animations/basegame/basegame.atlas',
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
  