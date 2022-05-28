import { VFC, memo, useState, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  setUpdateTerm,
  selectEditContext,
  selectCallTermEdit,
  selectEdittingTerms,
  resetCallTermEdit,
  setEdittingTerms,
  selectEdittingTag,
  resetEdittingTag,
} from '../../slices/editSlice'
import { useQueryTerms } from '../../hooks/useQueryTerms'
import { Tag, Term, voidTag } from '../../types/types'
import { TermSaveButton } from '../atoms/TermSaveButton'
import { EditTerm } from '../molecules/EditTerm'
import { TermAddButton } from '../atoms/TermAddButton'
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from 'react-beautiful-dnd'
import { TermDraggable } from '../atoms/TermDraggable'
import { ColorContext } from '../../App'

export const TermEditFrame: VFC = memo(() => {
  const color = useContext(ColorContext)
  const [draggable, setDraggable] = useState(true)
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const edittingTag = useAppSelector(selectEdittingTag)
  const [chosenTag, setChosenTag] = useState<Tag>(edittingTag ? { ...edittingTag } : editedContext.chosenTag)
  const [forQuestion] = useState(!edittingTag)
  const callTermEdit = useAppSelector(selectCallTermEdit)
  const terms = useAppSelector(selectEdittingTerms)

  const { status, data } = useQueryTerms(chosenTag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (callTermEdit) {
    if (edittingTag) {
      setChosenTag(edittingTag)
      if (data) {
        dispatch(setEdittingTerms(data))
      }
      dispatch(resetEdittingTag())
    } else {
      setChosenTag(editedContext.chosenTag)
      const selectedTerms: Term[] = JSON.parse(editedContext.keywordsJson)[editedContext.chosenTag.tag_name]
      const selectedTermIds = selectedTerms.map((term) => term.term_id)
      if (data) {
        const newTerms: Term[] = []
        for (var term of data) {
          newTerms.push({
            ...term,
            selected: selectedTermIds.includes(term.term_id),
          })
        }
        dispatch(setEdittingTerms(newTerms))
      }
    }
    dispatch(resetCallTermEdit())
  }
  const handleDragEnd = (result: any) => {
    const newTerms = [...terms]
    const remove = newTerms.splice(result.source.index, 1)
    newTerms.splice(result.destination.index, 0, remove[0])
    dispatch(setEdittingTerms(newTerms))
    dispatch(setUpdateTerm(true))
  }
  return (
    <div className="mx-6 my-6">
      <div className="flex justify-between px-8 pb-8">
        <span>Term Editor</span>
      </div>
      <div className="flex pl-4 pb-4 h-11">
        <span
          className={`rounded-full px-6 pt-1 bg-pink-600 text-white font-bold cursor-pointer ${color.bgColor}`}
          onClick={() => {
            resetServerContext()
            setDraggable(!draggable)
          }}
        >
          {chosenTag.tag_name}
        </span>
        <TermSaveButton chosenTag={chosenTag} />
      </div>
      <div id="navWrapper" className={color.bgColor}>
        <nav id="nav" className="px-6 overflow-y-auto text-base h-screen pb-60">
          {draggable ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                  <div
                    className="pb-48"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {terms.map((term, index) => (
                      <div key={term.term_id}>
                        <TermDraggable
                          term={term}
                          index={index}
                          terms={terms}
                          forQuestion={forQuestion}
                        />
                      </div>
                    ))}
                    <TermAddButton terms={terms} tag={chosenTag} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="flex flex-wrap justify-start pt-8 pb-60">
              {terms.map((term, index) => (
                <EditTerm term={term} index={index} terms={terms} forQuestion={forQuestion} />
              ))}
              <TermAddButton terms={terms} tag={chosenTag} />
            </div>
          )}
        </nav>
      </div>
    </div>
  )
})
