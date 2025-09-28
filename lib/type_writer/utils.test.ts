import { describe, it, expect } from 'vitest'
import { getWrappedWordsFromLetterSegments } from './utils'

describe('getWrappedWordsFromLetterSegments', () => {
  it('should handle empty input', () => {
    const result = getWrappedWordsFromLetterSegments({ letterSegments: [] })
    expect(result).toEqual([])
  })

  it('should handle single letter', () => {
    const mockSegment = {
      segment: 'a',
      index: 0,
      input: 'a',
      isWordLike: true
    } as Intl.SegmentData

    const result = getWrappedWordsFromLetterSegments({ letterSegments: [mockSegment] })
    expect(result).toEqual([[mockSegment]])
  })

  it('should handle multiple letters in one word', () => {
    const mockSegments = [
      { segment: 'h', index: 0, input: 'hello', isWordLike: true } as Intl.SegmentData,
      { segment: 'e', index: 1, input: 'hello', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 2, input: 'hello', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 3, input: 'hello', isWordLike: true } as Intl.SegmentData,
      { segment: 'o', index: 4, input: 'hello', isWordLike: true } as Intl.SegmentData,
    ]

    const result = getWrappedWordsFromLetterSegments({ letterSegments: mockSegments })
    expect(result).toEqual([mockSegments])
  })

  it('should handle multiple words separated by spaces', () => {
    const mockSegments = [
      { segment: 'h', index: 0, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'e', index: 1, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 2, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 3, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'o', index: 4, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: ' ', index: 5, input: 'hello world', isWordLike: false } as Intl.SegmentData,
      { segment: 'w', index: 6, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'o', index: 7, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'r', index: 8, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 9, input: 'hello world', isWordLike: true } as Intl.SegmentData,
      { segment: 'd', index: 10, input: 'hello world', isWordLike: true } as Intl.SegmentData,
    ]

    const result = getWrappedWordsFromLetterSegments({ letterSegments: mockSegments })
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(mockSegments.slice(0, 5)) // "hello"
    expect(result[1]).toBe(' ') // space
    expect(result[2]).toEqual(mockSegments.slice(6)) // "world"
  })

  it('should handle leading and trailing spaces', () => {
    const mockSegments = [
      { segment: ' ', index: 0, input: ' hello ', isWordLike: false } as Intl.SegmentData,
      { segment: 'h', index: 1, input: ' hello ', isWordLike: true } as Intl.SegmentData,
      { segment: 'e', index: 2, input: ' hello ', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 3, input: ' hello ', isWordLike: true } as Intl.SegmentData,
      { segment: 'l', index: 4, input: ' hello ', isWordLike: true } as Intl.SegmentData,
      { segment: 'o', index: 5, input: ' hello ', isWordLike: true } as Intl.SegmentData,
      { segment: ' ', index: 6, input: ' hello ', isWordLike: false } as Intl.SegmentData,
    ]

    const result = getWrappedWordsFromLetterSegments({ letterSegments: mockSegments })
    expect(result).toHaveLength(3)
    expect(result[0]).toBe(' ') // leading space
    expect(result[1]).toEqual(mockSegments.slice(1, 6)) // "hello"
    expect(result[2]).toBe(' ') // trailing space
  })
})
