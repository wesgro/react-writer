import * as React from 'react'
import './App.css'
import { TypewriterByLetter } from '#lib/type_writer'

const App = () => {
  const [count, setCount] = React.useState(0);
  const listenerRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <main>
      <h1 ref={listenerRef}>
        <TypewriterByLetter
          key={count}
          text={`🌞 Good Morning Billy, I break naturally 🌅 instead of by letter`}
        />
      </h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Don't push me down bro
        <br /> (but play the animation again)
      </button>
    </main>
  );
};

export default App
