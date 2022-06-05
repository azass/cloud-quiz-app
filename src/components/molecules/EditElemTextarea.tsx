import { VFC, memo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { EditElem } from '../../types/types'

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
          {lang !== 2 && (<TextareaAutosize
            value={editElem.text || ""}
            className={textareaStyle}
            onChange={(e) => (editable && editting) && onChangeText(index, 'text', e.target.value)}
          ></TextareaAutosize>)}
          {lang !== 1 && (<TextareaAutosize
            value={editElem.text_en || ""}
            className={textareaStyle}
            onChange={(e) => (editable && editting) && onChangeText(index, 'text_en', e.target.value)}
          ></TextareaAutosize>)}
        </li>
      </>
    )
  }
)
