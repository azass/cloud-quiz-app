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
interface Props {
  term: Term
  index: number
  terms: Term[]
  draggable?: boolean
}
export const EditTerm: VFC<Props> = memo(
  ({ term, index, terms, draggable }) => {
    const updateTem = useAppSelector(selectUpdateTerm)
    const [editable, setEditable] = useState(false)
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
      setEditable(false)
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
          console.log('getDescribe')
        }
      }
      setDescribe(!describe)
    }
    const select = () => {
      const newTerms = [...terms]
      const newTerm = { ...newTerms[index] }
      newTerm.selected = !term.selected
      newTerms[index] = newTerm
      dispatch(setEdittingTerms(newTerms))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
    const remove = () => {
      setEditable(false)
      const newTerms = [...terms]
      newTerms.splice(index, 1)
      dispatch(setEdittingTerms(newTerms))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
    const getBgColor = () => {
      return `${
        term.selected ? selectedBgcolor[level - 1] : bgcolor[level - 1]
      }`
    }
    return (
      <div onDoubleClick={() => (editable ? enter() : setEditable(true))}>
        <div
          className={
            `${draggable && `pl-${term.level * 8}`} ` +
            'place-items-center flex justify-between border rounded-full my-1 py-1 mx-1 pr-2 ' +
            'text-white font-bold text-sm text-center ' +
            getBgColor()
          }
        >
          <div className="flex items-center">
            {draggable && (
              <AcademicCapIcon
                className="w-6 h-6"
                onClick={() => onClickDescribe()}
              />
            )}
            {!editable ? (
              <span
                key={term.term_id}
                className={
                  'rounded-full px-6 py-1 text-left text-white font-black text-base cursor-pointer ' +
                  getBgColor()
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
                    ' place-items-center flex border-0 bg-opacity-0 ' +
                    getBgColor()
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
                      <option className={getBgColor()} value={`${i}`}></option>
                    ))}
                  </select>
                </div>
              </form>
            )}
          </div>
          {editable && (
            <XCircleIcon
              className="w-6 h-6 ml-1 mr-1"
              onClick={() => remove()}
            />
          )}
        </div>
        {!editable && describe && (
          <EditTermDescription term={term} editable={false} />
        )}
        {editable && draggable && describe && (
          <EditTermDescription term={term} editable={true} />
        )}
      </div>
    )
  }
)