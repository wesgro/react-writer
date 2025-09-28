import React from "react";
import styles from "#lib/type_writer/type_writer.module.css";
import { getWrappedWordsFromLetterSegments } from "#lib/type_writer/utils";

interface TypewriterProps {
  text?: string;
  letterSegmenterFn?: Intl.Segmenter;
}

const letterSegmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

// Type guard to check if a word is an array of segments (not a space string)
const isWordSegments = (word: Intl.SegmentData[] | string): word is Intl.SegmentData[] => {
  return Array.isArray(word);
};

const TypewriterByLetter: React.FC<TypewriterProps> = ({
  text = "",
  letterSegmenterFn = letterSegmenter
}) => {
  const letters = Array.from(letterSegmenterFn.segment(text));
  const words = getWrappedWordsFromLetterSegments({
    letterSegments: letters
  });
  let counter: number = 0;
  return (
    <span
      data-typewriter-by-letter
      // You can customize duration and drag delay and whatever else you may want to expose as properties
      // style={{
      //   "--dragDelay": "23ms",
      //   "--duration": "834ms",
      //   "--delay": "2000ms"
      // }}
    >
      <span className={styles.hide}>{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi: number) =>
          word === " " ? (
            " "
          ) : (
            <span
              className={styles.word}
              key={`word-${wi}`}
              data-word-index={wi / 2}
              style={{ "--wi": wi / 2 } as React.CSSProperties}
            >
              {isWordSegments(word) && word.map((letter) => (
                <span
                  className={styles.letter}
                  key={`letter-${letter.index}`}
                  data-letter-index={counter}
                  style={{ "--i": counter++ } as React.CSSProperties}
                >
                  {letter.segment}
                </span>
              ))}
            </span>
          )
        )}
      </span>
    </span>
  );
};

export { TypewriterByLetter };

