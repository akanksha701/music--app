// hooks/useWaveSurfer.ts
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const useWaveSurfer = (
  audioUrl: string,
  isPlaying: boolean,
  volume: number,
  setCurrentTime: (time: number) => void,
  setSeekPercentage: (percentage: number) => void,
  onFinish: () => void
) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
 
  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#C0C2C9",
      progressColor: "#b794f4",
      cursorColor: "#FFFFFF",
      barWidth: 3,
      height: 30,
    });

    ws.load(audioUrl);
    ws.setVolume(volume);

    ws.on("audioprocess", () => {
      const current = ws.getCurrentTime();
      const duration = ws.getDuration();
      setCurrentTime(current);
      setSeekPercentage((current / duration) * 100);
    });

    ws.on("finish", () => {
      onFinish();
    });

    ws.on("ready", () => {
      if (isPlaying) ws.play();
    });

    waveSurferRef.current = ws;

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [audioUrl]);

  return { waveformRef, waveSurfer: waveSurferRef };
};

export default useWaveSurfer;
