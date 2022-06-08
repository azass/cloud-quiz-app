import { VFC, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'
import { EditElem } from '../../types/types'
import rehypeRaw from 'rehype-raw'
interface Props {
  editElem: EditElem
  index: number
  onChangeText: any
  lang: number
  editable: boolean
  editting: boolean
}
export const EditElemTextarea: VFC<Props> = memo(
  ({ editElem, index, onChangeText, lang, editable, editting }) => {
    const textareaStyle = `bg-gradient-to-b from-white via-white to-white px-4 py-3 mt-1 w-full block rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black text-base font-sans	antialiased ${editElem.text === '' && 'bg-pink-50'
      }`
    return (
      <>
        <li>
          {lang !== 2 && (
            <div className={`px-4 py-3 mt-1 ${!editting && 'bg-gray-900'}`}>
              {(editable && editting) ? (
                <TextareaAutosize
                  value={editElem.text || ""}
                  className={textareaStyle}
                  onChange={(e) => onChangeText(index, 'text', e.target.value)}
                ></TextareaAutosize>
              ) : (
                <ReactMarkdown className="text-base text-white whitespace-pre-wrap w-full" rehypePlugins={[rehypeRaw]} children={editElem.text || ""} />
              )}
            </div>
          )}
          {lang !== 1 && (
            <div className="px-4 py-3 mt-1">
              {(editable && editting) ? (
                <TextareaAutosize
                  value={editElem.text_en || ""}
                  className={textareaStyle}
                  onChange={(e) => onChangeText(index, 'text_en', e.target.value)}
                ></TextareaAutosize>
              ) : (
                <span className="text-white whitespace-pre-wrap">{editElem.text_en || ""}</span>
              )}
            </div>
          )}
        </li>
      </>
    )
  }
)
