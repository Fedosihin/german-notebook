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
  ${({ $checked }) =>
    $checked &&
    `
    text-decoration: line-through;
    color: gray;
    opacity: 0.7;
  `}
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
`;

const StyledNewCheckbox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-color: ${({ checked }) => (checked ? "#2e2e2e" : "#ccc")};;
  border-radius: 4px;
  background: ${({ checked }) => (checked ? "transparent" : "transparent")};

  &::after {
    content: "✓";
    color: #131313;
    display: ${({ checked }) => (checked ? "block" : "none")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* ${({ $checked }) =>
    $checked &&
    `
    background: gray;
    color: gray;
    opacity: 0.7;
  `} */
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  /* Отключаем поглощение клика у детей */
  & * {
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  /* width: 100%; */
  flex-grow: 1;
  font-size: inherit;
  ${({ $checked }) =>
    $checked &&
    `
    text-decoration: line-through;
    color: gray;
    opacity: 0.7;
  `}
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
      <Label>
        <HiddenCheckbox
          checked={item.checked}
          onChange={() => onStatusChange(item.id)}
        ></HiddenCheckbox>
        <StyledNewCheckbox checked={item.checked}></StyledNewCheckbox>
        {/* <StyledCheckbox
        $checked={item.checked}
        type="checkbox"
        checked={item.checked}
        onChange={() => onStatusChange(item.id)}
      /> */}
      </Label>
      <StyledInput
        $checked={item.checked}
        className={className}
        type="text"
        value={item.text}
        onChange={(e) => {
          onTextChange(item.id, e.target.value);
        }}
      />
      <StyledButton
        onClick={() => {
          onCheckboxRemove(item.id);
        }}
      >
        Х
      </StyledButton>
    </StyledContainer>
  );
}
