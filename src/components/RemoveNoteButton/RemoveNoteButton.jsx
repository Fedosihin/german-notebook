import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: red;
`;

export default function RemoveNoteButton({onButtonClick}) {
  return <StyledButton onClick={()=>{onButtonClick()}}>Удалить запись</StyledButton>;
}