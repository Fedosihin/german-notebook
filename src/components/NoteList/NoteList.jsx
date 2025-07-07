import React from "react";
import NoteListItem from "./NoteListItem";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
  width: 300px; 
`;

export default function NoteList({ notes, onNoteClick, getItemStyle, onEmojiSelect }) {
  return (
    <StyledUl>
      {notes.map((note) => {
        return (
          <NoteListItem
            style={getItemStyle(note.id)}
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note.id)}
            onEmojiSelect={onEmojiSelect}
          ></NoteListItem>
        );
      })}
    </StyledUl>
  );
}
