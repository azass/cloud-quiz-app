import { FC, memo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { QLinkPopup } from '../../atoms/QLinkPopup'
import { useAppearanceTerm } from '../../../hooks/useAppearanceTerm'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import { useLangContext } from '../../atoms/LangProvider'

export const NoteTextarea: FC = memo(() => {
  const { changeText, draggable, editable } = useNoteItemsContext()
  const { editting } = useEdittingContext()
  const { noteItem, index, on } = useNoteItemContext()
  const { lang } = useLangContext()
  const [pre] = useState(true)
  const { textColor, borderColor, boadBgcolor } = useAppearanceTerm()
  const textareaStyle =
    `bg-gradient-to-b from-white via-white to-white` +
    ` px-4 py-3 mt-1 w-full block rounded-md border border-gray-300` +
    ` focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50` +
    ` text-black text-base font-sans antialiased` +
    ` ${noteItem.text === '' && 'bg-pink-50'}`
  const questIds = noteItem.quest_ids || []
  const border_color = editable && on() ? 'border-white' : borderColor(questIds)
  const docStyle =
    !editting &&
    `py-3 border-2 rounded-md ${boadBgcolor(questIds)} ${border_color}`
  return (
    <div title="NoteTextarea">
      {lang !== 2 && (
        <div className="flex w-full font-body">
          <div className={`px-4 mt-1 ${docStyle} w-full`}>
            {editting ? (
              <div>
                <TextareaAutosize
                  value={noteItem.text || ''}
                  className={textareaStyle}
                  onChange={(e) => changeText(index, 'text', e.target.value)}
                ></TextareaAutosize>
              </div>
            ) : (
              <div className="font-body text-xs">
                <ReactMarkdown
                  className={
                    `text-base w-full ${textColor(questIds)}` +
                    `${pre === true ? ' whitespace-pre-wrap ' : ''}`
                  }
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  children={noteItem.text || ''}
                />
              </div>
            )}
          </div>
          {draggable && editable && (
            <div className="flex pl-2 pt-2">
              <div className="w-5 h-5 text-pink-500 cursor-pointer">
                <QLinkPopup quest_ids={questIds} />
              </div>
            </div>
          )}
        </div>
      )}
      {(lang === 0 || lang === 2) && (
        <div className="px-4 py-3 mt-1 font-body text-xs">
          {editting ? (
            <TextareaAutosize
              value={noteItem.text_en || ''}
              className={textareaStyle}
              onChange={(e) => changeText(index, 'text_en', e.target.value)}
            ></TextareaAutosize>
          ) : (
            <span className="text-white whitespace-pre-wrap">
              {noteItem.text_en || ''}
            </span>
          )}
        </div>
      )}
    </div>
  )
})
