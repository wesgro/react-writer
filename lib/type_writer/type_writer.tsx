import React from "react";
import styles from "#lib/type_writer/type_writer.module.css";
import { getWrappedWordsFromLetterSegments } from "#lib/type_writer/utils";
// Define timing value type that only allows number + unit format
export type TimingValue = `${number}s` | `${number}ms` | `var(--${string})`;

export interface TypewriterProps {
  text?: string;
  locale?: string;
  graphemeSegmenter?: Intl.Segmenter;
  delay?: TimingValue;
  dragDelay?: TimingValue;
  duration?: TimingValue;
}

// Type guard to check if a word is an array of segments (not a space string)
const isWordSegments = (
  word: Intl.SegmentData[] | string
): word is Intl.SegmentData[] => {
  return Array.isArray(word);
};

type FC = ReturnType<typeof React.forwardRef<HTMLSpanElement, TypewriterProps>>;

const TypewriterByLetter: FC = React.forwardRef<
  HTMLSpanElement,
  TypewriterProps
>(
  (
    { text = "", locale = "en", graphemeSegmenter, delay, dragDelay, duration },
    ref
  ) => {
    // Create grapheme segmenter with the specified locale if not provided
    const finalGraphemeSegmenter =
      graphemeSegmenter ||
      new Intl.Segmenter(locale, { granularity: "grapheme" });

    const words = getWrappedWordsFromLetterSegments({
      text,
      graphemeSegmenter: finalGraphemeSegmenter,
    });
    let letterCounter: number = 0;

    // Build custom styles from props
    const customStyles = {} as React.CSSProperties & {
      "--delay"?: TimingValue;
      "--dragDelay"?: TimingValue;
      "--duration"?: TimingValue;
    };
    if (delay !== undefined) customStyles["--delay"] = delay;
    if (dragDelay !== undefined) customStyles["--dragDelay"] = dragDelay;
    if (duration !== undefined) customStyles["--duration"] = duration;

    return (
      <span ref={ref} data-typewriter-by-letter style={customStyles}>
        <span className={styles.hide}>
          {text}
        </span>
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
                {isWordSegments(word) &&
                  word.map((letter) => (
                    <span
                      className={styles.letter}
                      key={`letter-${letter.index}`}
                      data-letter-index={letterCounter}
                      style={{ "--i": letterCounter++ } as React.CSSProperties}
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
  }
);

export { TypewriterByLetter };
