const RoomName = ({ roomName, setRoomName }) => {
  return (<div className="col-span-6 sm:col-span-3">
    <label className="block text-sm font-medium text-gray-700">Room Name</label>
    <input 
      type="text" 
      value={roomName}
      onChange={(evt)=>{ setRoomName(evt.target.value); }}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
      required 
    />
  </div>);
};

export default RoomName;