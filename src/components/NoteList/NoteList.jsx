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

export default function NoteList({
  notes,
  globalTags,
  onNoteClick,
  getItemStyle,
  filter = [],
  onEmojiSelect,
  hideArchive = false,
  hideNotArchive = false,
  hideNotSorted = true,
}) {
  return (
    <StyledUl>
      {notes.map((note) => {
        // console.log(filter);
        // if (filter) {
        //   const hasCommonElement = note.tags.some((item) =>
        //     filter.includes(item)
        //   );
        //   console.log(hasCommonElement); // true (есть общий элемент 3)
        // }
        // if (filter.length === 0 && hideNotSorted && note.tags && note.tags.length !== 0) {return}
        // нужно проверить что у ноты нет ни одного тега из тэгов стейта
        // и при этом массив тегов ноты не пустой
        // есть хотя бы один тэг из списка тегов
        if (filter.length === 0 && hideNotSorted && note.tags && globalTags && note.tags.length !== 0 && (note.tags.some(item => globalTags.includes(item)))) {return}
        if (filter.length == 0) {
          return (
            <NoteListItem
              style={getItemStyle(note.id)}
              key={note.id}
              note={note}
              onClick={() => onNoteClick(note.id)}
              hideArchive={hideArchive}
              hideNotArchive={hideNotArchive}
              onEmojiSelect={onEmojiSelect}
            ></NoteListItem>
          );
        } else if (filter && note.tags) {
          const hasCommonElement = note.tags.some((item) =>
            filter.includes(item)
          );
          console.log(hasCommonElement); // true (есть общий элемент 3)
          if (hasCommonElement) {

            return (
              <NoteListItem
              style={getItemStyle(note.id)}
              key={note.id}
              note={note}
              onClick={() => onNoteClick(note.id)}
              hideArchive={hideArchive}
              hideNotArchive={hideNotArchive}
              onEmojiSelect={onEmojiSelect}
              ></NoteListItem>
            );
          }
          else {
            return;
          }
        } else {
          return;
        }
      })}
    </StyledUl>
  );
}
