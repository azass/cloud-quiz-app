import { VFC, memo, useState } from 'react'
import { Term, bgcolor } from '../../types/types'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/solid'
import TextareaAutosize from 'react-textarea-autosize'
import { EditTermDescription } from './EditTermDesciption'
import { PencilAltIcon, StatusOnlineIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/outline'
import { useTerm } from '../../hooks/useTerm'
import { QLinkPopup } from '../atoms/QLinkPopup'
import log from 'loglevel'

interface Props {
  term: Term
  index: number
  forQuestion: boolean
}
export const EditTerm: VFC<Props> = memo(({ term, index, forQuestion }) => {
  log.setLevel("info")
  const [editting, setEditting] = useState(term.changed === 'new')
  const [termId, setTermId] = useState(term.term_id)
  const [word, setWord] = useState(term.word)
  const [level, setLevel] = useState(term.level)
  const [describe, setDescribe] = useState(false)
  const { enter, remove, select, getBgColor, updateCacheTerm } = useTerm(term, index, forQuestion)
  if (termId !== term.term_id) {
    setTermId(term.term_id)
    if (word !== term.word) setWord(term.word)
    if (level !== term.level) setLevel(term.level)
  }
  const update = () => {
    setEditting(false)
    enter(word, level)
  }
  const del = () => {
    setEditting(false)
    remove()
  }
  return (
    <>
      <div
        className={
          'place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2 ' +
          'text-white font-bold text-sm text-center ' +
          getBgColor(level)
        }>
        <div className="flex justify-start items-center px-2">
          <div className={`flex items-center pl-${term.level * 2}`}>
            {!describe ?
              ((term.description && term.description.length > 0) ? (
                <AcademicCapIcon className="w-4 h-4 cursor-pointer" onClick={() => setDescribe(!describe)} />
              ) : (
                <StatusOnlineIcon className="w-4 h-4 cursor-pointer" onClick={() => setDescribe(!describe)} />
              )
              ) : (
                <MinusCircleIcon className="w-4 h-4 cursor-pointer" onClick={() => setDescribe(!describe)} />
              )}
            {!editting ? (
              <span
                key={term.term_id}
                className={
                  'rounded-full px-6 py-1 text-left text-white text-sm font-black ' +
                  `${forQuestion && 'cursor-pointer '}` + getBgColor(level)
                }
                onClick={() => select()}
              >
                {word}
              </span>
            ) : (
              <form
                className="bg-opacity-0 pl-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  update()
                }}>
                <div className={`place-items-center flex border-0 bg-opacity-0 ${getBgColor(level)}`}>
                  <TextareaAutosize
                    className="text-black px-2 py-1 my-1 w-80 border-0 resize"
                    autoFocus
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                  <select
                    className={`pl-1 ${bgcolor[level - 1]}`}
                    onChange={(e) => setLevel(Number(e.target.value))}>
                    {[1, 2, 3, 4].map((i) => <option className={getBgColor(i)} value={`${i}`}></option>)}
                  </select>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">
            {term.quest_ids && term.quest_ids.length > 0 && <QLinkPopup quest_ids={term.quest_ids} />}
            {editting && <XCircleIcon className="w-6 h-6 mx-1 cursor-pointer" onClick={() => del()} />}
          </div>
          {!editting ? (
            <PencilAltIcon className="w-4 h-4 ml-4 mr-1 cursor-pointer" onClick={() => setEditting(true)} />
          ) : (
            <CheckCircleIcon className="w-6 h-6 ml-4 mr-1 cursor-pointer" onClick={() => update()} />
          )}
        </div>
      </div>
      {describe &&
        <EditTermDescription term={term} editable={editting} forQuestion={forQuestion} updateCacheTerm={updateCacheTerm} />}
    </>
  )
})