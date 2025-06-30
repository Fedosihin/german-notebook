import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiButton = ({ onEmojiSelect, note }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(note.emoji || "x");

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsPickerOpen(false);
    onEmojiSelect(note.id, emojiData.emoji);
  };

//   useE   ffect(() => {
//     setSelectedEmoji(note.emoji);
//   }, [selectedEmoji]);

  return (
    <div>
      {console.log("emoji render")}
      <button onClick={() => setIsPickerOpen(!isPickerOpen)}>
        {selectedEmoji || " "}
      </button>

      {isPickerOpen && (
        <div style={{ position: "absolute", zIndex: 100 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;
