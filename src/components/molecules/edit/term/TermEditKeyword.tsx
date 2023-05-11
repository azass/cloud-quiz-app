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
  useExplainContext,
} from './TermProvider'
import Colors from '../../../../consts/colors'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext } from '../../../../slices/editSlice'
import { CubeIcon } from '@heroicons/react/outline'

export const TermEditKeyword: FC = () => {
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { termEditting, setTermEditting } = useTermEdittingContext()
  const { word, setWord } = useWordContext()
  const { level, setLevel } = useLevelContext()
  const { explain, setExplain } = useExplainContext()
  const { refTag } = useRefTagContext()
  const { update, select, getBgColor } = useEditTermContext()
  const [ref, setRef] = useState('ref' in term)
  if (word === '') {
    setTermEditting(true)
  }
  const chat = () => {
    const q = `${editContext.chosenTag.tag_name} の「${word}」を平易かつシンプルに40文字くらいで説明してください`
    prompt("",q)
  }
  return (
    <>
      {termEditting ? (
        <form
          className="bg-opacity-0 pl-6 w-full"
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
              value={level}
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
          <div className={`flex justify-start items-center w-full`}>
            <ReactTextareaAutosize
              className="text-black px-0 py-1 my-1 w-full border-0 resize"
              autoFocus
              value={explain}
              onChange={(e) => setExplain(e.target.value)}
            />
            <CubeIcon className={`w-6 h-6 ml-4`} onClick={() => chat()}/>
          </div>
        </form>
      ) : (
        <>
          <span
            key={term.term_id}
            className={
              `px-6 py-1 text-left ${term.selected ? 'text-white':'text-white'} text-sm font-black ` +
              `${getBgColor(level)} ${
                editContext.forQuestion && 'cursor-pointer'
              }`
            }
            onClick={() => select()}
          >
            {word}
          </span>
          <span
            className={
              `px-1 py-1 mt-2 text-left ${term.selected ? 'text-violet-600':'text-gray-300'} text-xs ` +
              `${getBgColor(level)} ${
                editContext.forQuestion && 'cursor-pointer'
              }`
            }
            onClick={() => select()}
          >
            {explain}
          </span>
        </>
      )}
    </>
  )
}
