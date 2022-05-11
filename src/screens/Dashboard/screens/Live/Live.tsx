import { Button, Content, Flex, Heading, View } from "@adobe/react-spectrum";
import { SPACING } from "app/theme";
import { useCamera } from "hooks/useCamera";
import { useEffect, useRef, useState } from "react";
import Prompt from "./components/Prompt";
import axios from "axios";
import { useQuery } from "react-query";

const Live = () => {
  const canvasRef = useRef<any>();
  const videoRef = useRef<any>();
  const imgRef = useRef<any>();
  const { data: config } = useQuery("feed", () =>
    axios.get(`/enviroment/images/status`).then((data) => data)
  );
  const { mode, startStreaming, viewStreaming } = useCamera(
    { canvasRef, videoRef, imgRef },
    config?.data
  );

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      {!mode && (
        <Prompt
          title="Select if you're a viewer or streamer"
          option1="streamer"
          option2="Viewer"
          onPress={(selection: string) => {
            if (selection === "streamer") {
              startStreaming();
            } else {
              viewStreaming();
            }
          }}
        />
      )}

      <Flex direction="column">
        <video
          autoPlay
          ref={videoRef}
          style={{
            display: mode === "stream" ? "block" : "none",
          }}
          width="100%"
          height="100%"
        />
        <img
          alt="feed"
          ref={imgRef}
          style={{
            display: mode === "viewer" ? "block" : "none",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </Flex>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Flex>
  );
};

export default Live;
