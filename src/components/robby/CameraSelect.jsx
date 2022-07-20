import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CameraDeviceId } from '../../store/cameraDevice';

const LocalCameraDevice = ({ localMedia }) => {
  const [localCameraDevice, setLocalCameraDevice] = useState([]);
  const [cemeraDeviceId, setCameraDeviceId] = useRecoilState(CameraDeviceId);

  const handleSelect = ($event) => {
    localMedia.switchCamera($event.target.value).then(()=>{
      setCameraDeviceId($event.target.value);
    });
  }

  useEffect(()=>{
    (async () => {
      if(localMedia) {
        const devices = await localMedia.getCameraDevices()
        setLocalCameraDevice(devices);
      }
    })();
  }, [localMedia]);

  if (localCameraDevice.length) {
    return (<div className="col-span-6 sm:col-span-3 mb-5">
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Camera</label>
      <select onChange={handleSelect} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {
          localCameraDevice.map((item, i)=>{
              return (<option 
                key={i}
                value={item.deviceId}
                >{item.label}</option>
              );
          })
          }
      </select>
    </div>);
  }
};

export default LocalCameraDevice;