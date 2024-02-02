'use client';
import { useEffect, useRef } from 'react';
import jsQR, { QRCode } from 'jsqr';
//Internal
import { IQRCodeReader } from '@/interfaces';

const decoder = (imageData: ImageData): Promise<QRCode> => {
  return new Promise((resolve, reject) => {
    const decoded = jsQR(imageData?.data, imageData?.width, imageData?.height);
    if (decoded) {
      resolve(decoded);
    } else {
      reject();
    }
  });
};

const drawLine = (code: QRCode, color: string, el: CanvasRenderingContext2D | null) => {
  if (el) {
    const { topLeftCorner, topRightCorner, bottomLeftCorner } = code.location;

    el.beginPath();
    el.strokeStyle = color;
    el.lineWidth = 4;

    el.roundRect(
      topLeftCorner.x,
      topLeftCorner.y,
      topRightCorner.x - topLeftCorner.x,
      bottomLeftCorner.y - topLeftCorner.y,
      20
    );

    el.stroke();
  }
};

export default function QRCodeReader({ readCode }: IQRCodeReader) {
  const videoElement = useRef<HTMLVideoElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);

  let canvasContext: CanvasRenderingContext2D | null;

  const runTime = () => {
    if (
      videoElement.current &&
      canvasElement.current &&
      videoElement.current?.readyState === videoElement.current?.HAVE_ENOUGH_DATA
    ) {
      canvasElement.current.height = videoElement.current?.videoHeight || 0;
      canvasElement.current.width = videoElement.current?.videoWidth || 0;
      canvasContext?.drawImage(videoElement.current, 0, 0, canvasElement.current?.width, canvasElement.current?.height);
      const imageData = canvasContext?.getImageData(0, 0, canvasElement.current?.width, canvasElement.current?.height);
      imageData &&
        decoder(imageData)
          .then((code) => {
            console.log(code);
            drawLine(code, '#5F3F98', canvasContext);
            console.log('decoder:', code);
            const data = JSON.stringify(code.data);
            readCode(data);
          })
          .catch(() => {});
    }
    requestAnimationFrame(runTime);
  };

  const init = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      videoElement.current && (videoElement.current.srcObject = stream);

      videoElement.current &&
        videoElement.current.play().then(() => {
          canvasElement.current &&
            (canvasContext = canvasElement.current.getContext('2d', { willReadFrequently: true }));
          requestAnimationFrame(runTime);
        });
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <canvas ref={canvasElement} style={{ display: 'block' }}></canvas>

      <video ref={videoElement} hidden playsInline></video>
    </>
  );
}
