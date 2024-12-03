import { usePixi } from "@/context/PixiContext";
import {
  faHome,
  faInfoCircle,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonPanelProps {
  soundAction: any;
  musicPlaying: boolean;
  soundPlaying: boolean;
  openModal: any;
  isPortrait?: boolean;
}
const HamburgerSection: React.FC<ButtonPanelProps> = ({
  soundAction,
  musicPlaying,
  soundPlaying,
  openModal,
  isPortrait,
}) => {
  const { device } = usePixi();
  return isPortrait ? (
    <div className="w-full sm:w-[350px] p-0.5">
      <div className="bg-gray-500 text-white text-center rounded-sm transform transition-transform duration-300">
        <div className="flex justify-around p-0">
          <a
            href="#"
            className="text-white hover:text-yellow-300 mb-0 transition duration-300"
            onClick={(e) =>
              soundAction(e, "sound", "th_mx_base_music_layer1", true)
            }
          >
            <FontAwesomeIcon
              icon={soundPlaying ? faVolumeUp : faVolumeMute} // Toggle between sound off and sound on
              className="text-xs"
            />{" "}
            Sound
          </a>
          <a
            href="#"
            className="text-white hover:text-yellow-300 mb-0 transition duration-300"
            onClick={(e) => soundAction(e, "music")}
          >
            <FontAwesomeIcon
              icon={musicPlaying ? faVolumeUp : faVolumeMute} // Toggle between sound off and sound on
              className="text-xs"
            />{" "}
            Music
          </a>
          <a
            href="#"
            className="text-white hover:text-yellow-300 mb-0 transition duration-300"
            onClick={(e) => {
              soundAction(e, "tickSound", "th_sx_all_button"), openModal(e);
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-xs" /> Info
          </a>
          <a
            href="#"
            className="text-white hover:text-yellow-300 mb-0 transition duration-300"
            onClick={(e) => {
              soundAction(e, "tickSound", "th_sx_all_button"),
                alert("Home button clicked!");
            }}
          >
            <FontAwesomeIcon icon={faHome} className="text-xs" /> Home
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="bg-red-0 text-white text-center rounded-lg transform transition-transform duration-300"
      style={{
        width: "350px",
        // height: "50px",
      }}
    >
      <div className="ml-0 ">
        <a
          href="#"
          onClick={(e) =>
            soundAction(e, "sound", "th_mx_base_music_layer1", true, 1)
          }
          className="block text-white hover:text-yellow-300 mb-0 transition duration-300 float-left"
        >
          <FontAwesomeIcon
            icon={soundPlaying ? faVolumeUp : faVolumeMute} // Toggle between sound off and sound on
            className="text-xl"
          />{" "}
          Sound
        </a>
        <a
          href="#"
          onClick={(e) => soundAction(e, "music")}
          className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left ml-5"
        >
          <FontAwesomeIcon
            icon={musicPlaying ? faVolumeUp : faVolumeMute} // Toggle between sound off and sound on
            className="text-xl"
          />{" "}
          Music
        </a>
        <a
          href="#"
          onClick={(e) => {
            soundAction(e, "tickSound", "th_sx_all_button"), openModal(e);
          }}
          className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left ml-5"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="text-xl" /> Info
        </a>
        <a
          href="#"
          onClick={(e) => {
            soundAction(e, "tickSound", "th_sx_all_button"),
              alert("Home button clicked!");
          }}
          className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left ml-5"
        >
          <FontAwesomeIcon icon={faHome} className="text-xl" /> Home
        </a>
      </div>
    </div>
  );
};

export default HamburgerSection;
