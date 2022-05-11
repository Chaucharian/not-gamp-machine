import { Button, Content, Flex, Heading, View } from "@adobe/react-spectrum";
import { SPACING } from "app/theme";
import { useCamera } from "hooks/useCamera";
import { useEffect, useRef, useState } from "react";
import Prompt from "./components/Prompt";
import { useStreaming } from "./hooks/useStreaming";

const Live = () => {
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const { mode, startStreaming, viewStreaming } = useCamera(ref, ref2, ref3);

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
          ref={ref2}
          style={{
            display: mode === "stream" ? "block" : "none",
          }}
          width="100%"
          height="100%"
        />
        <img
          alt="feed"
          ref={ref3}
          style={{
            display: mode === "viewer" ? "block" : "none",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </Flex>

      <canvas ref={ref} style={{ display: "none" }} />
    </Flex>
    // <Flex direction="column" height="100%" justifyContent="center">
    //   <Flex justifyContent="center">
    //     <View height='size-2400' backgroundColor="gray-100" width="100%">
    //     <video
    //       autoPlay
    //       ref={ref2}
    //       style={{
    //         display: mode === "stream" ? "block" : "none",
    //         maxWidth: "1080",
    //       }}
    //       width="100%"
    //       height="100%"
    //     />
    //     <img
    //       alt="feed"
    //       ref={ref3}
    //       style={{ display: mode === "viewer" ? "block" : "none" }}
    //       width="100%"
    //       height="100%"
    //     />
    //     <canvas
    //       ref={ref}
    //       // width="720"
    //       // height="720"
    //       style={{ position: "absolute", visibility: "hidden" }}
    //     />
    //       </View>
    //   </Flex>
    // <View>
    //   <Button
    //     variant="primary"
    //     onPress={() => {
    //       startStreaming();
    //     }}
    //   >
    //     Stream
    //   </Button>
    //   <Button
    //     variant="primary"
    //     onPress={() => {
    //       viewStreaming();
    //     }}
    //   >
    //     View
    //   </Button>
    // </View>
    // </Flex>
  );
};

export default Live;
