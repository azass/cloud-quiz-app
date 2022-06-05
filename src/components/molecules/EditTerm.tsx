import { VFC, memo, useState } from 'react'
import { Term, bgcolor, selectedBgcolor } from '../../types/types'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/solid'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  setUpdateTerm,
  setEdittingTerms,
  selectUpdateTerm,
} from '../../slices/editSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { useEditElem } from '../../hooks/useEditElem'
import { EditTermDescription } from './EditTermDesciption'
import log from 'loglevel'
import { PencilAltIcon } from '@heroicons/react/outline'

interface Props {
  term: Term
  index: number
  terms: Term[]
  draggable?: boolean
  forQuestion: boolean
}
export const EditTerm: VFC<Props> = memo(
  ({ term, index, terms, draggable, forQuestion }) => {
    log.setLevel("info")
    const updateTem = useAppSelector(selectUpdateTerm)
    const [editting, setEditting] = useState(term.changed === 'new')
    const [termId, setTermId] = useState(term.term_id)
    const [word, setWord] = useState(term.word)
    const [level, setLevel] = useState(term.level)
    const [describe, setDescribe] = useState(false)
    if (termId !== term.term_id) {
      setTermId(term.term_id)
      if (word !== term.word) setWord(term.word)
      if (level !== term.level) setLevel(term.level)
    }
    const dispatch = useAppDispatch()
    const { editElemsState } = useEditElem([])
    const enter = () => {
      setEditting(false)
      if (word !== term.word || level !== term.level) {
        const newTerms = [...terms]
        const term = {
          ...newTerms[index],
          word: word,
          level: level,
          changed: newTerms[index].changed || 'update',
        }
        newTerms[index] = term
        dispatch(setEdittingTerms(newTerms))
        if (!updateTem) dispatch(setUpdateTerm(true))
      }
    }
    const onClickDescribe = () => {
      if (!describe) {
        if (editElemsState.length === 0) {
          log.debug('getDescribe')
        }
      }
      setDescribe(!describe)
    }
    const select = () => {
      if (forQuestion) {
        const newTerms = [...terms]
        const newTerm = { ...newTerms[index] }
        newTerm.selected = !term.selected
        newTerms[index] = newTerm
        dispatch(setEdittingTerms(newTerms))
        if (!updateTem) dispatch(setUpdateTerm(true))
      }
    }
    const remove = () => {
      setEditting(false)
      const newTerms = terms.map((term, i) => i === index ? { ...term, changed: 'delete', selected: false } : term)
      // const newTerms = [...terms]
      // newTerms.splice(index, 1)
      dispatch(setEdittingTerms(newTerms))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
    const getBgColor = (lv: number) => {
      return `${term.selected ? selectedBgcolor[lv - 1] : bgcolor[lv - 1]
        }`
    }
    return (
      <div>
        <div
          className={
            `${draggable && `pl-${term.level * 4}`} ` +
            'place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2 ' +
            'text-white font-bold text-sm text-center ' +
            getBgColor(level)
          }
        >
          <div className="flex items-center">
            {draggable && (
              <AcademicCapIcon
                className="w-4 h-4 cursor-pointer"
                onClick={() => onClickDescribe()}
              />
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
                  enter()
                }}
              >
                <div
                  className={
                    'place-items-center flex border-0 bg-opacity-0 ' +
                    getBgColor(level)
                  }
                >
                  <TextareaAutosize
                    className="text-black px-2 py-1 my-1 border-0 resize"
                    autoFocus
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                  <select
                    className={`pl-1 ${bgcolor[level - 1]}`}
                    onChange={(e) => setLevel(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <option className={getBgColor(i)} value={`${i}`}></option>
                    ))}
                  </select>
                </div>
              </form>
            )}
            <PencilAltIcon className="w-4 h-4 ml-4 mr-1 cursor-pointer" onClick={() => (editting ? enter() : setEditting(true))} />
          </div>
          {editting && (
            <XCircleIcon className="w-6 h-6 mx-1 cursor-pointer" onClick={() => remove()} />
          )}
        </div>
        {!editting && describe && (
          <EditTermDescription term={term} editable={false} forQuestion={forQuestion} />
        )}
        {editting && draggable && describe && (
          <EditTermDescription term={term} editable={true} forQuestion={forQuestion} />
        )}
      </div>
    )
  }
)
