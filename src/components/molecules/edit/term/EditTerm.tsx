import { VFC, memo, useState, useContext } from 'react'
import { Term, Tag } from '../../../../types/types'
import { EditTermDescription } from './EditTermDescription'
import { useTerm } from '../../../../hooks/useTerm'
import log from 'loglevel'
import { useTags } from '../../../../hooks/useTags'
import { EditTermContext } from './EditTermContext'
import { EditTermKeyword } from './EditTermKeyword'
import { EditTermDescriptionIcon } from './EditTermDescriptionIcon'
import { EditTermOperateIconSet } from './EditTermOperateIconSet'
import { TermContext } from './TermContext'

export const EditTerm: VFC = memo(() => {
  log.setLevel('info')
  const { term, index, forQuestion } = useContext(TermContext)
  const { getTagOfNo } = useTags()
  const [editting, setEditting] = useState(term.changed === 'new')
  const [termId, setTermId] = useState(term.term_id)
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
  if (termId !== term.term_id) {
    setTermId(term.term_id)
    if (word !== term.word) setWord(term.word)
    if (level !== term.level) setLevel(term.level)
  }
  const update = () => {
    setEditting(false)
    if (refTerm) {
      setWord(refTerm.word)
      enter(refTerm.word, level, refTerm)
    } else {
      enter(word, level)
    }
  }
  const del = () => {
    setEditting(false)
    remove()
  }
  const value = {
    editting,
    setEditting,
    word,
    setWord,
    level,
    setLevel,
    describe,
    setDescribe,
    refTag,
    setRefTag,
    refTerm,
    setRefTerm,
    update,
    del,
    select,
    getBgColor,
    updateCacheTerm
  }
  return (
    <EditTermContext.Provider value={value}>
      <div
        className={
          'place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2 ' +
          'text-white font-bold text-sm ' +
          getBgColor(level)
        }
      >
        <div className="flex justify-start items-center px-2">
          <div className={`flex items-center pl-${term.level * 4}`}>
            <EditTermDescriptionIcon />
            <EditTermKeyword />
          </div>
        </div>
        <EditTermOperateIconSet />
      </div>
      {describe && (
        <EditTermDescription />
      )}
    </EditTermContext.Provider>
  )
})