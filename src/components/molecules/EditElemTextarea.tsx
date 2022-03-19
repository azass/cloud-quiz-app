import { VFC, memo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { EditElem } from '../../types/types'

interface Props {
  editElem: EditElem
  index: number
  onChangeText: any
}
export const EditElemTextarea: VFC<Props> = memo(
  ({ editElem, index, onChangeText }) => {
    const textareaStyle = `bg-gradient-to-b from-gray-700 via-gray-700 to-gray-600 px-4 py-4 mt-1 w-full block rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-orange-100 text-sm ${
      editElem.text === '' && 'bg-pink-50'
    }`
    return (
      <>
        <li>
          <TextareaAutosize
            value={editElem.text}
            className={textareaStyle}
            onChange={(e) => onChangeText(index, 'text', e.target.value)}
          ></TextareaAutosize>
        </li>
      </>
    )
  }
)
