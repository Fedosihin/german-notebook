import React from "react";

export default function PlaceholderSpan({ children, placeholder }) {
  const isEmpty = React.Children.count(children) === 0 || 
                 (typeof children === 'string' && children.trim() === '');
  
  return (
    <span style={{ 
      color: isEmpty ? '#999' : 'inherit',
      fontStyle: isEmpty ? 'italic' : 'normal'
    }}>
      {isEmpty ? placeholder : children}
    </span>
  );
}
