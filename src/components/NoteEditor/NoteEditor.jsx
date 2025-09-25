import React from "react";
import CheckboxItem from "./CheckboxItem";
import EmojiButton from "../EmojiButton/EmojiButton";
import styled from "styled-components";
import RemoveNoteButton from "../RemoveNoteButton/RemoveNoteButton";
import AutoTextarea from "../AutoTextarea/AutoTextarea";
import SmartTagsList from "../SmartTagsList/SmartTagsList";
import { useState, useEffect } from "react";

const StyledContainer = styled.div`
  min-width: 500px;
  border-radius: 8px;
  border: 1px #ffffff solid;
  padding: 8px;

  background-color: #ffffff;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    min-width: 200px;
  }
`;
StyledContainer.displayName = "MyAwesomeButton";

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
  min-height: 25px;
  height: 25px;

  &:focus {
    outline: none;
  }
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  /* align-items: flex-start; */
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const StyledAutoTextarea = styled(AutoTextarea)`
  font-size: 16px;
  padding: 0;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default function NoteEditor({
  note,
  tags,
  onClose,
  onTagClick,
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
  onKeyDown,
  onSendInArchive,
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    // if (!refuelTime) return;

    const interval = setInterval(() => {
      const endTime = note.last_change + 3 * 24 * 60 * 60 * 1000;
      const seconds = Math.floor((endTime - Date.now()) / 1000);
      setSecondsLeft(Math.max(0, seconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [note.last_change]);

  return (
    <StyledContainer id="editor" className="modal" style={style}>
      <div className="modal-content">
        <SmartTagsList
          tags={tags}
          note={note}
          onClick={onTagClick}
        ></SmartTagsList>
        <div>Осталось: {secondsLeft} секунд</div>
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
            onBlur={(e) => {
              onBlur(e);
            }}
            value={note.title}
          />
        </StyledHeaderContainer>
        {/* <p>Содержимое модального окна</p> */}
        <StyledCheckboxContainer id="checkboxesList">
          {note.checkboxArray.map((item) => {
            return (
              <CheckboxItem
                onCheckboxRemove={onCheckboxRemove}
                key={item.id}
                // key нужен для списков
                item={item}
                onStatusChange={onCheckboxStatusChange}
                onTextChange={onCheckboxTextChange}
                handleKeyDown={onKeyDown}
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
        <StyledAutoTextarea
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
          <RemoveNoteButton onButtonClick={onNoteRemove}></RemoveNoteButton>
        </StyledButtonsContainer>
        <button onClick={onSendInArchive}>Архив?</button>
      </div>
    </StyledContainer>
  );
}
