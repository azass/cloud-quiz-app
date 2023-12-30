import { FC, ReactNode, createContext, useContext, useState } from 'react'
interface Props {
  children: ReactNode
}
const SortContext = createContext(
  {} as {
    asc: boolean
    setAsc: any
  }
)
const ActiveContext = createContext(
  {} as {
    active: boolean
    setActive: any
  }
)
const InactiveContext = createContext(
  {} as {
    inactive: boolean
    setInactivy: any
  }
)
const TerminateContext = createContext(
  {} as {
    terminate: boolean
    setTerminate: any
  }
)
export const useSortContext = () => useContext(SortContext)
export const useActiveContext = () => useContext(ActiveContext)
export const useInactiveContext = () => useContext(InactiveContext)
export const useTerminateContext = () => useContext(TerminateContext)
export const QListProvider: FC<Props> = ({ children }) => {
  const [asc, setAsc] = useState(true)
  const [active, setActive] = useState(true)
  const [inactive, setInactivy] = useState(true)
  const [terminate, setTerminate] = useState(false)
  return (
    <SortContext.Provider value={{ asc, setAsc }}>
      <ActiveContext.Provider value={{ active, setActive }}>
        <InactiveContext.Provider value={{ inactive, setInactivy }}>
          <TerminateContext.Provider value={{ terminate, setTerminate }}>
            {children}
          </TerminateContext.Provider>
        </InactiveContext.Provider>
      </ActiveContext.Provider>
    </SortContext.Provider>
  )
}
