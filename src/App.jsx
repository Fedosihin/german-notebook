import { useEffect, useMemo, useReducer } from "react";
import "./App.css";
import NoteList from "./components/NoteList/NoteList";
import AddNoteButton from "./components/AddNoteButton/AddNoteButton";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import styled from "styled-components";
import AddTagButton from "./components/AddTagButton/AddTagButton";
import TagsList from "./components/TagsList/TagsList";
import SmartTagsList from "./components/SmartTagsList/SmartTagsList";
import SmartTagsList2 from "./components/SmartTagsList/SmartTagsList2";

// Ключ для localStorage
const LOCAL_STORAGE_KEY = "notesAppData";
const LOCAL_STORAGE_TAGS_KEY = "notesTagsAppData";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 5px;
    margin: 0 0;
    background-color: #636363;
  }
`;

const StyledLogo = styled.p`
  display: block;
  position: fixed;
  top: 10px;
  left: 10px;
  font-weight: 800;
  font-size: 26px;

  @media (max-width: 480px) {
    font-size: 14px;
    top: -10px;
    left: 8px;
  }
`;

const getInitialState = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedData
    ? JSON.parse(savedData)
    : [
        {
          id: 0,
          title: "first list",
          emoji: "idk",
          text: "first text",
          checkboxArray: [
            {
              id: 0,
              checked: true,
              text: "Первый список - пункт",
            },
          ],
        },
      ];
};

const getInitialTagsState = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_TAGS_KEY);
  return savedData ? JSON.parse(savedData) : [];
};

const initialState = {
  listOfLists: getInitialState(),
  tags: getInitialTagsState(),
  filterTags: [],
  isEditorOpen: false,
  isArchiveOpen: false,
  activeNoteId: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_STATE":
      return {
        ...state,
        listOfLists: action.payload || initialState.listOfLists,
      };
    case "OPEN_EDITOR":
      return {
        ...state,
        isEditorOpen: true,
      };
    case "CLOSE_EDITOR":
      return {
        ...state,
        isEditorOpen: false,
      };
    case "OPEN_ARCHIVE":
      return {
        ...state,
        isArchiveOpen: true,
      };
    case "CLOSE_ARCHIVE":
      return {
        ...state,
        isArchiveOpen: false,
      };
    case "SET_ACTIVE_NOTE":
      return {
        ...state,
        activeNoteId: action.payload,
      };
    case "CREATE_NOTE": {
      const newNote = {
        id: Date.now(),
        title: "",
        text: "",
        tags: [],
        isArchived: false,
        checkboxArray: [],
      };
      return {
        ...state,
        listOfLists: [...state.listOfLists, newNote],
        activeNoteId: newNote.id,
      };
    }
    case "ADD_TAG": {
      const newTag = action.payload;
      return {
        ...state,
        tags: [...state.tags, newTag],
      };
    }
    case "UPDATE_NOTE_PROPERTY":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? { ...note, [action.payload.property]: action.payload.value }
            : note
        ),
      };
    case "UPDATE_NOTE_EMOJI":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === action.payload.id
            ? { ...note, emoji: action.payload.emoji }
            : note
        ),
      };
    case "ADD_CHECKBOX": {
      const newCheckbox = {
        id: Date.now(),
        checked: false,
        text: "",
      };
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                checkboxArray: [...note.checkboxArray, newCheckbox],
              }
            : note
        ),
      };
    }
    case "REMOVE_CHECKBOX":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                checkboxArray: note.checkboxArray.filter(
                  (item) => item.id !== action.payload
                ),
              }
            : note
        ),
      };
    case "REMOVE_ACTIVE_NOTE":
      return {
        ...state,
        listOfLists: state.listOfLists.filter(
          (note) => note.id !== state.activeNoteId
        ),
      };
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                checkboxArray: note.checkboxArray.map((item) =>
                  item.id === action.payload
                    ? { ...item, checked: !item.checked }
                    : item
                ),
              }
            : note
        ),
      };
    case "TOGGLE_TAG_IN_NOTE": {
      const newTag = action.payload;

      // if (state.listOfLists[])
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                tags: note.tags.includes(newTag)
                  ? note.tags.filter((tag) => tag !== newTag)
                  : [...note.tags, newTag],
              }
            : note
        ),
      };
    }
    case "TOGGLE_TAG_IN_FILTER": {
      const newTag = action.payload;

      // if (state.listOfLists[])
      return {
        ...state,
        filterTags: state.filterTags.includes(newTag)
          ? state.filterTags.filter((tag) => tag !== newTag)
          : [...state.filterTags, newTag],
      };
    }

    case "SEND_IN_ARCHIVE":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                isArchived: !note.isArchived,
              }
            : note
        ),
      };
    case "UPDATE_CHECKBOX_TEXT":
      return {
        ...state,
        listOfLists: state.listOfLists.map((note) =>
          note.id === state.activeNoteId
            ? {
                ...note,
                checkboxArray: note.checkboxArray.map((item) =>
                  item.id === action.payload.id
                    ? { ...item, text: action.payload.text }
                    : item
                ),
              }
            : note
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    dispatch({
      type: "LOAD_STATE",
      payload: savedData ? JSON.parse(savedData) : null,
    });
  }, []);

  // Сохраняем данные в localStorage при каждом изменении listOfLists
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.listOfLists));
  }, [state.listOfLists]);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, JSON.stringify(state.tags));
  }, [state.tags]);

  const activeNote = useMemo(
    () =>
      state.listOfLists.find((note) => note.id === state.activeNoteId) ||
      state.listOfLists[0],
    [state.listOfLists, state.activeNoteId]
  );

  const openEditor = () => {
    console.log("Открываю окно редактора");
    dispatch({ type: "OPEN_EDITOR" });
  };

  const closeEditor = () => {
    console.log("Закрываю окно редактора");
    dispatch({ type: "CLOSE_EDITOR" });
  };

  const handleNoteClick = (id) => {
    console.log("Был нажат элемент списка:");
    dispatch({ type: "SET_ACTIVE_NOTE", payload: id });
    openEditor();
  };

  const CreateEmptyNote = () => {
    console.log("Добавил пустой элемент в список");
    dispatch({ type: "CREATE_NOTE" });
    openEditor();
  };

  const updateNoteProperty = (property, value) => {
    dispatch({
      type: "UPDATE_NOTE_PROPERTY",
      payload: { property, value },
    });
  };

  const handleTitleChange = (e) => {
    updateNoteProperty("title", e.target.value);
  };

  const handleTextChange = (e) => {
    updateNoteProperty("text", e.target.value);
  };

  const addCheckbox = () => {
    dispatch({ type: "ADD_CHECKBOX" });
  };

  const handleCheckboxStatusChange = (id) => {
    dispatch({ type: "TOGGLE_CHECKBOX", payload: id });
  };

  const handleCheckboxTextChange = (id, newText) => {
    dispatch({
      type: "UPDATE_CHECKBOX_TEXT",
      payload: { id, text: newText },
    });
  };

  const handleNoteRemove = () => {
    if (confirm("Уверены?")) {
      dispatch({ type: "REMOVE_ACTIVE_NOTE" });
      dispatch({ type: "CLOSE_EDITOR" });
    }
  };

  const handleEmojiSelect = (id, value) => {
    dispatch({
      type: "UPDATE_NOTE_EMOJI",
      payload: { id, emoji: value },
    });
  };

  const handleCheckboxRemove = (checkboxId) => {
    dispatch({
      type: "REMOVE_CHECKBOX",
      payload: checkboxId,
    });
  };

  const handleBlur = (e) => {
    const trimmedValue = e.target.value.trim();
    // Проверяем, не пустая ли строка после обрезки пробелов
    if (trimmedValue === "") {
      // setError("Текст не может состоять только из пробелов");
      // setValue(""); // Очищаем инпут, если были только пробелы
      updateNoteProperty("title", "");
    } else {
      updateNoteProperty("title", trimmedValue);
      // setValue(trimmedValue); // Сохраняем обрезанное значение
    }
  };

  // Рассчитываем процент выполнения
  const completionPercentage = useMemo(() => {
    if (!activeNote?.checkboxArray?.length) return 0;

    const doneCount = activeNote.checkboxArray.filter(
      (item) => item.checked
    ).length;
    return Math.round((doneCount / activeNote.checkboxArray.length) * 100);
  }, [activeNote]);

  // Создаем цвет на основе процента выполнения
  const getBackgroundStyle = useMemo(() => {
    // HSL: Hue (0-120: 0=red, 120=green), Saturation 100%, Lightness 50%
    const hue = completionPercentage * 1.2; // 0-120
    return {
      backgroundColor: `hsl(${hue}, 100%, 50%)`,
      // background: `linear-gradient(135deg, hsl(${hue}, 100%, 10%), hsl(${hue}, 100%, 10%))`,
      background: `hsl(${hue}, 20%, 30%)`,
      // Cломал тут !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    };
  }, [completionPercentage]);

  // Применяем стиль ко всему редактору и списку
  const editorStyle = getBackgroundStyle;
  const listItemStyle = (noteId) => {
    const note = state.listOfLists.find((note) => note.id === noteId);
    if (!note?.checkboxArray?.length) return {};

    const doneCount = note.checkboxArray.filter((item) => item.checked).length;
    const percent = Math.round((doneCount / note.checkboxArray.length) * 100);
    const hue = percent * 1.2;

    return {
      backgroundColor: `hsl(${hue}, 100%, 20%)`,
      borderLeft: `4px solid hsl(${hue}, 100%, 50%)`,
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Предотвращаем перевод строки
      // handleSubmit(); // Вызываем функцию
      // dispatch({ type: "ADD_CHECKBOX" }).then(()=>{
      //   const nextInput = document.querySelector("#checkboxesList > div:last-child");
      //   console.log(nextInput);
      //   nextInput.focus();
      // });
      // dispatch({ type: "ADD_CHECKBOX" });
      // const nextInput = document.querySelector("#checkboxesList > div:last-child");
      // console.log(nextInput);
      // nextInput.focus();
      dispatch({ type: "ADD_CHECKBOX" });
      setTimeout(() => {
        const nextInput = document.querySelector(
          "#checkboxesList > div:last-child textarea"
        );
        console.log(nextInput);
        nextInput.focus();
      }, 0);
    }
  };

  const handleSendInArchive = () => {
    dispatch({ type: "SEND_IN_ARCHIVE" });
  };

  const handleTagAdd = (newTag) => {
    dispatch({ type: "ADD_TAG", payload: newTag });
  };

  const handleTagClick = (tag) => {
    dispatch({ type: "TOGGLE_TAG_IN_NOTE", payload: tag });
  };

  const handleFilterClick = (newTag) => {
    dispatch({ type: "TOGGLE_TAG_IN_FILTER", payload: newTag });
  };

  return (
    <>
      <StyledWrapper>
        <StyledLogo>HERMAN NOTE</StyledLogo>
        <SmartTagsList2
          tags={state.tags}
          onClick={handleFilterClick}
          filter={state.filterTags}
        ></SmartTagsList2>{" "}
        {state.isEditorOpen && (
          <NoteEditor
            note={activeNote}
            tags={state.tags}
            onClose={closeEditor}
            onTitleChange={handleTitleChange}
            onCheckboxStatusChange={handleCheckboxStatusChange}
            onCheckboxTextChange={handleCheckboxTextChange}
            onTextChange={handleTextChange}
            onAddCheckbox={addCheckbox}
            onEmojiSelect={handleEmojiSelect}
            onCheckboxRemove={handleCheckboxRemove}
            onNoteRemove={handleNoteRemove}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onSendInArchive={handleSendInArchive}
            onTagClick={handleTagClick}
            style={editorStyle}
          ></NoteEditor>
        )}
        <AddNoteButton onButtonClick={CreateEmptyNote}></AddNoteButton>
        <NoteList
          filter={state.filterTags}
          getItemStyle={listItemStyle}
          notes={state.listOfLists}
          globalTags={state.tags}
          hideArchive={true}
          onNoteClick={handleNoteClick}
          onEmojiSelect={handleEmojiSelect}
        ></NoteList>
        <button
          onClick={() => {
            if (state.isArchiveOpen) {
              dispatch({ type: "CLOSE_ARCHIVE" });
            } else {
              dispatch({ type: "OPEN_ARCHIVE" });
            }
          }}
        >
          ARCHIVE
        </button>
        {state.isArchiveOpen && (
          <NoteList
            getItemStyle={listItemStyle}
            notes={state.listOfLists}
            // hideArchive={false}
            hideNotArchive={true}
            // hideNotSorted={false}
            onNoteClick={handleNoteClick}
            onEmojiSelect={handleEmojiSelect}
          ></NoteList>
        )}
        <TagsList tags={state.tags}></TagsList>
        <AddTagButton onButtonClick={handleTagAdd}></AddTagButton>
      </StyledWrapper>
    </>
  );
}

export default App;
