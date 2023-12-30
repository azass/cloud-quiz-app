/* eslint-disable jsx-a11y/alt-text */
import { FC, memo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import Colors from '../../../consts/colors'
import { QLinkPopup } from '../../atoms/QLinkPopup'

export const NoteImage: FC = memo(() => {
  const { changeText, draggable, editable } = useNoteItemsContext()
  const { editting } = useEdittingContext()
  const { noteItem, index } = useNoteItemContext()
  if (!noteItem.image_height || noteItem.image_height === '') {
    noteItem.image_height = '100'
  }
  const pathStyle = `px-4 py-2 w-full border-gray-300 text-xs ${
    noteItem.image_path === '' && 'bg-pink-50'
  }`
  const heightStyle = `px-4 py-2 w-full border-gray-300 text-xs ${
    noteItem.image_height === '' && 'bg-pink-50'
  }`
  const questIds = noteItem.quest_ids || []
  return (
    <div className="flex w-full">
      <div className={`px-4 mt-1 w-full`}>
        <div className="py-8 bg-white">
          <img src={noteItem.image_path} />
        </div>
        {editting && (
          <>
            <div>
              <span
                className={`mx-6 py-4 my-2 ${Colors.shining} font-bold text-xs`}
              >
                画像パス
              </span>
              <TextareaAutosize
                className={pathStyle}
                value={noteItem.image_path}
                onChange={(e) =>
                  changeText(index, 'image_path', e.target.value)
                }
              />
            </div>
            <div>
              <span
                className={`mx-6 py-4 my-2 ${Colors.shining} font-bold text-xs`}
              >
                画像高さ
              </span>
              <TextareaAutosize
                className={heightStyle}
                value={noteItem.image_height}
                onChange={(e) =>
                  changeText(index, 'image_height', e.target.value)
                }
              />
            </div>
          </>
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
  )
})
