import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiButton = ({ onEmojiSelect, note }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setIsPickerOpen(false);
    onEmojiSelect(note.id, emojiData.emoji);
  };

  return (
    <div>
      {console.log("emoji render")}
      <button onClick={() => setIsPickerOpen(!isPickerOpen)}>
        {note.emoji || "Y"}
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
