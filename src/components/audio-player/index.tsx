import { memo, useEffect, useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";
import { LuPause } from "react-icons/lu";
import { calculateTime } from "./helper-functions";
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(15);
  const audioRef = useRef(null);
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
  }, [isPlaying, volume]);

  function updatePlayTime(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    let target = e.target as HTMLAudioElement;
    setAudioData((prev) => ({
      ...prev,
      currentTime: target.currentTime,
    }));
    target.style.setProperty(
      "--seek-before-width",
      `${(audioData.currentTime / audioData.duration) * 100}%`
    );
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
  }

  return (
    <div className="w-full flex items-center gap-2 audio-player p-2 bg-white bg-opacity-70 rounded">
      <audio
        onTimeUpdate={updatePlayTime}
        onLoadedMetadata={setDuration}
        ref={audioRef}
        src={"/Rock.mp3"}
        preload="metadata"
      />
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? (
          <LuPause className="w-7 h-7 stroke-teal-700" />
        ) : (
          <LuPlay className="w-7 h-7 stroke-teal-700" />
        )}
      </button>
      <p className="w-12 text-center select-none">
        {calculateTime(audioData.currentTime)}
      </p>
      <input
        min={0}
        max={Math.floor(audioData.duration)}
        value={audioData.currentTime}
        onChange={changePlayTime}
        type="range"
        className="audio-player appearance-none flex-auto"
      />
      <p className="w-12 text-center select-none">
        {calculateTime(audioData.duration)}
      </p>
      <input
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
