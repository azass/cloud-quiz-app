import { VFC, memo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'
import { EditElem } from '../../types/types'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { QLinkPopup } from '../atoms/QLinkPopup'
interface Props {
  editElem: EditElem
  index: number
  onChangeText: any
  lang: number
  editable: boolean
  editting: boolean
  on: boolean
}
export const EditElemTextarea: VFC<Props> = memo(
  ({ editElem, index, onChangeText, lang, editable, editting, on }) => {
    const [pre, setPre] = useState(true)
    const textareaStyle = `bg-gradient-to-b from-white via-white to-white px-4 py-3 mt-1 w-full block rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black text-base font-sans	antialiased ${editElem.text === '' && 'bg-pink-50'
      }`
    const border_color = () => {
      return editable && on ? 'border-white' : 'border-teal-900'
    }
    const text_color = () => {
      return editable && on ? 'text-white' : 'text-teal-400'
    }
    return (
      <>
        <div title="EditElemTextarea">
          {lang !== 2 && (
            <div
              className={`px-4 py-1 mt-1 ${!editting &&
                'py-3 bg-black border-2 rounded-md ' + border_color()
                }`}
            >
              {editable && editting ? (
                <div>
                  <button
                    type="button"
                    className={
                      'flex-shrink-0 border text-white text-xs h-4 mb-1' +
                      `${pre && ' bg-pink-500'}`
                    }
                    onClick={() => {
                      setPre(!pre)
                    }}
                  >
                    <span className="px-1 h-4 text-xs">pre</span>
                  </button>
                  <TextareaAutosize
                    value={editElem.text || ''}
                    className={textareaStyle}
                    onChange={(e) =>
                      onChangeText(index, 'text', e.target.value)
                    }
                  ></TextareaAutosize>
                </div>
              ) : (
                <>
                  <div className="flex flex-row-reverse">
                    {editable &&
                      editElem.quest_ids &&
                      editElem.quest_ids.length > 0 && (
                        <div className="w-5 h-5 -mt-2 -mr-3 text-pink-500 cursor-pointer">
                          <QLinkPopup quest_ids={editElem.quest_ids} />
                        </div>
                      )}
                  </div>
                  <ReactMarkdown
                    className={
                      'text-base w-full ' +
                      text_color() +
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
                  onChange={(e) =>
                    onChangeText(index, 'text_en', e.target.value)
                  }
                ></TextareaAutosize>
              ) : (
                <span className="text-white whitespace-pre-wrap">
                  {editElem.text_en || ''}
                </span>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
)
