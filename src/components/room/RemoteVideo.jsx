import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { AudioOccupants } from '@/store/audioOccupants';

const RemoteVideo = ({ remoteVideo, click })=>{
  const ref = useRef(null);
  const [audioOccupants] = useRecoilState(AudioOccupants);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if(!remoteVideo) {
      return;
    }

    ref.current.srcObject = remoteVideo.getMediaStream();
  }, [ref, remoteVideo]);

  const onClick = () => {
    click(remoteVideo);
  }

  return (
    <>
    <div className="absolute top-3 left-3">{remoteVideo.participantId}</div>
    {
      audioOccupants[remoteVideo.participantId] ? <video ref={ref} muted autoPlay playsInline className='border-4 border-yellow-500 rounded-md w-full h-full cursor-pointer' onClick={onClick}></video> : <video ref={ref} muted autoPlay playsInline className='border-4 border-white rounded-md w-full h-full cursor-pointer' onClick={onClick}></video>
    }
    </>
  );
};
export default RemoteVideo;