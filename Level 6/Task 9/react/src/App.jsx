import React, { useRef } from "react";
import './App.css'

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        type="text"
        className="border p-2 rounded-md"
        placeholder="Type something..."
      />
      <button
        onClick={handleFocus}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Focus Input
      </button>
    </div>
  );
};

export default InputFocus;
