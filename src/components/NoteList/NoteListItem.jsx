import React from "react";
import EmojiButton from "../EmojiButton/EmojiButton";
import styled from "styled-components";
import PlaceholderSpan from "../PlaceholderSpan/PlaceholderSpan";

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  transition: all 0.3s;
`;

const StyledEmojiButton = styled(EmojiButton)`
  background-color: #465466;
`;

const StyledDiv = styled.div`
  flex-grow: 1;
  padding: 12px 16px;
  cursor: pointer;
  background-color: black;
  transition: background 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* ПОДУМАТЬ */
  /* text-align: left; */
`;

const StyledSpan = styled.span`
  font-family: Arial, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function NoteListItem({
  note,
  onClick,
  style,
  onEmojiSelect,
  hideArchive = false,
  hideNotArchive = false,
}) {

  // ТАК НЕЛЬЗЯ!!
   if (!('isArchived' in note)) {
    note.isArchived = false;
  }

  if (hideArchive === true && note.isArchived === true) {
    return;
  } else if (hideNotArchive === true && note.isArchived === false) {
    return;
  } else
    return (
      <StyledLi>
        <StyledEmojiButton
          onEmojiSelect={onEmojiSelect}
          note={note}
        ></StyledEmojiButton>
        <StyledDiv onClick={onClick} style={style}>
          <PlaceholderSpan placeholder={"Введите название..."}>
            {note.title}
          </PlaceholderSpan>
        </StyledDiv>
      </StyledLi>
    );
}
