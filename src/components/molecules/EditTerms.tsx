import { useContext, useState, VFC } from "react";
import { DragDropContext, Droppable, resetServerContext } from "react-beautiful-dnd";
import { ColorContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TermAddButton } from "../atoms/TermAddButton";
import { TermDraggable } from "../atoms/TermDraggable";
import {
  selectEditContext,
  selectEdittingTerms,
  setEdittingTerms,
  setUpdateTerm
} from "../../slices/editSlice";
import { SelectTerm } from "../atoms/SelectTerm";
import { TermSaveButton } from "../atoms/TermSaveButton";

export const EditTerms: VFC = () => {
  const color = useContext(ColorContext)
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const [draggable, setDraggable] = useState(true)

  const handleDragEnd = (result: any) => {
    const newTerms = [...terms]
    const remove = newTerms.splice(result.source.index, 1)
    newTerms.splice(result.destination.index, 0, remove[0])
    dispatch(setEdittingTerms(newTerms))
    dispatch(setUpdateTerm(true))
  }
  const toggle = () => {
    resetServerContext()
    setDraggable(!draggable)
  }
  return (
    <>
      <div className="flex pl-4 pb-4 h-11">
        <span
          className={`rounded-full px-6 pt-1 bg-pink-600 text-white font-bold cursor-pointer ${color.bgColor}`}
          onClick={() => toggle()}
        >
          {editedContext.chosenTag.tag_name}
        </span>
        <TermSaveButton chosenTag={editedContext.chosenTag} />
      </div>
      <div id="navWrapper" className={color.bgColor}>
        <nav id="nav" className="pr-2 overflow-y-auto text-base h-screen pb-60">
          {draggable ? (
            <>
              {terms.length === 0 ? (
                <TermAddButton terms={terms} tag={editedContext.chosenTag} index={terms.length} />
              ) : (
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
                            {term.changed !== "delete" && (
                              <TermDraggable
                                term={term}
                                index={index}
                                terms={terms}
                                forQuestion={editedContext.forQuestion}
                                tag={editedContext.chosenTag}
                              />
                            )}
                          </>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </>
          ) : (
            <div className="flex flex-wrap justify-start items-center pb-60">
              {terms.map((term, index) => (
                <SelectTerm term={term} index={index} forQuestion={editedContext.forQuestion} />
              ))}
            </div>
          )}
        </nav>
      </div>
    </>
  )
}