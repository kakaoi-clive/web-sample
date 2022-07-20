import React, { useState } from 'react';
import Settings from './Settings';
import SidebarLinkGroup from './SidebarLinkGroup';
import LocalVideo from './LocalVideo';

import { useRecoilState } from 'recoil';
import { AudioOccupants } from '@/store/audioOccupants';
import { AlwaysOnAudio } from '@/store/alwaysOnAudio';

const Sidebar = ({ sidebarOpen, setSidebarOpen, remoteParticipants, onRemoteVideoIdClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [audioOccupants] = useRecoilState(AudioOccupants);
  const [alwaysOnAudio] = useRecoilState(AlwaysOnAudio);

  const onClick = (remoteVideo) => {
    onRemoteVideoIdClick(remoteVideo);
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

      {/* Sidebar */}
      <div
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-auto lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        <LocalVideo showModal={showModal} setShowModal={setShowModal} />

        <div className="space-y-8">
          <div>
            <h3 className="text-xs text-slate-500 font-semibold">참여자</h3>
            <ul className="mt-3">
            {
              remoteParticipants.map((participant, i)=>{
                return (
                <SidebarLinkGroup key={i}>
                  {() => {
                    return (
                      <React.Fragment>
                        <a href="#" className={`block text-slate-200 hover:text-white truncate transition duration-150 hover:text-slate-200`} onClick={(e) => { e.preventDefault(); }}>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              { participant.id }
                              { alwaysOnAudio.id === participant.id && <span>(AO)</span> }
                            </div>
                            { audioOccupants[participant.id] && <i className="fa fa-volume-up" /> }
                          </div>
                        </a>
                        <ul className={`pl-3 mt-1`}>
                          {
                            participant.videos.map((remoteVideo, i) => {
                              return (
                                <li className="mb-1" key={i}>
                                  <div className="truncate cursor-pointer" onClick={()=>{ onClick(remoteVideo); }}>
                                    {
                                      remoteVideo.active ? <span className="text-sm font-bold text-white">{ remoteVideo.getExtraValue() }</span> : <span className="text-sm font-medium text-slate-400 opacity-40">{ remoteVideo.getExtraValue() }</span>
                                    }
                                  </div>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                );
              })
            }
            </ul>
          </div>
        </div>
      </div>

      <Settings showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default Sidebar;