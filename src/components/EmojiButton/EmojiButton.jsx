import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiButton = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsPickerOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsPickerOpen(!isPickerOpen)}>
        {selectedEmoji || " "}
      </button>
      
      {isPickerOpen && (
        <div style={{ position: 'absolute', zIndex: 100 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;