export const getWrappedWordsFromLetterSegments = ({
  text,
  graphemeSegmenter
}: {
  text: string;
  graphemeSegmenter: Intl.Segmenter;
}): (Intl.SegmentData[] | string)[] => {
    const words: (Intl.SegmentData[] | string)[] = [];

    // Get all graphemes
    const graphemes = Array.from(graphemeSegmenter.segment(text));

    // Group consecutive non-space graphemes into words
    let currentWord: Intl.SegmentData[] = [];

    graphemes.forEach((grapheme) => {
      if (/^\s+$/.test(grapheme.segment)) {
        // This is a space - finish the current word and add the space
        if (currentWord.length > 0) {
          words.push(currentWord);
          currentWord = [];
        }
        words.push(" ");
      } else {
        // This is a character - add it to the current word
        currentWord.push(grapheme);
      }
    });

    // Don't forget the last word if there is one
    if (currentWord.length > 0) {
      words.push(currentWord);
    }

    return words;
  };