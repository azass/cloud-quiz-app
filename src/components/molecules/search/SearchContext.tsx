import { createContext } from "react"

export interface SearchContextValues {
  selectOptions?: number[]
  setSelectOptions?: any
  selectScorings?: number[]
  setSelectScorings?: any
  selectExcludeDays?: number[]
  setSelectExcludeDays?: any
  selectMistakeDays?: number[]
  setSelectMistakeDays?: any
}
export const SearchContext = createContext<SearchContextValues>({})
