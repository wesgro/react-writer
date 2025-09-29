import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TypewriterByLetter } from '#lib/type_writer'

describe('TypewriterByLetter', () => {
  it('should render with default props', () => {
    render(<TypewriterByLetter />)
    // Find the container by its data attribute
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
    // Find the hidden text by looking for text within the container
    const container = document.querySelector('[data-typewriter-by-letter]')
    const hiddenText = container?.querySelector('span[class*="hide"]')
    expect(hiddenText).toBeInTheDocument()
    expect(hiddenText).toHaveTextContent('Test text')
  })

  it('should render visible text with aria-hidden', () => {
    render(<TypewriterByLetter text="Hi" />)
    // Find the visible text container by looking for the aria-hidden element
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
    render(<TypewriterByLetter text="Hallo Welt" />)
    expect(screen.getByText('Hallo Welt')).toBeInTheDocument()
  })

  it('should apply word styling to multi-letter words', () => {
    render(<TypewriterByLetter text="Hello" />)
    // Find the visible text container and look for word spans within it
    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const wordSpans = ariaHiddenElement?.querySelectorAll('span[class*="word"]') || []
    expect(wordSpans.length).toBeGreaterThan(0)
  })

  it('should apply letter styling to individual letters', () => {
    render(<TypewriterByLetter text="H" />)
    // Find the visible text container and look for letter spans within it
    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const letterSpans = ariaHiddenElement?.querySelectorAll('span[class*="letter"]') || []
    expect(letterSpans.length).toBeGreaterThan(0)
  })

  it('should increment word indices correctly for multiple words', () => {
    render(<TypewriterByLetter text="Hi there" />)

    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const wordSpans = ariaHiddenElement?.querySelectorAll('span[data-word-index]') || []
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

    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const letterSpans = ariaHiddenElement?.querySelectorAll('span[data-letter-index]') || []
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

    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const letterSpans = ariaHiddenElement?.querySelectorAll('span[data-letter-index]') || []
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

    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const letterSpans = ariaHiddenElement?.querySelectorAll('span[data-letter-index]') || []
    expect(letterSpans).toHaveLength(5)

    // Check each letter has the correct sequential index
    for (let i = 0; i < 5; i++) {
      expect(letterSpans[i]).toHaveAttribute('data-letter-index', i.toString())
      expect(letterSpans[i]).toHaveStyle({ '--i': i.toString() })
    }
  })

  it('should handle complex text with mixed words and spaces', () => {
    render(<TypewriterByLetter text="Hallo Welt Test" />)

    const ariaHiddenElement = document.querySelector('span[aria-hidden="true"]')
    const wordSpans = ariaHiddenElement?.querySelectorAll('span[data-word-index]') || []
    expect(wordSpans).toHaveLength(3)

    // Check word indices: 0, 1, 2 (wi = 0, 2, 4 divided by 2)
    expect(wordSpans[0]).toHaveAttribute('data-word-index', '0')
    expect(wordSpans[0]).toHaveStyle({ '--wi': '0' })

    expect(wordSpans[1]).toHaveAttribute('data-word-index', '1')
    expect(wordSpans[1]).toHaveStyle({ '--wi': '1' })

    expect(wordSpans[2]).toHaveAttribute('data-word-index', '2')
    expect(wordSpans[2]).toHaveStyle({ '--wi': '2' })

    // Check that letters are sequential across all words
    const letterSpans = ariaHiddenElement?.querySelectorAll('span[data-letter-index]') || []
    expect(letterSpans).toHaveLength(13) // H,a,l,l,o (5) + W,e,l,t (4) + T,e,s,t (4)

    for (let i = 0; i < 13; i++) {
      expect(letterSpans[i]).toHaveAttribute('data-letter-index', i.toString())
      expect(letterSpans[i]).toHaveStyle({ '--i': i.toString() })
    }
  })

  it('should work with custom locale', () => {
    render(<TypewriterByLetter text="Hallo" locale="fr" />)
    expect(screen.getByText('Hallo')).toBeInTheDocument()
  })

  it('should work with custom grapheme segmenter', () => {
    const customGraphemeSegmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })

    render(<TypewriterByLetter
      text="Hallo Welt"
      graphemeSegmenter={customGraphemeSegmenter}
    />)
    expect(screen.getByText('Hallo Welt')).toBeInTheDocument()
  })

  it('should work with mixed configurations', () => {
    const customGraphemeSegmenter = new Intl.Segmenter('de', { granularity: 'grapheme' })

    render(<TypewriterByLetter
      text="Hallo Welt"
      locale="en"
      graphemeSegmenter={customGraphemeSegmenter}
    />)
    expect(screen.getByText('Hallo Welt')).toBeInTheDocument()
  })

  it('should apply custom timing styles', () => {
    render(<TypewriterByLetter
      text="Hi"
      delay="1000ms"
      dragDelay="25ms"
      duration="500ms"
    />)

    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toBeInTheDocument()
    expect(container).toHaveStyle({
      '--delay': '1000ms',
      '--dragDelay': '25ms',
      '--duration': '500ms'
    })
  })

  it('should apply individual timing props', () => {
    render(<TypewriterByLetter
      text="Test"
      duration="750ms"
    />)

    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toHaveStyle({
      '--duration': '750ms'
    })
    // Other props should not be set if not provided
    expect(container).not.toHaveStyle({
      '--delay': expect.any(String)
    })
  })

  it('should handle timing values with seconds', () => {
    render(<TypewriterByLetter
      text="Test"
      delay="2s"
      dragDelay="0.1s"
      duration="1.5s"
    />)

    const container = document.querySelector('[data-typewriter-by-letter]')
    expect(container).toHaveStyle({
      '--delay': '2s',
      '--dragDelay': '0.1s',
      '--duration': '1.5s'
    })
  })
})
