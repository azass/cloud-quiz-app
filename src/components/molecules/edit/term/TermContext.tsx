import { createContext } from "react"
import { Term } from "../../../../types/types"

export interface TermContextValues {
  term: Term
  index: number
  forQuestion: boolean
  star: boolean
}
export const TermContext = createContext<TermContextValues>(
  { term: { term_id: "", word: "", level: 0, sort: 0, provider: "", tag_no: 0 }, index: 0, forQuestion: false, star: false })