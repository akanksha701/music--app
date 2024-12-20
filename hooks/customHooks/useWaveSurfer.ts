import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { RootState } from "@/Redux/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { useMusic } from "../useMusic";
import {
  setIsPlaying,
  setSeekPercentage,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";

const useWaveSurfer = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null); // Ref for the WaveSurfer instance
  const { currentTime, setCurrentTime } = useMusic();

  const volume = useSelector<RootState, number>(
    (state) => state?.musicPlayerSlice?.volume as number
  );

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );

  const previousAudioUrlRef = useRef<string | null>(null); // Ref to store the previous audio URL
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("waveSurferRef.current", waveSurferRef.current);
    console.log("waveformRef.current", waveformRef.current);

    // Check if we have a valid waveform container
    if (!waveformRef.current) return;

    // If the audio URL is empty, do not destroy the instance
    if (!currentTrack?.audioUrl) {
      console.log("Audio URL is empty. Not loading or destroying WaveSurfer instance.");
      return; // Exit without doing anything if there's no audio URL
    }

    // If the audio URL has changed, destroy the old instance
    if (previousAudioUrlRef.current !== currentTrack.audioUrl) {
      console.log("Destroying old WaveSurfer instance");
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy(); // Destroy the old instance
        waveSurferRef.current = null; // Clear reference
      }
      
      // Create a new WaveSurfer instance
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#C0C2C9",
        progressColor: "#b794f4",
        cursorColor: "#FFFFFF",
        barWidth: 3,
        height: 30,
      });
      waveSurferRef.current.load(currentTrack.audioUrl);
      waveSurferRef.current.setVolume(volume);

      waveSurferRef.current.on("audioprocess", () => {
        const current = waveSurferRef.current?.getCurrentTime() || 0;
        const duration = waveSurferRef.current?.getDuration() || 1; // Avoid division by zero
        setCurrentTime(current);
        setSeekPercentage((current / duration) * 100);
      });

      waveSurferRef.current.on("finish", () => {
        console.log("Playback finished");
        dispatch(setIsPlaying(false)); // Stop playing in Redux when finished
      });

      waveSurferRef.current.on("ready", () => {
        if (isPlaying) {
          waveSurferRef.current?.play(); // Play when ready if it was already playing
        }
      });

      previousAudioUrlRef.current = currentTrack.audioUrl; // Update the ref with the new URL
    }

    // Cleanup the WaveSurfer instance when the component unmounts or the audio URL changes
    // return () => {
    //   if (waveSurferRef.current) {
    //     console.log("Cleaning up WaveSurfer instance");
    //     waveSurferRef.current.destroy();
    //     waveSurferRef.current = null;
    //   }
    // };

  }, [currentTrack?.audioUrl]); // Add necessary dependencies

  return { waveformRef, waveSurfer: waveSurferRef };
};

export default useWaveSurfer;
