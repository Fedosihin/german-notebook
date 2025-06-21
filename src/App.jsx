import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [listOfLists, setListOfLists] = useState([
    { id: 0, title: "first list", text: "first text" },
    { id: 1, title: "second list", text: "second text" },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeListIndex, setActiveListIndex] = useState(null);

  const OpenEditorWindow = () => {
    console.log("Открываю окно редактора");
    setIsEditorOpen(true);
  };
  useEffect(() => {
    console.dir(listOfLists);
  }, [listOfLists]);
  const CloseEditorWindow = () => {
    console.log("Закрываю окно редактора");
    setIsEditorOpen(false);
  };

  const handleListClick = (item, index) => {
    console.log("Был нажат элемент списка:");
    console.dir(item);
    console.log("С индексом:");
    console.log(index);
    setActiveListIndex(index);
    OpenEditorWindow();
  };

  const CreateEmptyNote = () => {
    console.log("Добавил пустой элемент в список");
    setListOfLists([
      ...listOfLists,
      {
        id: listOfLists.length,
        title: "Пустой заголовок",
        text: "Пустой текст",
      },
    ]);
  };

  const handleTitleChange = (e) => {
    const newText = e.target.value;
    setListOfLists(
      listOfLists.map((list) =>
        list.id === activeListIndex ? { ...list, title: newText } : list
      )
    );
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setListOfLists(
      listOfLists.map((list) =>
        list.id === activeListIndex ? { ...list, text: newText } : list
      )
    );
  };

  const InitRedactorWindow = () => {
    console.log("Иниц. окно редактора");
    return (
      <>
        {/* <h3>Заголовок:</h3>*/}
        <h3>{listOfLists[activeListIndex].title}</h3>
        <input type="text" placeholder="Введите заголовок..." onChange={(e) => {handleTitleChange(e)}} value={listOfLists[activeListIndex].title} />
        {/* <p>Содержимое модального окна</p> */}
        <textarea
          value={listOfLists[activeListIndex].text}
          onChange={(e) => handleTextChange(e)}
          placeholder="Введите текст..."
          rows={10}
          style={{ width: "100%" }}
        />
        {/* <p>{listOfLists[activeListIndex].text}</p> */}
      </>
    );
  };

  return (
    <>
      <div>
        {isEditorOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Модальное окно</h2>
              {InitRedactorWindow()}
              <button onClick={() => CloseEditorWindow()}>Закрыть</button>
            </div>
          </div>
        )}
        <ul>
          {listOfLists.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleListClick(item, index);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
        <button onClick={() => CreateEmptyNote()}>Добавить запись</button>
      </div>
    </>
  );
}

export default App;
