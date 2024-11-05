

/*type resourceType = 'common' | 'mobile' | 'desktop';
export const resourceConfig: any = {
	common: [
		// {
		// 	loadType: 'preload',
		// 	name: 'bg_loading',
		// 	url: 'assets/loadingScreen/desk_loading.webp'
		// },
		{
			loadType: 'initial',
			name: 'basegame_screen_bg',
			url: '/background/bg.webp'
		}		
	],
	desktop: [
	],
	mobile: [
	]
};*/
const resourceConfig = [
    { name: 'sprite1', url: 'background/bg.webp' },
    // { name: 'sprite2', url: '/path/to/sprite2.png' },
    // Add more assets as needed
  ];
export default resourceConfig;