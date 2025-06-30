import React from "react";
import EmojiButton from "../EmojiButton/EmojiButton";
import styled from "styled-components";

const StyledLi = styled.li`
  /* background-color: pink;
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  min-height: 80px; */
  display: flex;
  align-items: center; /* Вертикальное выравнивание */
  gap: 12px; /* Расстояние между кнопкой и текстом */
  padding: 10px 15px;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 8px; /* Отступ между пунктами */
  transition: all 0.3s;
`;

const StyledEmojiButton = styled(EmojiButton)`
  /* margin-right: 30px; Вот это ключевое правило */
`;

const StyledDiv = styled.div`
  /* flex: 1; */
  /* height: 100%; */
  /* cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  flex-grow: 1; /* Занимает всё свободное место */
  padding: 12px 16px;
  cursor: pointer;
  background-color: black;
  transition: background 0.3s;
`;

const StyledSpan = styled.span`
  font-family: Arial, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function NoteListItem({ note, onClick, style, onEmojiSelect }) {
  return (
    <StyledLi>
      <StyledEmojiButton
        onEmojiSelect={onEmojiSelect}
        note={note}
      ></StyledEmojiButton>
      <StyledDiv
        onClick={onClick}
        // style={{ cursor: "pointer" }}
        style={style}
      >
        <StyledSpan>{note.title}</StyledSpan>
      </StyledDiv>
    </StyledLi>
  );
}
