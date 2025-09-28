import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TypewriterByLetter } from '#lib/type_writer'

describe('TypewriterByLetter', () => {
  it('should render with default props', () => {
    render(<TypewriterByLetter />)
    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toBeInTheDocument()
  })

  it('should render provided text', () => {
    render(<TypewriterByLetter text="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should render with data attributes', () => {
    render(<TypewriterByLetter text="Hi" />)
    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toBeInTheDocument()
    expect(container).toHaveAttribute('data-typewriter-by-letter')
  })

  it('should render hidden text for screen readers', () => {
    render(<TypewriterByLetter text="Test text" />)
    const hiddenText = screen.getByText('Test text')
    expect(hiddenText).toBeInTheDocument()
    // Check that it has a CSS module class (scoped class name)
    expect(hiddenText).toHaveClass(/_hide_/)
  })

  it('should render visible text with aria-hidden', () => {
    render(<TypewriterByLetter text="Hi" />)
    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    expect(ariaHiddenElement).toBeInTheDocument()
    expect(ariaHiddenElement).toHaveAttribute('aria-hidden', 'true')
    // The text should be inside this element
    expect(ariaHiddenElement).toHaveTextContent('Hi')
  })

  it('should handle empty string', () => {
    render(<TypewriterByLetter text="" />)
    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toBeInTheDocument()
  })

  it('should handle multiple words', () => {
    render(<TypewriterByLetter text="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should apply word styling to multi-letter words', () => {
    render(<TypewriterByLetter text="Hello" />)
    // The word "Hello" should be wrapped in a span with word class
    const wordSpans = document.querySelectorAll('span[class*="word"]')
    expect(wordSpans.length).toBeGreaterThan(0)
  })

  it('should apply letter styling to individual letters', () => {
    render(<TypewriterByLetter text="H" />)
    // Individual letters should be wrapped in spans with letter class
    const letterSpans = document.querySelectorAll('span[class*="letter"]')
    expect(letterSpans.length).toBeGreaterThan(0)
  })

  it('should increment word indices correctly for multiple words', () => {
    render(<TypewriterByLetter text="Hi there" />)

    const wordSpans = document.querySelectorAll('span[data-word-index]')
    expect(wordSpans).toHaveLength(2)

    // First word "Hi" should have data-word-index="0"
    expect(wordSpans[0]).toHaveAttribute('data-word-index', '0')
    expect(wordSpans[0]).toHaveStyle({ '--wi': '0' })

    // Second word "there" should have data-word-index="1" (wi = 2, 2/2 = 1)
    expect(wordSpans[1]).toHaveAttribute('data-word-index', '1')
    expect(wordSpans[1]).toHaveStyle({ '--wi': '1' })
  })

  it('should increment letter indices sequentially across all words', () => {
    render(<TypewriterByLetter text="Hi" />)

    const letterSpans = document.querySelectorAll('span[data-letter-index]')
    expect(letterSpans).toHaveLength(2)

    // Letter "H" should have data-letter-index="0"
    expect(letterSpans[0]).toHaveAttribute('data-letter-index', '0')
    expect(letterSpans[0]).toHaveStyle({ '--i': '0' })

    // Letter "i" should have data-letter-index="1"
    expect(letterSpans[1]).toHaveAttribute('data-letter-index', '1')
    expect(letterSpans[1]).toHaveStyle({ '--i': '1' })
  })

  it('should maintain sequential letter indices across multiple words', () => {
    render(<TypewriterByLetter text="A B" />)

    const letterSpans = document.querySelectorAll('span[data-letter-index]')
    expect(letterSpans).toHaveLength(2)

    // Letter "A" should have data-letter-index="0"
    expect(letterSpans[0]).toHaveAttribute('data-letter-index', '0')
    expect(letterSpans[0]).toHaveStyle({ '--i': '0' })

    // Letter "B" should have data-letter-index="1"
    expect(letterSpans[1]).toHaveAttribute('data-letter-index', '1')
    expect(letterSpans[1]).toHaveStyle({ '--i': '1' })
  })

  it('should handle longer text with correct letter incrementation', () => {
    render(<TypewriterByLetter text="Hello" />)

    const letterSpans = document.querySelectorAll('span[data-letter-index]')
    expect(letterSpans).toHaveLength(5)

    // Check each letter has the correct sequential index
    for (let i = 0; i < 5; i++) {
      expect(letterSpans[i]).toHaveAttribute('data-letter-index', i.toString())
      expect(letterSpans[i]).toHaveStyle({ '--i': i.toString() })
    }
  })

  it('should handle complex text with mixed words and spaces', () => {
    render(<TypewriterByLetter text="Hello world test" />)

    const wordSpans = document.querySelectorAll('span[data-word-index]')
    expect(wordSpans).toHaveLength(3)

    // Check word indices: 0, 1, 2 (wi = 0, 2, 4 divided by 2)
    expect(wordSpans[0]).toHaveAttribute('data-word-index', '0')
    expect(wordSpans[0]).toHaveStyle({ '--wi': '0' })

    expect(wordSpans[1]).toHaveAttribute('data-word-index', '1')
    expect(wordSpans[1]).toHaveStyle({ '--wi': '1' })

    expect(wordSpans[2]).toHaveAttribute('data-word-index', '2')
    expect(wordSpans[2]).toHaveStyle({ '--wi': '2' })

    // Check that letters are sequential across all words
    const letterSpans = document.querySelectorAll('span[data-letter-index]')
    expect(letterSpans).toHaveLength(14) // H,e,l,l,o (5) + w,o,r,l,d (5) + t,e,s,t (4)

    for (let i = 0; i < 14; i++) {
      expect(letterSpans[i]).toHaveAttribute('data-letter-index', i.toString())
      expect(letterSpans[i]).toHaveStyle({ '--i': i.toString() })
    }
  })

  it('should work with custom locale', () => {
    render(<TypewriterByLetter text="Hello" locale="fr" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should work with custom grapheme segmenter', () => {
    const customGraphemeSegmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })

    render(<TypewriterByLetter
      text="Hello world"
      graphemeSegmenter={customGraphemeSegmenter}
    />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should work with mixed configurations', () => {
    const customGraphemeSegmenter = new Intl.Segmenter('de', { granularity: 'grapheme' })

    render(<TypewriterByLetter
      text="Hello world"
      locale="en"
      graphemeSegmenter={customGraphemeSegmenter}
    />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
