import React, { useRef, useEffect, useState } from "react";

function GroupModal({ onClose, onSave }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, color });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-4 rounded w-[30%]">
        <h1 className="text-[22px] font-bold mb-5">Create New Group</h1>
        <div className="mb-4 flex w-full">
          <label className="block mb-2 font-semibold w-[50%]">Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 flex w-full">
          <label className="block mb-2 font-semibold w-[50%]">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded h-10"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 py-2 px-4 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupModal;
