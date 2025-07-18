import React from "react";

export default function TagsList({tags = []}) {
  return (
    <ul>
        {tags.map((tag)=>{
            return <li key={tag}>{tag}</li>
        })}
    </ul>
  );
}
