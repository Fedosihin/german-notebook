import React from "react";
import NoteListItem from "./NoteListItem";

export default function NoteList({ notes, onNoteClick, getItemStyle }) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <NoteListItem
            style={getItemStyle(note.id)}
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note.id)}
          ></NoteListItem>
        );
      })}
    </ul>
  );
}
