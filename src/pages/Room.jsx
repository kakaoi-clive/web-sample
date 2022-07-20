import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ConnectLive from '@connectlive/connectlive-web-sdk';
import Header from '../components/room/Header';
import Sidebar from '../components/room/Sidebar';
import RemoteVideo from '../components/room/RemoteVideo';

import { useRecoilState } from 'recoil';
import { CameraDeviceId } from '@/store/cameraDevice';
import { MicDeviceId } from '@/store/micDevice';
import { RoomNameState } from '@/store/roomNameState';
import { MicDeviceActive } from '@/store/micDeviceActive';
import { CameraDeviceActive } from '@/store/cameraDeviceActive';
import { Conf } from '@/store/conf';
import { LocalAudio } from '@/store/localAudio';
import { LocalVideo } from '@/store/localVideo';
import { AudioOccupants } from '@/store/audioOccupants';
import { AlwaysOnAudio } from '@/store/alwaysOnAudio';

const Robby = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [roomName] = useRecoilState(RoomNameState);
  const [activeMic] = useRecoilState(MicDeviceActive);
  const [activeCamera] = useRecoilState(CameraDeviceActive);

  const [gridSize, setGridSize] = useState(1);

  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [remoteParticipantVideos, setRemoteParticipantVideos] = useState([]);
  const [remoteSubscribeVideos, setRemoteSubscribeVideos] = useState([]);

  const [cameraDeviceId] = useRecoilState(CameraDeviceId);
  const [micDeviceId] = useRecoilState(MicDeviceId);

  const [conf] = useRecoilState(Conf);
  const [localAudio, setLocalAudio] = useRecoilState(LocalAudio);
  const [localVideo, setLocalVideo] = useRecoilState(LocalVideo);

  const [audioOccupants, setAudioOccupants] = useRecoilState(AudioOccupants);
  const [alwaysOnAudio, setAlwaysOnAudio] = useRecoilState(AlwaysOnAudio);

  const onRemoteVideClick = (remoteVideo)=> {
    setRemoteParticipantVideos(()=>{
      const remoteVideoIds = remoteParticipantVideos.filter(_remoteVideId => _remoteVideId !== remoteVideo.videoId);
      remoteVideoIds.unshift(remoteVideo.videoId);
      return remoteVideoIds;
    });

    setGridSize(1);
  }

  const onRemoteVideoIdClick = (remoteVideo) => {
    setRemoteParticipantVideos(()=>{
      const remoteVideoIds = remoteParticipantVideos.filter(_remoteVideId => _remoteVideId !== remoteVideo.videoId);
      remoteVideoIds.unshift(remoteVideo.videoId);
      return remoteVideoIds;
    });
  }

  const init = async () => {
    try{
      const _conf = conf;
      let _localAudio;
      let _localVideo;

      if(activeMic) {
        let constraint = {
          audio: activeMic,
        };

        if(micDeviceId && typeof micDeviceId === 'string') {
          constraint.audio = { deviceId: { exact: micDeviceId } };
        }
        _localAudio = await ConnectLive.createLocalMedia(constraint);
        setLocalAudio(_localAudio);
      }

      if(activeCamera) {
        let constraint = {
          video: activeCamera
        };

        if(cameraDeviceId && typeof cameraDeviceId === 'string'){
          constraint.video = { deviceId: { exact: cameraDeviceId } };
        } 

        _localVideo = await ConnectLive.createLocalMedia(constraint);
        _localVideo.video.setExtraValue('camera');
        setLocalVideo(_localVideo);
      }
/*
      _conf.on('connected', async (evt)=>{
        evt.remoteParticipants.forEach(async participant => {
          const unsubscribedVideos = participant.getUnsubscribedVideos();
          if (unsubscribedVideos.length) {
            const videoIds = unsubscribedVideos.map(video => video.getVideoId());
            setRemoteParticipantVideos(oldRemoteParticipantVideos => [...oldRemoteParticipantVideos, ...videoIds]);
          }

          Object.values(_conf.audioOccupants).forEach((audio)=>{
            setAudioOccupants(oldAudioOccupants => {
              const o = { ...oldAudioOccupants };
              o[audio.id] = true;
              return o;
            });
          });
  
          setRemoteParticipants(oldRemoteParticipants => [...oldRemoteParticipants, participant]);
        });
      });
*/

      _conf.on('participantEntered', (evt)=>{
        setRemoteParticipants(oldRemoteParticipants => [...oldRemoteParticipants, evt.remoteParticipant]);
      });

      _conf.on('remoteVideoPublished', async (evt)=>{
        setRemoteParticipantVideos(oldRemoteParticipantVideos => [...oldRemoteParticipantVideos, evt.remoteVideo.videoId]);
      });

      _conf.on('remoteVideoUnpublished', async (evt)=>{
        setRemoteParticipantVideos(oldRemoteParticipantVideos => {
          return oldRemoteParticipantVideos.filter(remoteVideoId => {
            return evt.remoteVideo.videoId !== remoteVideoId;
          });
        });


        setRemoteSubscribeVideos(oldRemoteSubscribeVideos => {
          return oldRemoteSubscribeVideos.filter(remoteVideo => {
            return evt.remoteVideo.videoId !== remoteVideo.videoId;
          });
        });
      });

      _conf.on('participantLeft', async (evt)=>{
        setRemoteParticipants(oldRemoteParticipants => {
          return oldRemoteParticipants.filter(participant => {
            return evt.remoteParticipantId !== participant.id;
          });
        });
      });

      _conf.on('remoteVideoStateChanged', async ()=>{
        setRemoteSubscribeVideos(oldRemoteSubscribeVideos => [ ...oldRemoteSubscribeVideos ]);
      });

      _conf.on('remoteAudioPublished', async (evt)=>{
        setAudioOccupants(oldAudioOccupants => {
          const o = { ...oldAudioOccupants };
          o[evt.remoteParticipant.id] = true;
          return o;
        });
      });

      _conf.on('remoteAudioUnpublished', async (evt)=>{
        setAudioOccupants(oldAudioOccupants => {
          const o = { ...oldAudioOccupants };
          o[evt.remoteParticipant.id] = false;
          return o;
        });
      });

      _conf.on('remoteAudioStateChanged', async (evt)=>{
        if(evt.remoteAudio.isAlwaysOn) {
          setAlwaysOnAudio(evt.remoteParticipant);
        } else {
          setAlwaysOnAudio({});
        }
      });

      _conf.remoteParticipants.forEach(async participant => {
        const unsubscribedVideos = participant.getUnsubscribedVideos();
        if (unsubscribedVideos.length) {
          const videoIds = unsubscribedVideos.map(video => video.getVideoId());
          setRemoteParticipantVideos(oldRemoteParticipantVideos => [...oldRemoteParticipantVideos, ...videoIds]);
        }

        Object.values(_conf.audioOccupants).forEach((audio)=>{
          setAudioOccupants(oldAudioOccupants => {
            const o = { ...oldAudioOccupants };
            o[audio.id] = true;
            return o;
          });
        });

        setRemoteParticipants(oldRemoteParticipants => [...oldRemoteParticipants, participant]);
      });

      //await _conf.connect(roomName);
      if(_localAudio) {
        await _conf.publish([_localAudio]);
      }

      if(_localVideo) {
        await _conf.publish([_localVideo]);
      }
    } catch(err) {
      console.log(err);
      navigate('/');
    }
  };

  useEffect(()=>{
    if(conf && !localAudio && !localVideo) {
      init();
    } else {
      navigate('/');
    }
  }, [conf]);

  useEffect(()=>{
    (async ()=>{
      if(!conf) {
        return;
      }

      const unsubscribeVideoIds = remoteSubscribeVideos.map(remoteVideo => remoteVideo.videoId);
      unsubscribeVideoIds.length && await conf.unsubscribe(unsubscribeVideoIds);

      let remoteVideos = [];
      const results = await Promise.allSettled(remoteParticipantVideos.slice(0, gridSize * gridSize).map(videoId => conf.subscribe([videoId])));
      results.forEach(res =>{
        if(res.value) {
          remoteVideos = [...remoteVideos, ...res.value];
        }
      });
      setRemoteSubscribeVideos([...remoteVideos]);
    })();
  }, [remoteParticipantVideos, gridSize]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} remoteParticipants={remoteParticipants} onRemoteVideoIdClick={onRemoteVideoIdClick} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-8 py-8 w-full">
            <div className="text-right">
              <select className="w-20 py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={gridSize} onChange={(event)=>{ setGridSize(parseInt(event.target.value)); }}>
                <option value="1">1 X 1</option>
                <option value="2">2 X 2</option>
                <option value="3">3 X 3</option>
                <option value="5">5 X 5</option>
                <option value="7">7 X 7</option>
              </select>
            </div>

            <div className={`grid grid-cols-${gridSize} gap-${gridSize}`}>
                {
                  remoteSubscribeVideos.map((remoteVideo, i) => {
                    return (<div className="p-2 flex justify-center items-center relative" key={i}>
                      <RemoteVideo remoteVideo={remoteVideo} click={ onRemoteVideClick }/>
                    </div>)
                  })
                }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
  
export default Robby;
  