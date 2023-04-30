import { FC, ReactNode, useContext, createContext, useState } from 'react'
interface Props {
  children: ReactNode
}
const LangContext = createContext(
  {} as {
    lang: number
    setLang: any
  }
)
export const useLangContext = () => useContext(LangContext)
export const LangProvider: FC = ({ children }) => {
  const [lang, setLang] = useState(1)
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
