import React, { useState } from "react";

function Sidebar({ groups, onGroupSelect, onNewGroup }) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const getGroupInitials = (name) => {
    const words = name.split(" ");
    const initials = words
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2);
    return initials.join("");
  };

  const getGroupInitials2 = (name) => {
    const words = name.split(" ");
    const initials = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .slice(0, 2);
    return initials.join(" ");
  };

  const handleGroupSelect = (id) => {
    setSelectedGroupId(id); 
    onGroupSelect(id); 
  };

  return (
    <div className="w-64 bg-white text-black h-full relative overflow-hidden">
      <div className="p-4 mb-4 text-black">
        <h2 className="text-2xl">Pocket Notes</h2>
      </div>
      <div className="p-4 absolute bottom-10 right-5 rounded-full">
        <button
          onClick={onNewGroup}
          className="bg-[#16008B] flex justify-center items-center py-2 rounded-full w-[50px] h-[50px]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 35 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.3672 14.7246V22.1416H0.255859V14.7246H34.3672ZM21.3105 0.779297V37.0098H13.3467V0.779297H21.3105Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <ul className="h-screen overflow-y-auto">
        {groups.map((group) => (
          <li
            key={group._id}
            className={`px-4 py-2 cursor-pointer opacity-60 max-md:opacity-100 ${
              selectedGroupId === group._id ? "bg-[#2f2f2f36] opacity-100" : ""
            }`}
            onClick={() => handleGroupSelect(group._id)}
          >
            <div className="flex items-center justify-start text-[18px] gap-4">
              <span
                style={{ backgroundColor: group.color }}
                className="h-[50px] w-[50px] text-[21px] rounded-full text-[white] flex items-center justify-center"
              >
                {getGroupInitials(group.name)}
              </span>
              {getGroupInitials2(group.name)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
