import { VFC, memo, useState, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  setUpdateTerm,
  selectEditContext,
  selectExamTags,
  selectCallTermEdit,
  selectEdittingTerms,
  resetCallTermEdit,
  setEdittingTerms,
} from '../../slices/editSlice'
import { useQueryTerms } from '../../hooks/useQueryTerms'
import { Term, voidTag } from '../../types/types'
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
import { useTags } from '../../hooks/useTags'

export const TermEditFrame: VFC = memo(() => {
  const color = useContext(ColorContext)
  const [draggable, setDraggable] = useState(false)
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const callTermEdit = useAppSelector(selectCallTermEdit)
  const terms = useAppSelector(selectEdittingTerms)
  const examTags = useAppSelector(selectExamTags)
  const { getTag } = useTags()
  const tag = getTag(editedContext.chosenTag.tag_name)
  // examTags.find((t) => t.tag_name === editedContext.chosenTagName) || voidTag
  const { status, data } = useQueryTerms(tag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (callTermEdit) {
    const selectedTerms: Term[] = JSON.parse(editedContext.keywordsJson)[
      editedContext.chosenTag.tag_name
    ]
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
        <span>Tag Editor</span>
      </div>
      <div className="flex pl-6 pb-4 h-12">
        <span
          className={`rounded-full px-8 bg-pink-600 text-white font-bold text-lg cursor-pointer ${color.bgColor}`}
          onClick={() => {
            resetServerContext()
            setDraggable(!draggable)
          }}
        >
          {editedContext.chosenTag.tag_name}
        </span>
        <TermSaveButton />
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
                        />
                      </div>
                    ))}
                    <TermAddButton terms={terms} tag={tag} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="flex flex-wrap justify-start pt-8 pb-60">
              {terms.map((term, index) => (
                <EditTerm term={term} index={index} terms={terms} />
              ))}
              <TermAddButton terms={terms} tag={tag} />
            </div>
          )}
        </nav>
      </div>
    </div>
  )
})
