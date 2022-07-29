import { useState, useEffect, useRef } from 'react';
import ConnectLive from '@connectlive/connectlive-web-sdk';

import { CogIcon } from '@heroicons/react/solid';

import { useRecoilState } from 'recoil';
import { CameraDeviceId } from '../../store/cameraDevice';
import { Conf } from '@/store/conf';
import { LocalAudio } from '@/store/localAudio';
import { LocalVideo } from '@/store/localVideo';
import { LocalScreen } from '@/store/localScreen';

const LocalScreenComp = () => {
  const ref = useRef(null);

  const [conf] = useRecoilState(Conf);
  const [localScreen, setLocalScreen] = useRecoilState(LocalScreen);

  const handleStop = async () => {
    await conf.unpublish([localScreen]);
    setLocalScreen(null);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localScreen) {
      return;
    }

    ref.current.srcObject = localScreen.video.getMediaStream();
  }, [ref, localScreen]);

  return (
    <div className='mb-5 relative'>
      <video ref={ref} muted autoPlay playsInline></video>

      <div className='absolute left-0 right-0 bottom-0 h-10 w-100 flex place-content-evenly'>
        <button
          onClick={() => {
            handleStop();
          }}
        >
          <img src="./icons/screenShareStop.svg" />
        </button>
      </div>
    </div>
  );
};

const LocalVideoComp = ({ showModal, setShowModal }) => {
  const ref = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  const [cameraDeviceId] = useRecoilState(CameraDeviceId);

  const [conf] = useRecoilState(Conf);
  const [localAudio, setLocalAudio] = useRecoilState(LocalAudio);
  const [localVideo, setLocalVideo] = useRecoilState(LocalVideo);
  const [localScreen, setLocalScreen] = useRecoilState(LocalScreen);

  const [alwaysOn, setAlwaysOn] = useState(false);

  const handleEnabledAlwaysAudio = () => {
    const _alwaysOn = !alwaysOn;
    setAlwaysOn(_alwaysOn);

    localAudio.audio.setAlwaysOn(_alwaysOn);
  };

  const handleEnabledAudio = async () => {
    const enabled = !audioEnabled;
    setAudioEnabled(enabled);

    if (localAudio) {
      localAudio.audio.setEnabled(enabled);
    } else {
      //새로 생성후 publish
      const audio = await ConnectLive.createLocalMedia({
        audio: true,
      });

      setLocalAudio(audio);

      await conf.publish([audio]);
    }
  };

  const handleEnabledVideo = async () => {
    const enabled = !videoEnabled;
    setVideoEnabled(enabled);

    if (localVideo) {
      localVideo.video.setEnabled(enabled);
    } else {
      //새로 생성후 publish
      const video = await ConnectLive.createLocalMedia({
        video: true,
      });

      setLocalVideo(video);

      await conf.publish([video]);
    }
  };

  const onClickScreenShareStart = async () => {
    const screen = await ConnectLive.createLocalScreen({
      video: true,
      audio: true,
    });
    screen.video.setExtraValue('screen');
    await conf.publish([screen]);

    setLocalScreen(screen);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localAudio) {
      return;
    }

    setAudioEnabled(localAudio?.audio.mediaStreamTrack.enabled);
  }, [ref, localAudio]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localVideo) {
      return;
    }

    setVideoEnabled(localVideo?.video.mediaStreamTrack.enabled);

    ref.current.srcObject = localVideo.video.getMediaStream();
  }, [ref, localVideo]);

  useEffect(() => {
    if (localVideo) {
      ref.current.srcObject = localVideo.video.getMediaStream();
    }
  }, [cameraDeviceId]);

  return (
    <>
      <div className='mb-5 relative'>
        <video ref={ref} muted autoPlay playsInline></video>

        <div className='absolute left-0 right-0 bottom-0 h-10 w-100 flex place-content-evenly'>
          {alwaysOn ? (
            <button
              className='text-red-500 font-bold'
              onClick={handleEnabledAlwaysAudio}
            >
              AO
            </button>
          ) : (
            <button
              className='font-bold'
              onClick={handleEnabledAlwaysAudio}
            >
              AO
            </button>
          )}

          <button
            onClick={handleEnabledAudio}
          >
            {audioEnabled ? <img src="./icons/mic.svg" /> : <img src="./icons/micDisabled.svg" />}
          </button>
          <button
            onClick={handleEnabledVideo}
          >
            {videoEnabled ? <img src="./icons/camera.svg" /> : <img src="./icons/cameraDisabled.svg" />}
          </button>
          {!localScreen && (
            <button
              onClick={onClickScreenShareStart}
            >
              <img src="./icons/screenShare.svg" />
            </button>
          )}

          <button className='mr-2'>
            <CogIcon className='h-7 w-7' onClick={() => setShowModal(!showModal)} />
          </button>
        </div>
      </div>
      {localScreen && <LocalScreenComp />}
    </>
  );
};
export default LocalVideoComp;
