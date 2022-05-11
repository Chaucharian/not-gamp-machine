import { useCallback, useState } from "react";
import { useStreaming } from "screens/Dashboard/screens/Live/hooks/useStreaming";

export const useCamera = (canvasRef: any, videoRef: any, imgRef: any) => {
  const [mode, setMode] = useState("");
  const { upload } = useStreaming(mode, ({ data: { image } }: any) => {
    imgRef.current.src = image;
  });

  const startStreaming = useCallback(async () => {
    setMode("stream");

    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });
      // videoRef.current.requestFullscreen(); still testing if this helps
      videoRef.current.srcObject = stream;

      setInterval(() => {
        const { videoWidth, videoHeight } = videoRef.current;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);

        upload(canvasRef.current.toDataURL("image/webp"));
      }, 5000);
    }
  }, [canvasRef, upload, videoRef]);

  const viewStreaming = useCallback(() => {
    setMode("viewer");
  }, []);

  return { mode, startStreaming, viewStreaming };
};
