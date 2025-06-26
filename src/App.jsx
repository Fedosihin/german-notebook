import { useState, useEffect, useMemo } from "react";
import "./App.css";
import NoteList from "./components/NoteList/NoteList";
import AddNoteButton from "./components/AddNoteButton/AddNoteButton";
import NoteEditor from "./components/NoteEditor/NoteEditor";

function App() {
  const [listOfLists, setListOfLists] = useState([
    {
      id: 0,
      title: "first list",
      text: "first text",
      checkboxArray: [
        {
          id: 0,
          checked: true,
          text: "Первый список - пункт",
        },
      ],
    },
    {
      id: 1,
      title: "second list",
      text: "second text",
      checkboxArray: [
        {
          id: 0,
          checked: true,
          text: "Второй список - пункт",
        },
      ],
    },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(0);

  const activeNote = useMemo(
    () =>
      listOfLists.find((note) => note.id === activeNoteId) || listOfLists[0],
    [listOfLists, activeNoteId]
  );

  useEffect(() => {
    console.dir(listOfLists);
  }, [listOfLists]);

  const openEditor = () => {
    console.log("Открываю окно редактора");
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    console.log("Закрываю окно редактора");
    setIsEditorOpen(false);
  };

  const handleNoteClick = (id) => {
    console.log("Был нажат элемент списка:");
    setActiveNoteId(id);
    openEditor();
  };

  const CreateEmptyNote = () => {
    console.log("Добавил пустой элемент в список");
    const newNote = {
      id: Date.now(),
      title: "Пустой заголовок",
      text: "Пустой текст",
      checkboxArray: [],
    };
    setListOfLists((prev) => [...prev, newNote]);
    setActiveNoteId(newNote.id);
    openEditor();
  };

  const updateNoteProperty = (property, value) => {
    setListOfLists((prev) =>
      prev.map((note) =>
        note.id === activeNoteId ? { ...note, [property]: value } : note
      )
    );
  };

  const handleTitleChange = (e) => {
    updateNoteProperty("title", e.target.value);
  };

  const handleTextChange = (e) => {
    updateNoteProperty("text", e.target.value);
  };

  const changePropertyInListOfLists = (property, newValue) => {
    setListOfLists(
      listOfLists.map((list) =>
        list.id === activeNoteId ? { ...list, [property]: newValue } : list
      )
    );
  };

  const addCheckbox = () => {
    const newCheckbox = {
      id: Date.now(),
      checked: false,
      text: "Новый пункт",
    };
    setListOfLists((prev) =>
      prev.map((note) =>
        note.id === activeNoteId
          ? {
              ...note,
              checkboxArray: [...note.checkboxArray, newCheckbox],
            }
          : note
      )
    );
  };

  const handleCheckboxStatusChange = (id) => {
    setListOfLists(prev =>
      prev.map(note =>
        note.id === activeNoteId
          ? {
              ...note,
              checkboxArray: note.checkboxArray.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
              )
            }
          : note
      )
    );

    // changePropertyInListOfLists(`checkboxArray[${id}].checked`, !listOfLists[activeListIndex].checkboxArray[id].checked);
  };

  const handleCheckboxTextChange = (id, newText) => {
    setListOfLists(prev =>
      prev.map(note =>
        note.id === activeNoteId
          ? {
              ...note,
              checkboxArray: note.checkboxArray.map(item =>
                item.id === id ? { ...item, text: newText } : item
              )
            }
          : note
      )
    );
  };

  // const howMuchCheckboxes = listOfLists[activeNoteId].checkboxArray.length;
  // const howMuchCheckboxesIsDone = listOfLists[
  //   activeNoteId
  // ].checkboxArray.filter((item) => item.checked === true).length;
  // const value =
  //   howMuchCheckboxes > 0
  //     ? Math.round((howMuchCheckboxesIsDone / howMuchCheckboxes) * 100)
  //     : 0;

  // let modalStyle = {
  //   // backgroundColor: `hsl(${(100 - value) * 1.2}, 100%, 50%)`
  //   backgroundColor: `hsl(${value * 1.2}, 100%, 50%)`,
  // };

  // if (howMuchCheckboxes === 0) {
  //   modalStyle = {};
  // }

  const completionPercentage = useMemo(() => {
    if (!activeNote?.checkboxArray?.length) return 0;
    
    const doneCount = activeNote.checkboxArray.filter(item => item.checked).length;
    return Math.round((doneCount / activeNote.checkboxArray.length) * 100);
  }, [activeNote]);

  const modalStyle = useMemo(() => {
    if (!activeNote?.checkboxArray?.length) return {};
    return { backgroundColor: `hsl(${completionPercentage * 1.2}, 100%, 50%)` };
  }, [activeNote, completionPercentage]);

  return (
    <>
      <div>
        {isEditorOpen && (
          <NoteEditor
            note={activeNote}
            onClose={closeEditor}
            onTitleChange={handleTitleChange}
            onCheckboxStatusChange={handleCheckboxStatusChange}
            onCheckboxTextChange={handleCheckboxTextChange}
            onTextChange={handleTextChange}
            onAddCheckbox={addCheckbox}
            style={modalStyle}
          ></NoteEditor>
        )}

        <NoteList notes={listOfLists} onNoteClick={handleNoteClick}></NoteList>

        <AddNoteButton onButtonClick={CreateEmptyNote}></AddNoteButton>
      </div>
    </>
  );
}

export default App;
