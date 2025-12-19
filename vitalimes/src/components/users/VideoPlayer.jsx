import React from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";

export default function VideoPlayer() {
  return (
    <div style={styles.container}>
      <div style={styles.videoBox}>
        <Player
          poster="/assets/poster.png"
          fluid={false}
          width={720}
          height={405}
          autoPlay={false}   // prevent auto play
          loop={false}       // prevent looping
        >
          <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
          <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" />

          <ControlBar autoHide={false}>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "30px 0",
  },
  videoBox: {
    width: "720px",
    height: "405px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    borderRadius: "12px",
    overflow: "hidden",
  },
};
