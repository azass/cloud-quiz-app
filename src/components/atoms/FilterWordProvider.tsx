import { FC, ReactNode, useContext, createContext, useState } from "react";
interface Props {
  children: ReactNode
}
const FilterWordContext = createContext(
  {} as {
    filterWord: string
    setFilterWord: any
  }
)
export const useFilterWordContext = () => useContext(FilterWordContext)

export const FilterWordProvider:FC = ({ children }) => {
  const [filterWord, setFilterWord] = useState('')
  return (
    <FilterWordContext.Provider value={{ filterWord, setFilterWord }}>
      {children}
    </FilterWordContext.Provider>
  )
}