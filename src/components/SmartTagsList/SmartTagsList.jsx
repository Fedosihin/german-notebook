import React from "react";

export default function SmartTagsList({
  tags = [],
  note = {},
  onClick = undefined,
}) {
  return (
    <ul>
      {/* ПЕРЕДЕЛАТЬ  ДЛЯ СТАРЫХ ЗАПИСЕЙ  */}
      {tags.map((tag) => {
        if (!("tags" in note)) {
          note.tags = [];
        }

        if (note.tags.includes(tag))
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
