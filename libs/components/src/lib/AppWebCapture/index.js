import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';
import { Modal } from 'antd';

const WebcamCapture = ({ visible, handleOk, handleCancel }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="fullview-modal"
    >
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </Modal>
  );
};

export default WebcamCapture;
