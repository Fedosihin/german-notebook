import React from "react";

export default function SmartTagsList2({
  tags = [],
  filter = [],
  onClick = undefined,
})

{

  return (
    <ul>
      {tags.map((tag) => {
        if (filter.includes(tag))
          return (
            <li onClick={() => onClick(tag)} key={tag}>
              {tag}+
            </li>
          );
        else
          return (
            <li onClick={() => onClick(tag)} key={tag}>
              {tag}-
            </li>
          );
      })}
    </ul>
  );
}
