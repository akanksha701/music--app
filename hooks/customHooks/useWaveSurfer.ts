import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js"; // Import WaveSurfer.js
import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setSeekPercentage,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { useMusic } from "../useMusic";

const useWaveSurfer = () => {
  const currentTrackRef = useRef();
  const allSongsRef = useRef();
  const { currentTime, setCurrentTime } = useMusic();

  const volume = useSelector<RootState, number>(
    (state) => state?.musicPlayerSlice?.volume as number
  );
  const currentTrack = useSelector<RootState, any | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTrack) {
      currentTrackRef.current = currentTrack;
    }
  }, [currentTrack]);

  
  useEffect(() => {
    const waveSurferInstance = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#C0C2C9",
      progressColor: "#b794f4",
      cursorColor: "#FFFFFF",
      barWidth: 3,
      height: 30,
    });

    waveSurferInstance.load(currentTrack?.audioUrl as string);
    waveSurferInstance.setVolume(volume);

    waveSurferInstance.on("audioprocess", () => {
      const current = waveSurferInstance.getCurrentTime() || 0;
      const duration = waveSurferInstance.getDuration() || 1; // Avoid division by zero
      setCurrentTime(current);
      dispatch(setSeekPercentage((current / duration) * 100));
    });

    waveSurferInstance.on("finish", () => {
      dispatch(setIsPlaying(false)); // Stop playing in Redux when finished
    });

    waveSurferInstance.on("ready", () => {
      if (isPlaying) {
        waveSurferInstance?.play(); // Play when ready if it was already playing
      }
    });

    return () => {
      waveSurferInstance.destroy();
    };
  }, [currentTrack?.audioUrl]);

  return { currentTrackRef };
};

export default useWaveSurfer;
