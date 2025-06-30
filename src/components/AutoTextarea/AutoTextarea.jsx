import React from "react";
import styled from "styled-components";

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

export default function AutoTextarea({ value, onChange, ...props }) {
  const textareaRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
