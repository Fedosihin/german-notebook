import React from "react";
import CheckboxItem from "./CheckboxItem";
import EmojiButton from "../EmojiButton/EmojiButton";
import styled from "styled-components";
import RemoveNoteButton from "../RemoveNoteButton/RemoveNoteButton";
import AutoTextarea from "../AutoTextarea/AutoTextarea";

const StyledContainer = styled.div`
  min-width: 500px;
  border-radius: 8px;
  border: 1px #ffffff solid;
  padding: 8px;
  background-color: #ffffff;
  margin-bottom: 16px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 10px;
`;

const StyledHeaderInput = styled.input`
  width: 100%;
  font-family: monospace;
  font-size: 20px;
  color: #ffffff;
  font-weight: 600;

  color: rgba(255, 255, 255, 0.9);
  background-color: transparent;
  box-shadow: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  background-color: transparent;
  box-shadow: none;
  border: none;

  font-family: monospace;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  color: rgba(255, 255, 255, 0.9);

  /* Отключаем ручное изменение */
  resize: none;
  overflow: hidden;
  min-height: 50px;
  height: 50px;

  &:focus {
    outline: none;
  }
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* align-items: flex-start; */
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export default function NoteEditor({
  note,
  onClose,
  onTitleChange,
  onTextChange,
  onAddCheckbox,
  onCheckboxStatusChange,
  onCheckboxTextChange,
  onNoteRemove,
  onCheckboxRemove,
  onEmojiSelect,
  onBlur,
  style,
}) {
  return (
    <StyledContainer className="modal" style={style}>
      <div className="modal-content">
        <StyledHeaderContainer>
          <EmojiButton note={note} onEmojiSelect={onEmojiSelect}></EmojiButton>
          <StyledHeaderInput
            type="text"
            placeholder="Введите заголовок..."
            //   onChange={(e) => {
            //     handleTitleChange(e);
            //   }}
            onChange={(e) => {
              onTitleChange(e);
            }}
            onBlur={(e) => {onBlur(e);}}
            value={note.title}
          />
        </StyledHeaderContainer>
        {/* <p>Содержимое модального окна</p> */}
        <StyledCheckboxContainer>
          {note.checkboxArray.map((item) => {
            return (
              <CheckboxItem
                onCheckboxRemove={onCheckboxRemove}
                key={item.id}
                // key нужен для списков
                item={item}
                onStatusChange={onCheckboxStatusChange}
                onTextChange={onCheckboxTextChange}
              />
            );
          })}
        </StyledCheckboxContainer>
        {/* <StyledTextarea
          value={note.text}
          onChange={(e) => onTextChange(e)}
          placeholder="Введите текст..."
          rows={10}
          style={{ width: "100%" }}
        /> */}
        <AutoTextarea
          value={note.text}
          onChange={(e) => onTextChange(e)}
          placeholder="Введите текст..."
        />
        {/* <p>{listOfLists[activeListIndex].text}</p> */}
        {/*  */}
        {/* <StyledCheckboxContainer>
          {note.checkboxArray.map((item) => {
            return (
              <CheckboxItem
                key={item.id}
                item={item}
                onStatusChange={onCheckboxStatusChange}
                onTextChange={onCheckboxTextChange}
              />
            );
          })}
        </StyledCheckboxContainer> */}
        <StyledButtonsContainer>
          <button onClick={onAddCheckbox}>Добавить чекбокс</button>
          <button onClick={onClose}>Закрыть</button>
          <RemoveNoteButton
            onButtonClick={onNoteRemove}
          ></RemoveNoteButton>
        </StyledButtonsContainer>
      </div>
    </StyledContainer>
  );
}
