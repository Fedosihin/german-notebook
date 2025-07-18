import React from "react";

export default function SmartTagsList({tags = [], note = {}, onClick = undefined}) {
  return (
    <ul>
        {tags.map((tag)=>{
          if (note.tags.includes(tag)) 
            return <li onClick={()=>onClick(tag)} key={tag}>{tag}+</li>
          else
            return <li onClick={()=>onClick(tag)} key={tag}>{tag}-</li>
        })}
    </ul>
  );
}
