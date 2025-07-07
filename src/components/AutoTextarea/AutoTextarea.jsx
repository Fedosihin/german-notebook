import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: 1px solid #ccc; /* Для наглядности */
  resize: none;
  overflow: hidden;
  padding: 8px; /* Теперь padding безопасен */
  box-sizing: border-box; /* Лучшая практика */
  font-family: inherit;
  line-height: 1.4; /* Может быть любым - компонент подстроится */
  min-height: 0; /* Важно для динамического расчета */
`;
export default function AutoTextarea({ value, onChange, ...props }) {
  const textareaRef = React.useRef(null);
  const [lineHeight, setLineHeight] = React.useState(20); // Начальное приближение

  // Получаем реальный line-height после первого рендера
  React.useLayoutEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      setLineHeight(parseInt(computedStyle.lineHeight, 10) || 20);
    }
  }, []);

  // Автоподстройка высоты
  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = value.split('\n').length <= 1 
        ? lineHeight + 'px'  // Для одной строки - ровно line-height
        : textarea.scrollHeight + 'px'; // Для нескольких строк - по содержимому
        
      // Добавляем padding, если он есть (важно при box-sizing: content-box)
      const padding = parseInt(window.getComputedStyle(textarea).paddingTop, 10) + 
                     parseInt(window.getComputedStyle(textarea).paddingBottom, 10) || 0;
      
      textarea.style.height = `calc(${newHeight} + ${padding}px)`;
    }
  }, [value, lineHeight]);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}