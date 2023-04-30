import { FC, useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext, selectEdittingTerms } from '../../slices/editSlice'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Prop from '../../consts/props'
import { iconBase, strongText } from '../../styles/util'
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/solid'

export const TermNotePanel: FC = () => {
  const terms = useAppSelector(selectEdittingTerms)
  const editContext = useAppSelector(selectEditContext)
  const getNote = () => {
    var txt = ''
    terms.forEach((term) => {
      txt = txt
        .concat(term.word === 'is ?' ? '#' : '#'.repeat(term.level + 1))
        .concat(' ')
        .concat(
          term.word === 'is ?' ? editContext.chosenTag.tag_name : term.word
        )
        .concat('\n\n')
      term.description?.forEach((elem) => {
        if (elem.type === Prop.NoteItemType.TEXTAREA) {
          var text = (elem.text || '').replaceAll('\n', '<br>')
          txt = txt.concat(text).concat('\n\n')
        } else if (elem.type === Prop.NoteItemType.LINK) {
          txt = txt
            .concat('[')
            .concat(elem.link || '')
            .concat('](')
            .concat(elem.url || '')
            .concat(')')
            .concat('\n\n')
        } else if (elem.type === Prop.NoteItemType.IMAGE) {
          txt = txt
            .concat('\n![](')
            .concat(elem.image_path || '')
            .concat(')')
            .concat('\n\n\n')
        }
      })
    })
    return txt
  }
  const [note, setNote] = useState('')
  const [showFlg, setShowFlg] = useState(false)
  useEffect(() => {
    setNote(getNote())
  })
  return (
    <div className="w-full border-blue-500 border-opacity-100 pt-4">
      {showFlg ? (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleDownIcon
              className={`h-3 w-3 ${iconBase}`}
              fill="currentColor"
              onClick={() => setShowFlg(false)}
            />
          </div>
          <textarea
            className={
              `form-textarea m-1 block p-2.5 w-full` +
              ` border-blue-500 border-opacity-100`
            }
            rows={13}
            onChange={(e) => setNote(e.target.value)}
          >
            {note}
          </textarea>
          <button
            type="submit"
            className={
              `flex justify-center mx-auto px-4 py-2 mt-4 rounded-lg` +
              ` bg-blue-500 ${strongText}`
            }
            onClick={() => {
              // onClick(question.quest_id)
            }}
          >
            取り込み
          </button>
        </>
      ) : (
        <div className="flex flex-row-reverse">
          <ChevronDoubleUpIcon
            className={`flex flex-row-reverse h-3 w-3 ${iconBase}`}
            fill="currentColor"
            onClick={() => setShowFlg(true)}
          />
        </div>
      )}
      <div className="markdown">
        <ReactMarkdown
          className={'text-base w-full text-white whitespace-pre-wrap '}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          children={note}
        />
      </div>
    </div>
  )
}
