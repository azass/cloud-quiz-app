import { memo, FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext } from '../../../../slices/editSlice'
import { TermAddButton } from './TermAddButton'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { useFireContext, useStarContext } from './TermsProvider'
import { useDescribeContext, useTermContext } from './TermProvider'
import { TermEditTile } from './TermEditTile'
import { TermNoteBlock } from './TermNoteBlock'
import { TermTreeButton } from './TermTreeButton'

export const TermTreeNode: FC = memo(() => {
  const editContext = useAppSelector(selectEditContext)
  const { term, index } = useTermContext()
  const { fire } = useFireContext()
  const { star } = useStarContext()
  const { describe } = useDescribeContext()

  return (
    <Draggable index={index} draggableId={term.term_id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full"
        >
          <NoteItemsProvider
            name={
              editContext.forQuestion
                ? 'description_for_question'
                : 'description'
            }
            noteItems={term.description || []}
            editable={true}
            draggable={true}
            editting={term.changed ? term.changed === 'new' : false}
            hasAddTextarea={true}
            hasAddLink={true}
            hasAddImage={true}
          >
            <div className={`flex items-stretch w-full pl-${term.level * 4}`}>
              <TermTreeButton />
              <div className="grow w-full">
                <TermEditTile />
              </div>
              {!star && !fire && (
                <div className="flex-none mt-2 pt-1 w-6">
                  <TermAddButton index={index} />
                </div>
              )}
            </div>
            <div
              className={`flex items-stretch w-full pl-${term.level * 4 - 4}`}
            >
              {describe && <TermNoteBlock />}
            </div>
          </NoteItemsProvider>
        </div>
      )}
    </Draggable>
  )
})
