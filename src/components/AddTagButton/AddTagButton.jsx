import React from "react";
import { useState } from "react";

export default function AddTagButton({ onButtonClick}) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <input value={value} onChange={handleChange} placeholder="Set Tag"></input>
      <button onClick={()=>{onButtonClick(value); setValue('');}}>Add tag</button>
    </>
  );
}
