import { Howl } from "howler";
interface soundInterface {
  bgSound: boolean | undefined;
  music: boolean | undefined;
  clickSound: boolean | undefined;
}
const sound = new Howl({
  src: ["/sound/sound.mp3"],
  sprite: {
    "th_mx_base_music": [
        0,
        70243.90022675738
    ],
    "th_mx_base_music_layer1": [
        72000,
        70243.90022675738
    ],
    "th_mx_base_music_layer2": [
        144000,
        70243.90022675738
    ],
    "th_mx_base_music_layer3": [
        216000,
        70243.90022675738
    ],
    "th_mx_big_win_intro": [
        288000,
        1463.4240362811965
    ],
    "th_mx_big_win_loop": [
        291000,
        5853.67346938773
    ],
    "th_mx_big_win_outro": [
        298000,
        1463.4013605441965
    ],
    "th_mx_epic_win_intro": [
        301000,
        2378.0498866213406
    ],
    "th_mx_epic_win_loop": [
        305000,
        5853.650793650786
    ],
    "th_mx_epic_win_outro": [
        312000,
        2012.199546485249
    ],
    "th_mx_mega_win_intro": [
        316000,
        1463.4013605441965
    ],
    "th_mx_mega_win_loop": [
        319000,
        5853.650793650786
    ],
    "th_mx_mega_win_outro": [
        326000,
        1463.4013605441965
    ],
    "th_mx_super_mega_win_intro": [
        329000,
        1920.7256235827685
    ],
    "th_mx_super_mega_win_loop": [
        332000,
        5853.67346938773
    ],
    "th_mx_super_mega_win_outro": [
        339000,
        1920.7256235827685
    ],
    "th_sx_all_button": [
        342000,
        476.1904761904816
    ],
    "th_sx_bet_decrease": [
        344000,
        119.04761904759198
    ],
    "th_sx_bet_increase": [
        346000,
        119.04761904759198
    ],
    "th_sx_coin_tick_up_loop": [
        348000,
        773.8095238095184
    ],
    "th_sx_first_win": [
        350000,
        2738.095238095241
    ],
    "th_sx_free_game_trigger": [
        354000,
        2738.095238095241
    ],
    "th_sx_initial_scatter_landing": [
        358000,
        1369.047619047592
    ],
    "th_sx_multiplier_active": [
        361000,
        1531.7460317460245
    ],
    "th_sx_multiplier_added": [
        364000,
        1547.6190476190368
    ],
    "th_sx_multiplier_awarded": [
        367000,
        833.3333333333144
    ],
    "th_sx_multiplier_hit_tick_up": [
        369000,
        1904.7619047619264
    ],
    "th_sx_reel_spin": [
        372000,
        1904.7619047619264
    ],
    "th_sx_reel_stop": [
        375000,
        654.7619047619264
    ],
    "th_sx_scatter_landing": [
        377000,
        2995.0113378685046
    ],
    "th_sx_sctter_meter": [
        381000,
        981.179138321977
    ],
    "th_sx_spin_button": [
        383000,
        357.1428571428328
    ],
    "th_sx_win_sound_1": [
        385000,
        634.9206349206611
    ],
    "th_sx_multiplier": [
        387000,
        1310.0453514739456
    ],
    "th_sx_reels_appear": [
        390000,
        5673.764172335609
    ]
},
loop: false, // By default, the sound is not looped globally
  volume: 10,
});
let isLooping: boolean = false;
const soundInstances: Record<string, number> = {};  // Store sound IDs mapped to user-provided keys
const pausedSounds: string[] = [];  // Track which sounds were playing before the visibility change

export function playSound(userId: string, spriteName: any, loop: boolean, volume: number = 1.0,): void {  
      isLooping = loop;
      // Play the sound sprite and get the sound ID
      const soundId = sound.play(spriteName);
      // Store the sound ID associated with the user-provided ID
      soundInstances[userId] = soundId;
      // Set the loop property for the specific sound ID
      sound.loop(loop, soundId);
      // Set the volume property for the specific sound ID
      // setVolume(userId, volume);
      sound.volume(volume, soundId);
  
}

//Function to stop the currently playing sound.
export function stopSound(userId: string): void {
    console.log("userId", userId);
    const soundId = soundInstances[userId];
    if (soundId !== undefined) {
        sound.stop(soundId);
        delete soundInstances[userId]; // Remove the entry after stopping the sound
    }
}


