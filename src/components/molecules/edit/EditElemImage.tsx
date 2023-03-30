/* eslint-disable jsx-a11y/alt-text */
import { VFC, memo, useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { EditContext } from './EditContext'
import { EditElemContext } from './EditElemContext'

export const EditElemImage: VFC = memo(() => {
  const { changeText } = useContext(EditContext)
  const { editElem, index, editable, editting } = useContext(EditElemContext)
  if (!editElem.image_height || editElem.image_height === '') {
    editElem.image_height = '200'
  }
  const pathStyle = `px-4 py-2 w-full border-gray-300 text-xs ${editElem.image_path === '' && 'bg-pink-50'
    }`
  const heightStyle = `px-4 py-2 w-full border-gray-300 text-xs ${editElem.image_height === '' && 'bg-pink-50'
    }`
  return (
    <>
      <div className="py-8 bg-white">
        <img src={editElem.image_path} />
      </div>
      {editable && editting && (
        <>
          <div>
            <span className="mx-6 py-4 my-2 text-blue-700 font-bold text-xs">
              画像パス
            </span>
            <TextareaAutosize
              className={pathStyle}
              value={editElem.image_path}
              onChange={(e) =>
                changeText(index, 'image_path', e.target.value)
              }
            />
          </div>
          <div>
            <span className="mx-6 py-4 my-2 text-blue-700 font-bold text-xs">
              画像高さ
            </span>
            <TextareaAutosize
              className={heightStyle}
              value={editElem.image_height}
              onChange={(e) =>
                changeText(index, 'image_height', e.target.value)
              }
            />
          </div>
        </>
      )}
    </>
  )
}
)
