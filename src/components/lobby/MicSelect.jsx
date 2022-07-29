import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { MicDeviceId } from '../../store/micDevice';

const LocalMicDevice = ({ localMedia }) => {
  const [localMicDevice, setLocalMicDevice] = useState([]);
  const setMicDeviceId = useSetRecoilState(MicDeviceId);

  const handleSelect = async ($event) => {
    await localMedia.switchMic($event.target.value);
    setMicDeviceId($event.target.value);
  };

  useEffect(() => {
    (async () => {
      if (localMedia) {
        const devices = await localMedia.getMicDevices();
        setLocalMicDevice(devices);
      }
    })();
  }, [localMedia]);

  if (localMicDevice.length) {
    return (
      <div className='col-span-6 sm:col-span-3 mb-5'>
        <label className='block text-sm font-medium text-gray-700'>Microphone</label>
        <select
          onChange={handleSelect}
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        >
          {localMicDevice.map((item, i) => {
            return (
              <option key={i} value={item.deviceId}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};

export default LocalMicDevice;
