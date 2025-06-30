import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const StyledBtn = styled.button`
  /* height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 30px; 
  padding: 20px; */
    /* border: none;
  background: #6200ee;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%; */
  display: flex; 
  align-items: center;
  justify-content: center;
  /* cursor: pointer; */
  flex-shrink: 0; /* Фиксированный размер 
  transition: background 0.2s; */
  border: none;
  background: #ff4444;
  color: white;
  width: 40px;
  height: 100%; /* Растягивается на всю высоту элемента */
  cursor: pointer;
  flex-shrink: 0; /* Не сжимается */
  transition: background 0.2s;
`;

const EmojiButton = ({ className, onEmojiSelect, note }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setIsPickerOpen(false);
    onEmojiSelect(note.id, emojiData.emoji);
  };

  return (
    <div>
      {console.log("emoji render")}
      <StyledBtn className={className} onClick={() => setIsPickerOpen(!isPickerOpen)}>
        {note.emoji || "Y"}
      </StyledBtn>

      {isPickerOpen && (
        <div style={{ position: "absolute", zIndex: 100 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;
