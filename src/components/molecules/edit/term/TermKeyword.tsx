import { FC, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { TermRefEdittingTerms } from './TermRefEdittingTerms'
import { TermRefTags } from './TermRefTags'
import { TermRefTerms } from './TermRefTerms'
import {
  useTermContext,
  useEditTermContext,
  useLevelContext,
  useRefTagContext,
  useWordContext,
  useTermEdittingContext,
} from './TermProvider'
import Colors from '../../../../consts/colors'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext } from '../../../../slices/editSlice'

export const TermKeyword: FC = () => {
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { termEditting, setTermEditting } = useTermEdittingContext()
  const { word, setWord } = useWordContext()
  const { level, setLevel } = useLevelContext()
  const { refTag } = useRefTagContext()
  const { update, select, getBgColor } = useEditTermContext()
  const [ref, setRef] = useState('ref' in term)
  if (word ==='') {
    setTermEditting(true)
  }
  return (
    <>
      {termEditting ? (
        <form
          className="bg-opacity-0 pl-6"
          onSubmit={(e) => {
            e.preventDefault()
            update()
          }}
        >
          <div
            className={
              `place-items-center flex border-0 bg-opacity-0` +
              ` ${getBgColor(level)}`
            }
          >
            <div className="text-black text-sm">
              {ref && refTag ? (
                term.tag_no === refTag?.tag_no ? (
                  <TermRefEdittingTerms />
                ) : (
                  <TermRefTerms />
                )
              ) : (
                <ReactTextareaAutosize
                  className="text-black px-2 py-1 my-1 w-80 border-0 resize"
                  autoFocus
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              )}
            </div>
            <select
              className={`pl-1 ${Colors.termNodeBgcolors[level - 1]}`}
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
            <div className="text-black text-xs">{ref && <TermRefTags />}</div>
          </div>
        </form>
      ) : (
        <span
          key={term.term_id}
          className={
            `rounded-full px-6 py-1 text-left text-white text-sm font-black` +
            ` ${editContext.forQuestion && 'cursor-pointer '}` +
            getBgColor(level)
          }
          onClick={() => select()}
        >
          {word}
        </span>
      )}
    </>
  )
}
