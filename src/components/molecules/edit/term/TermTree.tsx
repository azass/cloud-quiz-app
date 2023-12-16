import { memo, FC } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import {
  selectEdittingTerms,
  setEdittingTerms,
  setUpdateTerm,
} from '../../../../slices/editSlice'
import { TermTreeNode } from './TermTreeNode'
import { TermProvider } from './TermProvider'
import {
  useFireContext,
  useLockDragContext,
  useStarContext,
} from './TermsProvider'

export const TermTree: FC = memo(() => {
  const dispatch = useAppDispatch()
  const terms = useAppSelector(selectEdittingTerms)
  const { isVisibleTag } = useAppearanceTerm()
  const { fire } = useFireContext()
  const { star } = useStarContext()
  const { lockDrag } = useLockDragContext()
  const handleDragEnd = (result: any) => {
    if (!lockDrag) {
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
                  isVisibleTag(star, fire, term.quest_ids || []) &&
                  !term.hide && (
                    <TermProvider term={term} index={index}>
                      <TermTreeNode />
                    </TermProvider>
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
