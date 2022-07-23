import { VFC, memo, useState } from 'react'
import { Term, bgcolor, Tag } from '../../types/types'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/solid'
import TextareaAutosize from 'react-textarea-autosize'
import { EditTermDescription } from './EditTermDesciption'
import {
  PencilAltIcon,
  StatusOnlineIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/outline'
import { useTerm } from '../../hooks/useTerm'
import { QLinkPopup } from '../atoms/QLinkPopup'
import { EditTermRefTags } from './EditTermRefTags'
import { EditTermRefTerms } from './EditTermRefTerms'
import { EditTermRefEdittingTerms } from './EditTermRefEdittingTerms'
import log from 'loglevel'
import { useTags } from '../../hooks/useTags'

interface Props {
  term: Term
  index: number
  forQuestion: boolean
}
export const EditTerm: VFC<Props> = memo(({ term, index, forQuestion }) => {
  log.setLevel('info')
  const { getTagOfNo } = useTags()
  const [editting, setEditting] = useState(term.changed === 'new')
  const [termId, setTermId] = useState(term.term_id)
  const [word, setWord] = useState(term.word)
  const [level, setLevel] = useState(term.level)
  const [describe, setDescribe] = useState(false)
  const [ref, setRef] = useState('ref' in term)
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
  return (
    <>
      <div
        className={
          'place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2 ' +
          'text-white font-bold text-sm ' +
          getBgColor(level)
        }
      >
        <div className="flex justify-start items-center px-2">
          <div className={`flex items-center pl-${term.level * 2}`}>
            {!describe ? (
              term.description && term.description.length > 0 ? (
                <AcademicCapIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setDescribe(!describe)}
                />
              ) : (
                <StatusOnlineIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setDescribe(!describe)}
                />
              )
            ) : (
              <MinusCircleIcon
                className="w-4 h-4 cursor-pointer"
                onClick={() => setDescribe(!describe)}
              />
            )}
            {!editting ? (
              <span
                key={term.term_id}
                className={
                  'rounded-full px-6 py-1 text-left text-white text-sm font-black ' +
                  `${forQuestion && 'cursor-pointer '}` +
                  getBgColor(level)
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
                }}
              >
                <div
                  className={`place-items-center flex border-0 bg-opacity-0 ${getBgColor(
                    level
                  )}`}
                >
                  <div className="text-black text-sm">
                    {ref && refTag ? (
                      term.tag_no === refTag?.tag_no ? (
                        <EditTermRefEdittingTerms
                          refTag={refTag}
                          refTerm={refTerm}
                          setRefTerm={setRefTerm}
                        />
                      ) : (
                        <EditTermRefTerms
                          refTag={refTag}
                          refTerm={refTerm}
                          setRefTerm={setRefTerm}
                        />
                      )
                    ) : (
                      <TextareaAutosize
                        className="text-black px-2 py-1 my-1 w-80 border-0 resize"
                        autoFocus
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                      />
                    )}
                  </div>
                  <select
                    className={`pl-1 ${bgcolor[level - 1]}`}
                    onChange={(e) => setLevel(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <option
                        className={getBgColor(i)}
                        value={`${i}`}
                      >{`${i}`}</option>
                    ))}
                  </select>
                  <input
                    type="checkbox"
                    className="ml-4"
                    checked={ref}
                    onChange={() => setRef(!ref)}
                  />
                  <div className="text-black text-xs">
                    {ref && (
                      <EditTermRefTags refTag={refTag} setRefTag={setRefTag} />
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">
            {term.quest_ids && term.quest_ids.length > 0 && (
              <QLinkPopup quest_ids={term.quest_ids} />
            )}
            {editting && (
              <XCircleIcon
                className="w-6 h-6 mx-1 cursor-pointer"
                onClick={() => del()}
              />
            )}
          </div>
          {!editting ? (
            <PencilAltIcon
              className="w-4 h-4 ml-4 mr-1 cursor-pointer"
              onClick={() => setEditting(true)}
            />
          ) : (
            <CheckCircleIcon
              className="w-6 h-6 ml-4 mr-1 cursor-pointer"
              onClick={() => update()}
            />
          )}
        </div>
      </div>
      {describe && (
        <EditTermDescription
          term={term}
          editable={editting}
          forQuestion={forQuestion}
          updateCacheTerm={updateCacheTerm}
        />
      )}
    </>
  )
})
