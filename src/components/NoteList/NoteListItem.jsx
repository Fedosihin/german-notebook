import React from "react";

export default function NoteListItem ({note, onClick}) {
  return (
    <li
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {note.title}
    </li>
  );
}