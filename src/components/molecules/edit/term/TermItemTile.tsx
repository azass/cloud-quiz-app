import { memo, FC } from 'react'
import { NoteItemTile } from '../NoteItemTile'
import { useEdittingContext } from '../NoteItemsProvider'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext } from '../../../../slices/editSlice'
import { NoteItem } from '../../../../types/types'
import { NoteItemProvider } from '../NoteItemProvider'

interface Props {
  editItem: NoteItem
  index: number
  changeCheck: any
}
export const TermItemTile: FC<Props> = memo(
  ({ editItem, index, changeCheck }) => {
    const editContext = useAppSelector(selectEditContext)
    const { editting } = useEdittingContext()

    return (
      <NoteItemProvider
        noteItem={editItem}
        index={index}
        hasSelectCheck={false}
        hasSelectLevel={true}
      >
        <div className="flex" title="TermItemTile">
          {/* {editting && ( */}
          <div className="relative">
            <input
              type="checkbox"
              checked={
                editItem.quest_ids?.includes(editContext.quest_id) || false
              }
              onChange={(e) => changeCheck(index)}
              className={
                `absolute left-0 w-3 h-3 -ml-1` +
                ` ${
                  editting && index === 0
                    ? 'top-10'
                    : editting
                    ? 'top-1'
                    : 'top-2'
                }`
              }
            />
          </div>
          {/* )} */}
          <div className="w-full pl-4">
            <NoteItemTile />
          </div>
        </div>
      </NoteItemProvider>
    )
  }
)
