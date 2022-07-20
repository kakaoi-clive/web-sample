import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '@heroicons/react/solid';

import { useRecoilState } from 'recoil';
import { Conf } from '@/store/conf';
import { LocalAudio } from '@/store/localAudio';
import { LocalVideo } from '@/store/localVideo';
import { LocalScreen } from '@/store/localScreen';
import { RoomNameState } from '@/store/roomNameState';

const Header = ({ sidebarOpen, setSidebarOpen }) => {

  const navigate = useNavigate();

  const [conf, setConf] = useRecoilState(Conf);
  const [localAudio, setLocalAudio] = useRecoilState(LocalAudio);
  const [localVideo, setLocalVideo] = useRecoilState(LocalVideo);
  const [localScreen, setLocalScreen] = useRecoilState(LocalScreen);

  const [roomName] = useRecoilState(RoomNameState);

  const onDisconnect = () => {
    setLocalAudio(null);
    setLocalVideo(null);
    setLocalScreen(null);

    conf.disconnect();

    setConf(null);
    navigate('/');
  }

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="mr-4 text-slate-500 hover:text-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <h3 className="text-black">{ roomName }</h3>
          </div>

          {/* Header: Right side */}
          <div className="flex justify-end">
          <button
              className="text-slate-500 hover:text-slate-600"
              onClick={onDisconnect}
            >
              <LogoutIcon className="h-7 w-7"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;