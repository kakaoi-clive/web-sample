import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectLive from '@connectlive/connectlive-web-sdk';
import Alert from '@/components/common/Alert';
import CameraSelect from '@/components/robby/CameraSelect';
import MicSelect from '@/components/robby/MicSelect';
import SpeakerSelect from '@/components/robby/SpeakerSelect';
import RoomName from '@/components/robby/RoomName';
import Settings from '@/components/robby/Settings';
import SdkInfo from '@/components/SdkInfo';
import LocalVideo from '@/components/robby/LocalVideo';

import MicIcon from '@/components/icons/Mic';
import MicDisabledIcon from '@/components/icons/MicDisabled';
import CameraIcon from '@/components/icons/Camera';
import CameraDisabledIcon from '@/components/icons/CameraDisabled';

import { useRecoilState } from 'recoil';
import { Conf } from '@/store/conf';
import { ServiceInfo } from '@/store/serviceInfo';
import { RoomNameState } from '@/store/roomNameState';
import { MicDeviceActive } from '@/store/micDeviceActive';
import { CameraDeviceActive } from '@/store/cameraDeviceActive';

import { delay } from '@/utils/delay';

const Robby = () => {
  const [localMedia, setLocalMedia] = useState(null);

  const [isAlertShow, setIsAlertShow] = useState(false);

  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingMsg, setConnectingMsg] = useState('');
  
  const [serviceInfo] = useRecoilState(ServiceInfo);
  const [roomNameState, setRoomNameState] = useRecoilState(RoomNameState);

  const [activeMic, setActiveMic] = useRecoilState(MicDeviceActive);
  const [activeCamera, setActiveCamera] = useRecoilState(CameraDeviceActive);

  const [conf, setConf] = useRecoilState(Conf);

  const navigate = useNavigate();

  ConnectLive.logger.setLevel('trace');

  useEffect(()=>{
    (async () => {
      const _localMedia = await ConnectLive.createLocalMedia({
        video: true,
      });
      setLocalMedia(_localMedia);
    })();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let auth = {};
    if(serviceInfo.type === 'internal' && serviceInfo.internal.serviceId && serviceInfo.internal.serviceKey && serviceInfo.internal.secret) {
      auth = serviceInfo.internal;
    } else if(serviceInfo.type === 'external' && serviceInfo.external.serviceId && serviceInfo.external.token) {
      auth = serviceInfo.external;
    } else {
      setIsAlertShow(true);
      return;
    }

    await ConnectLive.signIn(auth);
    const _conf = ConnectLive.createRoom();
    _conf.on('connecting', async (evt)=>{
      const progress = Math.floor(evt.progress);
      if(progress <= 33) {
        setConnectingMsg('Room Connected');
      } else if(progress <= 66) {
        setConnectingMsg('UpSession Succeed');
      } else if(progress <= 100) {
        setConnectingMsg('DownSession Succeed');
        await delay(2000);

        navigate('/room');
        setIsConnecting(false);
      }
    });
    
    setConf(_conf);

    setIsConnecting(true);
    await _conf.connect(roomNameState);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="relative">
          <LocalVideo localMedia={localMedia} activeCamera={activeCamera} />
          <div className="absolute m-auto left-0 right-0 bottom-0 h-10 w-20 flex place-content-between">
            <button onClick={()=>{ setActiveMic(!activeMic); }}>
              { activeMic ? <MicIcon /> : <MicDisabledIcon />}
            </button>
            <button onClick={()=>{ setActiveCamera(!activeCamera); }}>
              { activeCamera ? <CameraIcon /> : <CameraDisabledIcon />}
            </button>
          </div>
        </div>
        {
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden">
              <div className="px-4 py-5 bg-white sm:p-6">
                <CameraSelect localMedia={localMedia} />
                <MicSelect localMedia={localMedia} />
                <SpeakerSelect localMedia={localMedia} />
                <RoomName roomName={roomNameState} setRoomName={setRoomNameState} />
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {
                  isConnecting ? <button disabled
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-indigo-200">
                      <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg> {connectingMsg}...
                    </button> : 
                  <button type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Connect</button>
                }
              </div>
            </div>
          </form>
        </div>
        }
      </div>
      <Settings />
      <SdkInfo />
      <Alert desc="서비스 정보를 확인해주세요" show={isAlertShow} setShow={setIsAlertShow} />
    </div>
  );
}
  
export default Robby;
  