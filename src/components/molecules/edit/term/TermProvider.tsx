import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useTags } from '../../../../hooks/useTags'
import { Tag, Term } from '../../../../types/types'
import { useTerm } from '../../../../hooks/useTerm'

interface Props {
  term: Term
  index: number
  forQuestion: boolean
  children: ReactNode
}
const TermContext = createContext(
  {} as {
    term: Term
    index: number
    forQuestion: boolean
  }
)
const TermEdittingContext = createContext(
  {} as {
    termEditting: boolean
    setTermEditting: any
  }
)
const WordContext = createContext(
  {} as {
    word: string
    setWord: any
  }
)
const LevelContext = createContext(
  {} as {
    level: number
    setLevel: any
  }
)
const DescribeContext = createContext(
  {} as {
    describe: boolean
    setDescribe: any
  }
)
const RefTagContext = createContext(
  {} as {
    refTag?: Tag
    setRefTag: any
  }
)
const RefTermContext = createContext(
  {} as {
    refTerm?: Term
    setRefTerm: any
  }
)
const EditTermContext = createContext(
  {} as {
    update: any
    del: any
    select: any
    getBgColor: any
    updateCacheTerm: any
  }
)
export const useTermContext = () => useContext(TermContext)
export const useTermEdittingContext = () => useContext(TermEdittingContext)
export const useWordContext = () => useContext(WordContext)
export const useLevelContext = () => useContext(LevelContext)
export const useDescribeContext = () => useContext(DescribeContext)
export const useRefTagContext = () => useContext(RefTagContext)
export const useRefTermContext = () => useContext(RefTermContext)
export const useEditTermContext = () => useContext(EditTermContext)

export const TermProvider: FC<Props> = ({
  term,
  index,
  forQuestion,
  children,
}) => {
  const { getTagOfNo } = useTags()
  const [termEditting, setTermEditting] = useState(false)
  const [word, setWord] = useState(term.word)
  const [level, setLevel] = useState(term.level)
  const [describe, setDescribe] = useState(false)
  const [refTag, setRefTag] = useState<Tag | undefined>(
    term.ref?.tag_no ? getTagOfNo(term.ref?.tag_no) : undefined
  )
  const [refTerm, setRefTerm] = useState<Term | undefined>(term.ref)
  const { enter, remove, select, getBgColor, updateCacheTerm } = useTerm(
    term,
    index,
    forQuestion
  )
  const update = () => {
    setTermEditting(false)
    if (refTerm) {
      setWord(refTerm.word)
      enter(refTerm.word, level, refTerm)
    } else {
      enter(word, level)
    }
  }
  const del = () => {
    setTermEditting(false)
    remove()
  }
  return (
    <TermContext.Provider value={{ term, index, forQuestion }}>
      <EditTermContext.Provider
        value={{ update, del, select, getBgColor, updateCacheTerm }}
      >
        <TermEdittingContext.Provider value={{ termEditting, setTermEditting }}>
          <WordContext.Provider value={{ word, setWord }}>
            <LevelContext.Provider value={{ level, setLevel }}>
              <DescribeContext.Provider value={{ describe, setDescribe }}>
                <RefTagContext.Provider value={{ refTag, setRefTag }}>
                  <RefTermContext.Provider value={{ refTerm, setRefTerm }}>
                    {children}
                  </RefTermContext.Provider>
                </RefTagContext.Provider>
              </DescribeContext.Provider>
            </LevelContext.Provider>
          </WordContext.Provider>
        </TermEdittingContext.Provider>
      </EditTermContext.Provider>
    </TermContext.Provider>
  )
}