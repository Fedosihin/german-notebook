import React from "react";
import EmojiButton from "../EmojiButton/EmojiButton";
import styled from "styled-components";

const StyledLi = styled.li`
  background-color: pink;
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
`;

const StyledEmojiButton = styled(EmojiButton)`
  margin-right:30px; /* Вот это ключевое правило */
`;

const StyledDiv = styled.div`
  flex: 1;
  /* height: 100%; */
  cursor: pointer;
`;

export default function NoteListItem({ note, onClick, style, onEmojiSelect }) {
  return (
    <StyledLi>
      <StyledEmojiButton onEmojiSelect={onEmojiSelect} note={note}></StyledEmojiButton>
      <StyledDiv
        onClick={onClick}
        // style={{ cursor: "pointer" }}
        style={style}
      >
        {note.title}
      </StyledDiv>
    </StyledLi>
  );
}
