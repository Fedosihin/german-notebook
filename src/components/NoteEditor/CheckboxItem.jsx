import React from "react";

export default function CheckboxItem({item, onTextChange, onStatusChange}) {
  return (
    <div className="checkbox-item">
        {console.log('item:')}
        {console.dir(item)}
        
      <input 
        type="checkbox"
        checked={item.checked}
        onChange={() => onStatusChange(item.id)}
      />
      <input
        type="text"
        value={item.text}
        onChange={(e) => {onTextChange(item.id, e.target.value)}}
      />
    </div>
  );
}
