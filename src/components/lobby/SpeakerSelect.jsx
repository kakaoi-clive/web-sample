import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SpeakerDeviceId } from '../../store/speakerDevice';

const LocalSpeakerDevice = ({ localMedia }) => {
  const [localSpeakerDevice, setLocalSpeakerDevice] = useState([]);
  const setSelectedSpeakerId = useSetRecoilState(SpeakerDeviceId);

  const handleSelect = ($event) => {
    setSelectedSpeakerId($event.target.value);
  };

  useEffect(() => {
    (async () => {
      if (localMedia) {
        setLocalSpeakerDevice(await localMedia.getSpeakerDevices());
      }
    })();
  }, [localMedia]);

  if (localSpeakerDevice.length) {
    return (
      <div className='col-span-6 sm:col-span-3 mb-5'>
        <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
          Speaker
        </label>
        <select
          onChange={handleSelect}
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        >
          {localSpeakerDevice.map((item, i) => {
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

export default LocalSpeakerDevice;