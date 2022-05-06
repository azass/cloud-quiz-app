import { VFC, memo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { EditElem } from '../../types/types'

interface Props {
  editElem: EditElem
  index: number
  onChangeText: any
  editable: boolean
  editting: boolean
}
const EditElemLink: VFC<Props> = ({
  editElem,
  index,
  onChangeText,
  editable,
  editting,
}) => {
  const linkStyle = `px-2 py-1 w-full border-gray-300 bg-gray-800 text-xs text-gray-700 focus:text-white ${
    editElem.link === '' && 'bg-pink-50'
  }`
  const urlStyle = `px-2 py-0 w-full border-gray-300 bg-gray-800 text-xs text-gray-700 focus:text-white ${
    editElem.url === '' && 'bg-pink-50'
  }`
  return (
    <>
      <li>
        <div className="pl-4 pb-2 font-bold underline text-white text-base">
          <a href={editElem.url} target="_blank">
            {editElem.link}
          </a>
        </div>
      </li>
      {editable && editting && (
        <>
          <li className="flex flex-row items-center">
            <span className="w-12 mx-2 my-2 text-gray-500 font-bold text-xs">
              表示名
            </span>
            <TextareaAutosize
              className={linkStyle}
              value={editElem.link || ""}
              onChange={(e) => onChangeText(index, 'link', e.target.value)}
            />
          </li>
          <li className="flex flex-row items-center">
            <span className="w-12 mx-2 my-2 text-gray-500 font-bold text-xs">
              URL
            </span>
            <TextareaAutosize
              className={urlStyle}
              value={editElem.url || ""}
              onChange={(e) => onChangeText(index, 'url', e.target.value)}
            />
          </li>
        </>
      )}
    </>
  )
}
export const EditElemLinkMemo = memo(EditElemLink)
