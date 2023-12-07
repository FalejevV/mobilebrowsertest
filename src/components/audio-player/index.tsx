import { memo, useEffect, useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";
import { LuPause } from "react-icons/lu";
import { calculateTime } from "./helper-functions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [canPlay, setCanPlay] = useState(false);
  const audioRef = useRef(null);
  const audioTrackRef = useRef(null);
  const volumeInputRef = useRef(null);
  const [audioData, setAudioData] = useState({
    currentTime: 0,
    duration: 0,
  });

  function setDuration(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    let target = e.target as HTMLAudioElement;
    setAudioData((prev) => {
      return {
        ...prev,
        duration: target.duration,
      };
    });
  }

  useEffect(() => {
    if (audioRef.current) {
      let audioElement = audioRef.current as HTMLAudioElement;
      audioElement.volume = volume / 100;
      if (isPlaying) audioElement.play();
      if (!isPlaying) audioElement.pause();
    }
    updateVolumeStyle();
  }, [isPlaying, volume]);

  useEffect(() => {
    updateTrackStyle();
  }, [audioData.currentTime]);

  function updatePlayTime(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    let target = e.target as HTMLAudioElement;
    setAudioData((prev) => ({
      ...prev,
      currentTime: target.currentTime,
    }));
  }

  function changePlayTime(e: React.ChangeEvent<HTMLInputElement>) {
    setAudioData((prev) => ({
      ...prev,
      currentTime: Number(e.target.value),
    }));
    if (audioRef.current) {
      let audioElement = audioRef.current as HTMLAudioElement;
      audioElement.currentTime = Number(e.target.value);
    }
  }

  function volumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
    if (audioRef.current) {
      let audioElement = audioRef.current as HTMLAudioElement;
      audioElement.volume = Number(e.target.value) / 100;
    }
    updateVolumeStyle();
  }

  function updateVolumeStyle() {
    if (volumeInputRef.current) {
      const volumeElement = volumeInputRef.current as HTMLInputElement;
      volumeElement.style.setProperty(
        "--seek-before-width",
        `${(volume / 100) * 100}%`
      );
    }
  }

  function updateTrackStyle() {
    if (audioTrackRef.current) {
      const trackElement = audioTrackRef.current as HTMLInputElement;
      trackElement.style.setProperty(
        "--seek-before-width",
        `${(audioData.currentTime / audioData.duration) * 100}%`
      );
    }
  }

  return (
    <div className="w-full flex items-center gap-2 audio-player p-2 bg-white bg-opacity-70 rounded">
      <audio
        onTimeUpdate={updatePlayTime}
        onLoadedMetadata={setDuration}
        onEnded={() => {
          setIsPlaying(false);
          setAudioData((prev) => ({ ...prev, currentTime: 0 }));
        }}
        onCanPlay={() => setCanPlay(true)}
        ref={audioRef}
        src={"/Rock.mp3"}
        preload="metadata"
      />
      <button onClick={() => setIsPlaying((prev) => !prev)} disabled={!canPlay}>
        {!canPlay ? (
          <AiOutlineLoading3Quarters className="w-7 h-7  fill-teal-700 animate-spin" />
        ) : isPlaying ? (
          <LuPause className="w-7 h-7 stroke-teal-700" />
        ) : (
          <LuPlay className="w-7 h-7 stroke-teal-700" />
        )}
      </button>
      <p className="w-12 text-center select-none">
        {calculateTime(audioData.currentTime)}
      </p>
      <input
        ref={audioTrackRef}
        min={0}
        max={Math.floor(audioData.duration)}
        value={audioData.currentTime}
        onChange={changePlayTime}
        type="range"
        className="audio-player appearance-none flex-auto accent-teal-600"
      />
      <p className="w-12 text-center select-none">
        {calculateTime(audioData.duration)}
      </p>
      <input
        ref={volumeInputRef}
        min={0}
        max={100}
        value={volume}
        onChange={volumeChange}
        type="range"
        className="audio-player audio-player--volume appearance-none"
      />
    </div>
  );
}

export default memo(AudioPlayer);
