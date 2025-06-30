import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`;

const StyledCheckbox = styled.input`
  height: 20px;
  width: 20px;
`;

const StyledInput = styled.input`
  /* width: 100%; */
  flex-grow: 1;
  font-size: inherit;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  padding: 0;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 30px;
  font-size: inherit;
  opacity: 0;

  ${StyledContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export default function CheckboxItem({
  className,
  item,
  onTextChange,
  onStatusChange,
  onCheckboxRemove,
}) {
  return (
    <StyledContainer>
      <StyledCheckbox
        type="checkbox"
        checked={item.checked}
        onChange={() => onStatusChange(item.id)}
      />
      <StyledInput
        className={className}
        type="text"
        value={item.text}
        onChange={(e) => {
          onTextChange(item.id, e.target.value);
        }}
      />
      <StyledButton onClick={()=>{onCheckboxRemove(item.id)}}>Х</StyledButton>
    </StyledContainer>
  );
}
