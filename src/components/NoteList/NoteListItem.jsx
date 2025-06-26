import React from "react";

export default function NoteListItem ({note, onClick, style }) {
  return (
    <li
      onClick={onClick}
      // style={{ cursor: "pointer" }}
      style={style}
    >
      {note.title}
    </li>
  );
}