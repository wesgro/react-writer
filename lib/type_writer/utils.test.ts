import { describe, it, expect } from 'vitest'
import { getWrappedWordsFromLetterSegments } from './utils'

describe('getWrappedWordsFromLetterSegments', () => {
  const createGraphemeSegmenter = (locale = 'en') => {
    return new Intl.Segmenter(locale, { granularity: 'grapheme' })
  }

  it('should handle empty input', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: '',
      graphemeSegmenter
    })
    expect(result).toEqual([])
  })

  it('should handle single letter', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: 'a',
      graphemeSegmenter
    })
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveLength(1) // single grapheme
    expect((result[0] as Intl.SegmentData[])[0].segment).toBe('a')
  })

  it('should handle multiple letters in one word', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: 'hello',
      graphemeSegmenter
    })
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveLength(5) // 5 graphemes
    const graphemes = result[0] as Intl.SegmentData[]
    expect(graphemes.map(g => g.segment)).toEqual(['h', 'e', 'l', 'l', 'o'])
  })

  it('should handle multiple words separated by spaces', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: 'hello world',
      graphemeSegmenter
    })
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveLength(5) // "hello"
    expect(result[1]).toBe(' ') // space
    expect(result[2]).toHaveLength(5) // "world"
  })

  it('should handle leading and trailing spaces', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: ' hello ',
      graphemeSegmenter
    })
    expect(result).toHaveLength(3)
    expect(result[0]).toBe(' ') // leading space
    expect(result[1]).toHaveLength(5) // "hello"
    expect(result[2]).toBe(' ') // trailing space
  })

  it('should handle complex text with multiple spaces', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: '  hello   world  ',
      graphemeSegmenter
    })
    expect(result).toHaveLength(9)
    expect(result[0]).toBe(' ') // first space
    expect(result[1]).toBe(' ') // second space
    expect(result[2]).toHaveLength(5) // "hello"
    expect(result[3]).toBe(' ') // third space
    expect(result[4]).toBe(' ') // fourth space
    expect(result[5]).toBe(' ') // fifth space
    expect(result[6]).toHaveLength(5) // "world"
    expect(result[7]).toBe(' ') // sixth space
    expect(result[8]).toBe(' ') // seventh space
  })

  it('should handle words with punctuation', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: 'Billy, I break naturally.',
      graphemeSegmenter
    })
    expect(result).toHaveLength(7)
    expect(result[0]).toHaveLength(6) // "Billy," (B,i,l,l,y,,)
    expect(result[1]).toBe(' ') // space
    expect(result[2]).toHaveLength(1) // "I"
    expect(result[3]).toBe(' ') // space
    expect(result[4]).toHaveLength(5) // "break"
    expect(result[5]).toBe(' ') // space
    expect(result[6]).toHaveLength(10) // "naturally." (n,a,t,u,r,a,l,l,y,.,)

    // Check that punctuation is included in the words
    const billyWord = result[0] as Intl.SegmentData[]
    expect(billyWord[billyWord.length - 1].segment).toBe(',') // Last character should be comma

    const naturallyWord = result[6] as Intl.SegmentData[]
    expect(naturallyWord[naturallyWord.length - 1].segment).toBe('.') // Last character should be period
  })

  it('should handle words with special characters', () => {
    const graphemeSegmenter = createGraphemeSegmenter()
    const result = getWrappedWordsFromLetterSegments({
      text: 'café naïve',
      graphemeSegmenter
    })
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveLength(4) // "café" (c,a,f,é)
    expect(result[1]).toBe(' ') // space
    expect(result[2]).toHaveLength(5) // "naïve" (n,a,ï,v,e)
  })

  it('should work with different locales', () => {
    const graphemeSegmenter = createGraphemeSegmenter('fr')
    const result = getWrappedWordsFromLetterSegments({
      text: 'café naïve',
      graphemeSegmenter
    })
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveLength(4) // "café"
    expect(result[1]).toBe(' ') // space
    expect(result[2]).toHaveLength(5) // "naïve"
  })
})
