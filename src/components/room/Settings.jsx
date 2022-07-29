import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CameraDeviceId } from '@/store/cameraDevice';
import { MicDeviceId } from '@/store/micDevice';
import { SpeakerDeviceId } from '@/store/speakerDevice';
import { Conf } from '@/store/conf';
import { LocalAudio } from '@/store/localAudio';
import { LocalVideo } from '@/store/localVideo';

const Settings = ({ showModal, setShowModal }) => {
  const [cameraDevices, setCameraDevices] = useState([]);
  const [micDevices, setMicDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([]);

  const [cameraDeviceId, setCameraDeviceId] = useRecoilState(CameraDeviceId);
  const [micDeviceId, setMicDeviceId] = useRecoilState(MicDeviceId);
  const [speakerDeviceId, setSpeakerDeviceId] = useRecoilState(SpeakerDeviceId);

  const [_micDeviceId, _setMicDeviceId] = useState('');
  const [_cameraDeviceId, _setCameraDeviceId] = useState('');
  const [_speakerDeviceId, _setSpeakerDevice] = useState('');

  const [conf] = useRecoilState(Conf);
  const [localAudio] = useRecoilState(LocalAudio);
  const [localVideo] = useRecoilState(LocalVideo);

  const onChangeCameraDevice = (evt) => {
    _setCameraDeviceId(evt.target.value);
  };

  const onChangeMicDevice = (evt) => {
    _setMicDeviceId(evt.target.value);
  };

  const onChangeSpeakerDevice = (evt) => {
    _setSpeakerDevice(evt.target.value);
  };

  const onClick = async () => {
    _micDeviceId && (await localAudio.switchMic(_micDeviceId));
    _cameraDeviceId && (await localVideo.switchCamera(_cameraDeviceId));
    _speakerDeviceId && (await conf.switchSpeaker(_speakerDeviceId));

    setMicDeviceId(_micDeviceId);
    setCameraDeviceId(_cameraDeviceId);
    setSpeakerDeviceId(_speakerDeviceId);

    setShowModal(false);
  };

  useEffect(() => {
    if (!localAudio && localVideo) {
      return;
    }

    (async () => {
      if (localAudio) {
        const _micDevices = await localAudio.getMicDevices();
        const _cameraDevices = await localAudio.getCameraDevices();

        const _speakerDevices = await localAudio.getSpeakerDevices();

        setCameraDevices(_cameraDevices);
        setMicDevices(_micDevices);
        setSpeakerDevices(_speakerDevices);
      }
    })();
  }, [localAudio]);

  return (
    <div>
      {showModal ? (
        <>
          <div className='fixed z-50 inset-0'>
            <div className='text-center'>
              <div
                className='fixed inset-0 bg-gray-500 bg-opacity-75'
                onClick={() => setShowModal(false)}
              ></div>

              <div className='relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full text-gray-700'>
                <form className='bg-white px-4 pt-5 pb-4'>
                  <h3 className='text-black mb-5 font-bold'>설정</h3>
                  <div className='col-span-6 sm:col-span-3 mb-6'>
                    <label className='block text-sm font-medium'>카메라</label>
                    <select
                      className='w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      value={cameraDeviceId}
                      onChange={onChangeCameraDevice}
                    >
                      {cameraDevices.map((camera, i) => {
                        return (
                          <option key={i} value={camera.deviceId}>
                            {camera.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-3 mb-6'>
                    <label className='block text-sm font-medium'>마이크</label>
                    <select
                      className='w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      value={micDeviceId}
                      onChange={onChangeMicDevice}
                    >
                      {micDevices.map((mic, i) => {
                        return (
                          <option key={i} value={mic.deviceId}>
                            {mic.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-3 mb-6'>
                    <label className='block text-sm font-medium'>스피커</label>
                    <select
                      className='w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      value={speakerDeviceId}
                      onChange={onChangeSpeakerDevice}
                    >
                      {speakerDevices.map((speaker, i) => {
                        return (
                          <option key={i} value={speaker.deviceId}>
                            {speaker.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </form>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    onClick={onClick}
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Settings;
