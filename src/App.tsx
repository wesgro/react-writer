import * as React from "react";
import "./App.css";
import { TypewriterByLetter, type TimingValue } from "#lib/type_writer";

const App = () => {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState<TimingValue | undefined>(undefined);
  const [dragDelay, setDragDelay] = React.useState<TimingValue | undefined>(
    undefined
  );
  const [duration, setDuration] = React.useState<TimingValue | undefined>(
    undefined
  );
  const listenerRef = React.useRef<HTMLHeadingElement>(null);

  const resetTiming = () => {
    setDelay(undefined);
    setDragDelay(undefined);
    setDuration(undefined);
  };

  return (
    <div className="layout">
      <aside>
        <div
          style={{
            flex: "0 0 300px",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Animation Controls</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="delay"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Delay: {delay || "Default (0ms)"}
            </label>
            <input
              id="delay"
              type="range"
              min="0"
              max="5000"
              step="100"
              value={delay ? parseInt(delay.replace("ms", "")) : 0}
              onChange={(e) => setDelay(`${e.target.value}ms` as TimingValue)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="dragDelay"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Drag Delay: {dragDelay || "Default (50ms)"}
            </label>
            <input
              id="dragDelay"
              type="range"
              min="0"
              max="200"
              step="5"
              value={dragDelay ? parseInt(dragDelay.replace("ms", "")) : 50}
              onChange={(e) =>
                setDragDelay(`${e.target.value}ms` as TimingValue)
              }
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="duration"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Per-Letter Animation Duration: {duration || "Default (400ms)"}
            </label>
            <input
              id="duration"
              type="range"
              min="100"
              max="2000"
              step="50"
              value={duration ? parseInt(duration.replace("ms", "")) : 400}
              onChange={(e) =>
                setDuration(`${e.target.value}ms` as TimingValue)
              }
              style={{ width: "100%" }}
            />
          </div>

          <button onClick={resetTiming}>Reset to Defaults</button>
        </div>
      </aside>
      <main>
        <h1 ref={listenerRef}>
          <TypewriterByLetter
            key={count}
            text={`🌞 Good Morning Billy, I break naturally 🌅 instead of by letter`}
            delay={delay}
            dragDelay={dragDelay}
            duration={duration}
          />
        </h1>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Don't push me down bro
          <br /> (but play the animation again)
        </button>
      </main>
    </div>
  );
};

export default App;
