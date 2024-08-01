import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteList from "./components/Notelist/Notelist";
import GroupModal from "./components/GroupModal/GroupModal";
import NoteEditor from "./components/Noteeditor/Noteeditor";
import Sidebar from "./components/Sidebar/Sidebar";
// import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState(null);

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
    const res = await axios.get("http://localhost:5000/groups");
    setGroups(res.data);
  };

  const fetchNotes = async (groupId) => {
    const res = await axios.get(`http://localhost:5000/notes/${groupId}`);
    setNotes(res.data);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleNewGroup = () => {
    setShowGroupModal(true);
  };

  const handleGroupSave = async (group) => {
    await axios.post("http://localhost:5000/groups", group);
    setShowGroupModal(false);
    fetchGroups();
  };

  const handleNoteSave = async (content) => {
    if (selectedGroupId) {
      await axios.post("http://localhost:5000/notes", {
        content,
        groupId: selectedGroupId,
      });
      fetchNotes(selectedGroupId);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        groups={groups}
        onGroupSelect={handleGroupSelect}
        onNewGroup={handleNewGroup}
      />
      <div className="flex-1 flex flex-col">
        <NoteList notes={notes} selectedGroup={selectedGroup} />
        {selectedGroupId && (
          <NoteEditor onSave={handleNoteSave} selectedGroup={selectedGroup} />
        )}
      </div>
      {showGroupModal && (
        <GroupModal
          onClose={() => setShowGroupModal(false)}
          onSave={handleGroupSave}
        />
      )}
    </div>
  );
}

export default App;
