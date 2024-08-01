import React, { useState } from "react";

function NoteEditor({ onSave, selectedGroup }) {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const backgroundColor = selectedGroup ? selectedGroup.color : "#ffffff";

  return (
    <div
      className="p-4 border-t sticky w[82%] bottom-0 maxw-[1300px]"
      style={{ backgroundColor }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full p-2 border rounded"
        placeholder="Enter your text here..."
      ></textarea>
      <button
        onClick={handleSave}
        className="mt-2 wfull py-2 rounded  fle  absolute left-[95%]"
        disabled={!content.trim()}
      >
        <svg
          width="35"
          height="29"
          viewBox="0 0 35 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
            fill="#ABABAB"
          />
        </svg>
      </button>
    </div>
  );
}

export default NoteEditor;
