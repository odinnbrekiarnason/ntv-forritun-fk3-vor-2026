import userEvent from "@testing-library/user-event"
import { fetchRandomQuote } from "../lib/quotes"
import { render, screen } from "@testing-library/react"
import { QuoteCard } from "./QuoteCard"

vi.mock('./quotes', () => ({
  response: vi.fn()
}))

describe('FetchRandomQuotes', () => {
  const user = userEvent.setup()
  it('Should get a quote', () => {
    render(<QuoteCard/>)
  })
})