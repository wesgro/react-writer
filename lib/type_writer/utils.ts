export const getWrappedWordsFromLetterSegments = ({ letterSegments }: { letterSegments: Intl.SegmentData[] }) => {
    // Build words by splitting on spaces
    const words: (Intl.SegmentData[] | string)[] = [];
    let currentWord: Intl.SegmentData[] = [];
  
    letterSegments.forEach((segment) => {
      if (segment.segment === " ") {
        if (currentWord.length) {
          words.push(currentWord);
          currentWord = [];
        }
        words.push(" "); // keep space as separate
      } else {
        currentWord.push(segment);
      }
    });
  
    // push the last word if any
    if (currentWord.length) {
      words.push(currentWord);
    }
  
    return words;
  };