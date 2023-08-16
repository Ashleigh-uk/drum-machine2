import { useState } from 'react'
import './App.css'
import Drum from './drum';
import { AudioClip } from './types';

const audioClips : AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2"
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open-HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick-n'-Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed-HH",
  },
];

function App() {
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const currentVolume = muted ? 0 : volume ** 2
  
  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const clip = audioClips.find((clip) => clip.keyTrigger === e.key.toUpperCase());
    if (!clip) return;
    (document.getElementById(clip.keyTrigger) as HTMLAudioElement)?.play().catch(console.error);

    document.getElementById("display")!.innerText = clip.description;
};

  return (
    <div className="container" id="drum-machine" onKeyDown={playAudio}>
      <h1>Drum Machine</h1>
      <div className="whole-drum">
        {audioClips.map((clip)=>
        <Drum audioClip = {clip} key = {clip.keyTrigger}/>
        )}
      </div>
      <div id="display"></div>
      <section>
        <input type="range" min={0} max={1} step={0.02} value={volume} onChange={event => {setVolume(event.target.valueAsNumber)}}></input>
        <button onClick={() => setMuted(m => !m)}>
          {muted ? "muted" : "unmuted"}
        </button>
      </section>
        <section>
          <p>Current Volume: {currentVolume.toFixed(3)}</p>
        </section>
    </div>
  )
}

export default App
