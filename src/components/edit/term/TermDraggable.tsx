import { memo, VFC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Tag, Term } from '../../../types/types'
import { EditTerm } from './EditTerm'
import { TermAddButton } from './TermAddButton'

interface Props {
  term: Term
  index: number
  terms: Term[]
  forQuestion: boolean
  tag: Tag
}

export const TermDraggable: VFC<Props> = memo(({ term, index, terms, forQuestion, tag }) => {
  return (
    <div
      key={term.term_id}
      className="flex justify-between items-center"
    >
      <Draggable index={index} draggableId={term.term_id}>
        {(provided) => (
          <div className="w-full">
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <EditTerm
                term={term}
                index={index}
                forQuestion={forQuestion}
              />
            </div>
          </div>
        )}
      </Draggable>
      <TermAddButton
        terms={terms}
        tag={tag}
        index={index}
      />
    </div>
  )
}
)