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
  const { noteItem: editElem, index, on } = useNoteItemContext()
  const { lang } = useLangContext()
  const [pre, setPre] = useState(true)
  const { textColor, borderColor, boadBgcolor } = useAppearanceTerm()
  const textareaStyle =
    `bg-gradient-to-b from-white via-white to-white` +
    ` px-4 py-3 mt-1 w-full block rounded-md border border-gray-300` +
    ` focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50` +
    ` text-black text-base font-sans antialiased` +
    ` ${editElem.text === '' && 'bg-pink-50'}`
  const questIds = editElem.quest_ids || []
  const border_color = editable && on() ? 'border-white' : borderColor(questIds)
  const docStyle =
    !editting &&
    `py-3 border-2 rounded-md ${boadBgcolor(questIds)} ${border_color}`
  return (
    <div title="EditElemTextarea">
      {lang !== 2 && (
        <div className={`px-4 mt-1 ${docStyle}`}>
          {editable && editting ? (
            <div>
              {/* <button
                type="button"
                className={
                  'flex-shrink-0 border text-white text-xs h-4 mb-1' +
                  `${pre && ' bg-pink-500'}`
                }
                onClick={() => setPre(!pre)}
              >
                <span className="px-1 h-4 text-xs">pre</span>
              </button> */}
              <TextareaAutosize
                value={editElem.text || ''}
                className={textareaStyle}
                onChange={(e) => changeText(index, 'text', e.target.value)}
              ></TextareaAutosize>
            </div>
          ) : (
            <>
              {draggable && editable && questIds.length > 0 && (
                <div className="flex flex-row-reverse -mb-4">
                  <div className="w-5 h-5 -mr-4 text-pink-500 cursor-pointer">
                    <QLinkPopup quest_ids={questIds} />
                  </div>
                </div>
              )}
              <ReactMarkdown
                className={
                  `text-base w-full ${textColor(questIds)}` +
                  `${pre === true ? ' whitespace-pre-wrap ' : ''}`
                }
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                children={editElem.text || ''}
              />
            </>
          )}
        </div>
      )}
      {lang !== 1 && (
        <div className="px-4 py-3 mt-1">
          {editable && editting ? (
            <TextareaAutosize
              value={editElem.text_en || ''}
              className={textareaStyle}
              onChange={(e) => changeText(index, 'text_en', e.target.value)}
            ></TextareaAutosize>
          ) : (
            <span className="text-white whitespace-pre-wrap">
              {editElem.text_en || ''}
            </span>
          )}
        </div>
      )}
    </div>
  )
})
