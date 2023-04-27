import { memo, FC } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import {
  selectEditContext,
  selectEdittingTerms,
  setEdittingTerms,
  setUpdateTerm,
} from '../../../../slices/editSlice'
import { TermTreeNode } from './TermTreeNode'

interface Props {
  star: boolean
}
export const TermTree: FC<Props> = memo(({ star }) => {
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const { show } = useAppearanceTerm()

  const handleDragEnd = (result: any) => {
    let count = 1
    for (let i = result.source.index + 1; i < terms.length; i++) {
      if (terms[i].level > terms[result.source.index].level) {
        count++
      } else {
        break
      }
    }
    const newTerms = [...terms]
    const remove = newTerms.splice(result.source.index, count)
    newTerms.splice(result.destination.index, 0, ...remove)
    dispatch(setEdittingTerms(newTerms))
    dispatch(setUpdateTerm(true))
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="vertical">
        {(provided) => (
          <div
            className="pb-48"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {terms.map((term, index) => (
              <>
                {term.changed !== 'delete' &&
                  show(!star, term.quest_ids || []) &&
                  !term.hide && (
                    <TermTreeNode
                      term={term}
                      index={index}
                      terms={terms}
                      forQuestion={editedContext.forQuestion}
                      tag={editedContext.chosenTag}
                      star={star}
                    />
                  )}
              </>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
})
