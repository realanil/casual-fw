// components/Modal.tsx

import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // If the modal is not open, return null (don't render the modal)

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="text-xl font-semibold mb-10 text-center">RULES!</h2>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">General</h2>
        <p className="mb-4">Number of decks of cards used: 1</p>
        <p className="mb-4">Each card is drawn from a full deck of 52 cards</p>
        <h2 className="text-xl font-semibold mb-4">Game rules</h2>
        <ul>
          <ol className="mb-4">
            The purpose of the game is to guess whether the next card turning
            over will be Higher than/Equal to or Lower than/Equal to the current
            card. Alternatively, player can guess the color (red or black) of
            the next card.
          </ol>
          <ol className="mb-4">
            One card face-up is dealt for every prediction attempt.
          </ol>
          <ol className="mb-4">
            Following the first prediction, player can cash out after each step
            to collect the winnings.
          </ol>
          <ol className="mb-4">
            Player can skip and change the starting card before the game starts,
            and a new random card will be drawn. Once the game starts, the skip
            option will not be available anymore.
          </ol>
        </ul>
        <h2 className="text-xl font-semibold mb-4">Additional information</h2>
        <ul>
          <ol className="mb-4">Malfunction voids all pays and plays.</ol>
          <ol className="mb-4">
            The following game features and settings may be subject to the terms
            and conditions of the gaming site. For more information on the
            following, refer to the casino’s website:
            <ul>
              <ol className="mb-4">
                Procedures used to manage unfinished game rounds.
              </ol>
              <ol className="mb-4">
                Time after which inactive game sessions automatically end.
              </ol>
            </ul>
          </ol>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
