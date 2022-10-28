import { VFC, memo, useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { ColorContext } from '../../App'
import { EditElem } from '../../types/types'
import { QLinkPopup } from '../atoms/QLinkPopup'

interface Props {
  editElem: EditElem
  index: number
  onChangeText: any
  editable: boolean
  editting: boolean
  on: boolean
}
const EditElemLink: VFC<Props> = ({
  editElem,
  index,
  onChangeText,
  editable,
  editting,
  on,
}) => {
  const color = useContext(ColorContext)
  const linkStyle = `px-2 py-1 w-full border-gray-300 bg-gray-800 text-xs ${
    color.iconColor
  } focus:text-white ${editElem.link === '' && 'bg-pink-50'}`
  const urlStyle = `px-2 py-0 w-full border-gray-300 bg-gray-800 text-xs ${
    color.iconColor
  } focus:text-white ${editElem.url === '' && 'bg-pink-50'}`
  return (
    <>
      <div className={`flex justify-between items-center pl-4 py-1`}>
        <a
          href={editElem.url}
          target="_blank"
          rel="noreferrer"
          className={`underline text-base  ${
            on ? 'font-bold text-white' : 'text-green-500'
          }`}
        >
          {editElem.link}
        </a>
        {editable && editElem.quest_ids && editElem.quest_ids.length > 0 && (
          <QLinkPopup quest_ids={editElem.quest_ids} />
        )}
      </div>
      {editable && editting && (
        <>
          <div className="flex flex-row items-center">
            <span className="w-12 mx-2 my-2 text-gray-500 font-bold text-xs">
              表示名
            </span>
            <TextareaAutosize
              className={linkStyle}
              value={editElem.link || ''}
              onChange={(e) => onChangeText(index, 'link', e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="w-12 mx-2 my-2 text-gray-500 font-bold text-xs">
              URL
            </span>
            <TextareaAutosize
              className={urlStyle}
              value={editElem.url || ''}
              onChange={(e) => onChangeText(index, 'url', e.target.value)}
            />
          </div>
        </>
      )}
    </>
  )
}
export const EditElemLinkMemo = memo(EditElemLink)
