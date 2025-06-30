import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: red;
`;

export default function RemoveNoteButton({onButtonClick, note}) {
  return <StyledButton onClick={()=>{onButtonClick(note.id)}}>Удалить запись</StyledButton>;
}