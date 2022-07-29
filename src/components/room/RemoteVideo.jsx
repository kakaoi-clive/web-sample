import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { AudioOccupants } from '@/store/audioOccupants';

const RemoteVideo = ({ remoteVideo, click }) => {
  const ref = useRef(null);
  const [audioOccupants] = useRecoilState(AudioOccupants);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!remoteVideo) {
      return;
    }

    ref.current.srcObject = remoteVideo.getMediaStream();
  }, [ref, remoteVideo]);

  const onClick = () => {
    click(remoteVideo);
  };

  return (
    <>
      <div className='absolute top-3 left-3'>{remoteVideo.participantId}</div>
        <video
          ref={ref}
          muted
          autoPlay
          playsInline
          className={`border-4 rounded-md w-full h-full cursor-pointer ${audioOccupants[remoteVideo.participantId] ? 'border-yellow-500' : 'border-white'}`}
          onClick={onClick}
        ></video>
    </>
  );
};
export default RemoteVideo;
