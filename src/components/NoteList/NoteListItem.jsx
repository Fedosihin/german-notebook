import React from "react";
import EmojiButton from "../EmojiButton/EmojiButton";

export default function NoteListItem ({note, onClick, style }) {
  return (
    <li
      onClick={onClick}
      // style={{ cursor: "pointer" }}
      style={style}
    >
      <EmojiButton></EmojiButton>
      {note.title}
    </li>
  );
}