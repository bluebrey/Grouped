import React, { useState, useEffect } from 'react';
import moment from 'moment';

const AddInterface = ({ onClose, onSave, selectedEvent, fromCalendar }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [isSelfSelected, setIsSelfSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);

      // Format start and end dates to the correct string format
      const formattedStart = moment(selectedEvent.start).format('YYYY-MM-DDTHH:mm');
      const formattedEnd = moment(selectedEvent.end).format('YYYY-MM-DDTHH:mm');

      setStart(formattedStart);
      setEnd(formattedEnd);

      if (fromCalendar === 'individual') {
        setIsSelfSelected(true);
        setIsGroupSelected(false);
      }
    }
  }, [selectedEvent, fromCalendar]);

  const handleSave = () => {
    const event = {
      title,
      start,
      end,
      description,
    };

    onSave(event);
    onClose();
  };

  const toggleSelf = () => {
    setIsSelfSelected(true);
    setIsGroupSelected(false);
  };

  const toggleGroup = () => {
    setIsSelfSelected(false);
    setIsGroupSelected(true);
  };

  return (
    <div className="add-interface bg-[#e5e7eb] p-4 relative">
      {/* Close Button */}
      <button
        className="close-button absolute top-2 right-2 bg-red-500 text-black w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
        onClick={onClose}
      >
        <i className="text-xl">X</i>
      </button>
      <div className="overlay-content bg-[#e5e7eb] flex flex-col">
        <input
          className="h-12 m-2 text-2xl bg-[#e5e7eb]"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <div className="flex flex-wrap">
          <button
            id="Self"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isSelfSelected ? 'bg-cyan-200 text-black' : 'text-black'
            }`}
            onClick={toggleSelf}
          >
            Self
          </button>
          <button
            id="Group"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isGroupSelected ? 'bg-cyan-200 text-black' : 'text-black'
            }`}
            onClick={toggleGroup}
          >
            Group
          </button>
        </div>
        <br />
        <span className="text-lg">Start Time:</span>
        <input
          className="text-lg bg-[#e5e7eb]"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <br />
        <span className="text-lg">End Time:</span>
        <input
          className="text-lg bg-[#e5e7eb]"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <br />
        <textarea
          id="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-[#020617] bg-[#0ea5e9] rounded-lg border focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={handleSave}
            className="h-12 m-2 px-6 bg-gray-600 text-white"
          >
            Confirm
          </button>
          <button
            className="h-12 m-2 px-6 bg-gray-600 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInterface;