import React from "react";
import NoteListItem from "./NoteListItem";

export default function NoteList({ notes, onNoteClick }) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <NoteListItem
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note.id)}
          ></NoteListItem>
        );
      })}
    </ul>
  );
}
