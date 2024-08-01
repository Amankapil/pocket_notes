import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteList from "./components/Notelist/Notelist";
import GroupModal from "./components/GroupModal/GroupModal";
import NoteEditor from "./components/Noteeditor/Noteeditor";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchNotes(selectedGroupId);
      const group = groups.find((g) => g._id === selectedGroupId);
      setSelectedGroup(group);
    } else {
      setNotes([]);
      setSelectedGroup(null);
    }
  }, [selectedGroupId, groups]);

  const fetchGroups = async () => {
    const res = await axios.get(
      "https://pocket-notes-backend-1.onrender.com/groups"
    );
    setGroups(res.data);
  };

  const fetchNotes = async (groupId) => {
    const res = await axios.get(
      `https://pocket-notes-backend-1.onrender.com/notes/${groupId}`
    );
    setNotes(res.data);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleNewGroup = () => {
    setShowGroupModal(true);
  };

  const handleGroupSave = async (group) => {
    await axios.post(
      "https://pocket-notes-backend-1.onrender.com/groups",
      group
    );
    setShowGroupModal(false);
    fetchGroups();
  };

  const handleNoteSave = async (content) => {
    if (selectedGroupId) {
      const res = await axios.post(
        "https://pocket-notes-backend-1.onrender.com/notes",
        {
          content,
          groupId: selectedGroupId,
        }
      );
      setNotes([...notes, res.data]);
    }
  };

  const handleBackButton = () => {
    setSelectedGroupId(null);
  };

  let [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const backgroundColor = selectedGroup ? selectedGroup.color : "#ffffff";

  return (
    <>
      {width <= 900 ? (
        <>
          <div className="h-screen">
            {selectedGroupId ? (
              <div className="flex flex-col h-full">
                <div
                  className="flex items-center p-4 "
                  style={{ backgroundColor }}
                >
                  <button onClick={handleBackButton} className="mr-4">
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.27495 10.85C6.47495 10.65 6.57095 10.4083 6.56295 10.125C6.55495 9.84167 6.45061 9.6 6.24995 9.4L3.42495 6.575H14.5749C14.8583 6.575 15.0959 6.479 15.2879 6.287C15.4799 6.095 15.5756 5.85767 15.5749 5.575C15.5749 5.29167 15.4789 5.054 15.2869 4.862C15.0949 4.67 14.8576 4.57433 14.5749 4.575H3.42495L6.27495 1.725C6.47495 1.525 6.57495 1.28733 6.57495 1.012C6.57495 0.736666 6.47495 0.499333 6.27495 0.3C6.07495 0.0999997 5.83728 0 5.56195 0C5.28661 0 5.04928 0.0999997 4.84995 0.3L0.274948 4.875C0.174948 4.975 0.103947 5.08333 0.0619469 5.2C0.0199471 5.31667 -0.000720024 5.44167 -5.34058e-05 5.575C-5.34058e-05 5.70833 0.0209484 5.83333 0.0629482 5.95C0.104948 6.06667 0.175614 6.175 0.274948 6.275L4.87495 10.875C5.05828 11.0583 5.28728 11.15 5.56195 11.15C5.83661 11.15 6.07428 11.05 6.27495 10.85Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <h1 className="text-2xl text-white">{selectedGroup?.name}</h1>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <NoteList notes={notes} selectedGroup={selectedGroup} />
                </div>
                <div>
                  <NoteEditor
                    onSave={handleNoteSave}
                    selectedGroup={selectedGroup}
                  />
                </div>
              </div>
            ) : (
              <Sidebar
                groups={groups}
                onGroupSelect={handleGroupSelect}
                onNewGroup={handleNewGroup}
              />
            )}
            {showGroupModal && (
              <GroupModal
                onClose={() => setShowGroupModal(false)}
                onSave={handleGroupSave}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex h-screen">
            <Sidebar
              groups={groups}
              onGroupSelect={handleGroupSelect}
              onNewGroup={handleNewGroup}
            />
            <div className="flex-1 flex flex-col">
              <NoteList notes={notes} selectedGroup={selectedGroup} />
              {selectedGroupId && (
                <NoteEditor
                  onSave={handleNoteSave}
                  selectedGroup={selectedGroup}
                />
              )}
            </div>
            {showGroupModal && (
              <GroupModal
                onClose={() => setShowGroupModal(false)}
                onSave={handleGroupSave}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
