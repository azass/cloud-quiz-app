import { FC, ReactNode, createContext, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}
const SelectOptionsContext = createContext(
  {} as {
    selectOptions: number[]
    setSelectOptions: any
  }
)
const SelectScoringsContext = createContext(
  {} as {
    selectScorings: number[]
    setSelectScorings: any
  }
)
const SelectExcludeDaysContext = createContext(
  {} as {
    selectExcludeDays: number[]
    setSelectExcludeDays: any
  }
)
const SelectMistakeDaysContext = createContext(
  {} as {
    selectMistakeDays: number[]
    setSelectMistakeDays: any
  }
)
export const useSelectOptionsContext = () => useContext(SelectOptionsContext)
export const useSelectScoringsContext = () => useContext(SelectScoringsContext)
export const useSelectExcludeDaysContext = () =>
  useContext(SelectExcludeDaysContext)
export const useSelectMistakeDaysContext = () =>
  useContext(SelectMistakeDaysContext)

export const SearchProvider: FC<Props> = ({ children }) => {
  const [selectOptions, setSelectOptions] = useState<number[]>([])
  const [selectScorings, setSelectScorings] = useState<number[]>([])
  const [selectExcludeDays, setSelectExcludeDays] = useState<number[]>([])
  const [selectMistakeDays, setSelectMistakeDays] = useState<number[]>([])
  return (
    <SelectOptionsContext.Provider value={{ selectOptions, setSelectOptions }}>
      <SelectScoringsContext.Provider
        value={{ selectScorings, setSelectScorings }}
      >
        <SelectExcludeDaysContext.Provider
          value={{ selectExcludeDays, setSelectExcludeDays }}
        >
          <SelectMistakeDaysContext.Provider
            value={{ selectMistakeDays, setSelectMistakeDays }}
          >
            {children}
          </SelectMistakeDaysContext.Provider>
        </SelectExcludeDaysContext.Provider>
      </SelectScoringsContext.Provider>
    </SelectOptionsContext.Provider>
  )
}
