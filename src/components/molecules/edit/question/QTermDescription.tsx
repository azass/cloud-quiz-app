import { FC, memo } from 'react'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { NoteItemProvider } from '../NoteItemProvider'
import { NoteItemTile } from '../NoteItemTile'
import { NoteItem, Term } from '../../../../types/types'

interface Props {
  description: NoteItem[]
  quest_id: string
}
export const QTermDescription: FC<Props> = memo(({ description, quest_id }) => {
  return (
    <NoteItemsProvider
      name="description"
      noteItems={description}
      editable={false}
    >
      {description.map(
        (editElem, index) =>
          editElem.quest_ids?.includes(quest_id) && (
            <div className="pl-0">
              <NoteItemProvider noteItem={editElem} index={index}>
                <NoteItemTile />
              </NoteItemProvider>
            </div>
          )
      )}
    </NoteItemsProvider>
  )
})
