import React from "react";
import EmojiButton from "../EmojiButton/EmojiButton";

export default function NoteListItem({ note, onClick, style, onEmojiSelect }) {
  return (
    <li>
      <EmojiButton onEmojiSelect={onEmojiSelect} note={note}></EmojiButton>
      <div
        onClick={onClick}
        // style={{ cursor: "pointer" }}
        style={style}
      >
        {note.title}
      </div>
    </li>
  );
}
