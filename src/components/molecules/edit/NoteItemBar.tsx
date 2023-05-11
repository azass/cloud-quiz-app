import { TrashIcon } from '@heroicons/react/outline'
import { memo, FC } from 'react'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext } from './NoteItemsProvider'
import { iconBase } from '../../../styles/util'
import { PhotographIcon } from '@heroicons/react/solid'
export const NoteItemBar: FC = memo(() => {
  const { del, changeText, changeCheck2, putOptionImage } =
    useNoteItemsContext()
  const {
    noteItem,
    index,
    on,
    hasSelectCheck,
    hasSelectLevel,
    hasPutOptionImage,
  } = useNoteItemContext()
  return (
    <div className="flex justify-between items-center" title="NoteItemBar">
      <div className="flex">
        {hasSelectCheck && (
          <input
            type="checkbox"
            className="w-5 h-5 text-black"
            checked={on()}
            onChange={(e) => changeCheck2(index)}
            title="related"
          />
        )}
        {hasSelectLevel && (
          <select
            className={`ml-8 w-10 h-5`}
            onChange={(e) => changeText(index, 'lv', e.target.value)}
            value={noteItem?.lv?.toString()}
          >
            {['1', '2', '3', '4', '5', '6'].map((i) => (
              <option value={`${i}`}>{`${i}`}</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-row pr-3 gap-4">
        {hasPutOptionImage && !('image_path' in noteItem) && (
          <PhotographIcon
            className={`h-5 w-5 mx-4 my-1 ${iconBase}`}
            onClick={() => putOptionImage(index, '', '100')}
          />
        )}
        <TrashIcon
          className={`h-6 w-6 ${iconBase}`}
          onClick={() => del(index)}
        />
      </div>
    </div>
  )
})
