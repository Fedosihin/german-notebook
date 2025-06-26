import React from "react";
import CheckboxItem from "./CheckboxItem";

export default function NoteEditor({
  note,
  onClose,
  onTitleChange,
  onTextChange,
  onAddCheckbox,
  onCheckboxStatusChange,
  onCheckboxTextChange,
}) {
  return (
    <>
      {/* // <div className="modal" style={modalStyle}> */}
      <div className="modal">
        <div className="modal-content">
          <h2>Модальное окно</h2>
          <h3>{note.title}</h3>
          <input
            type="text"
            placeholder="Введите заголовок..."
            //   onChange={(e) => {
            //     handleTitleChange(e);
            //   }}
            onChange={(e) => {
              onTitleChange(e);
            }}
            value={note.title}
          />
          {/* <p>Содержимое модального окна</p> */}
          <textarea
            value={note.text}
            onChange={(e) => onTextChange(e)}
            placeholder="Введите текст..."
            rows={10}
            style={{ width: "100%" }}
          />
          {/* <p>{listOfLists[activeListIndex].text}</p> */}
          {/*  */}
          {note.checkboxArray.map((item) => {
            return (
              <CheckboxItem key={item.id} item={item} onStatusChange={onCheckboxStatusChange} onTextChange={onCheckboxTextChange} />
            );
          })}
          <button onClick={onAddCheckbox}>Добавить чекбокс</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </>
  );
}
