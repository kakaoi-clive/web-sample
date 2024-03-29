import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { CameraDeviceId } from '../../store/cameraDevice';

const LocalVideo = ({ localMedia, activeCamera }) => {
  const ref = useRef(null);
  const [cameraDeviceId] = useRecoilState(CameraDeviceId);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localMedia) {
      return;
    }

    ref.current.srcObject = localMedia.video.getMediaStream();
  }, [ref, localMedia, cameraDeviceId]);

  return (
    <video
      ref={ref}
      muted
      autoPlay
      playsInline
      className={activeCamera ? '' : 'invisible'}
    ></video>
  );
};
export default LocalVideo;
