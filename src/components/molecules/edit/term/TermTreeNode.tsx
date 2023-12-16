import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { memo, useState, FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectEditContext,
  selectEdittingTerms,
  setEdittingTerms,
} from '../../../../slices/editSlice'
import { TermAddButton } from './TermAddButton'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { iconAccent } from '../../../../styles/util'
import { useFireContext, useStarContext } from './TermsProvider'
import { useDescribeContext, useTermContext } from './TermProvider'
import { TermEditTile } from './TermEditTile'
import { TermNoteBlock } from './TermNoteBlock'

export const TermTreeNode: FC = memo(() => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const { term, index } = useTermContext()
  const { fire } = useFireContext()
  const { star } = useStarContext()
  const [fold, setFold] = useState(term.fold || false)
  const { describe } = useDescribeContext()

  const clickFold = (isFold: boolean) => {
    const newTerms = [...terms]
    newTerms[index] = { ...newTerms[index], fold: isFold }
    for (var i = 0; i < newTerms.length; i++) {
      if (i > index) {
        if (newTerms[i].level > term.level) {
          newTerms[i] = { ...newTerms[i], hide: isFold }
        } else {
          break
        }
      }
    }
    dispatch(setEdittingTerms(newTerms))
    setFold(isFold)
  }
  return (
    <div key={term.term_id} className="flex items-stretch w-full">
      <Draggable index={index} draggableId={term.term_id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full"
          >
            <div className={`flex items-stretch w-full pl-${term.level * 4}`}>
              <div className="flex-none mt-2 pt-1 w-6">
                {fold ? (
                  <ChevronRightIcon
                    className={`w-4 h-4 ${iconAccent}`}
                    onClick={() => clickFold(!fold)}
                  />
                ) : (
                  <ChevronDownIcon
                    className={`w-4 h-4 ${iconAccent}`}
                    onClick={() => clickFold(!fold)}
                  />
                )}
              </div>
              <div className="grow w-full">
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
                  <TermEditTile />
                  {describe && <TermNoteBlock />}
                </NoteItemsProvider>
              </div>
              {!star && !fire && (
                <div className="flex-none mt-2 pt-1 w-6">
                  <TermAddButton index={index} />
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
})
