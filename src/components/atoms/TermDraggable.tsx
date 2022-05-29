import { memo, VFC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Term } from '../../types/types'
import { EditTerm } from '../molecules/EditTerm'

interface Props {
  term: Term
  index: number
  terms: Term[]
  forQuestion: boolean
}

export const TermDraggable: VFC<Props> = memo(({ term, index, terms, forQuestion }) => {
  return (
    <Draggable index={index} draggableId={term.term_id}>
      {(provided) => (
        <div className="w-full">
          <div
            // className={`z-10 w-0 h-0 pl-${term.level * 8}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {/* <div className={`pl-${term.level * 8}`}> */}
            <EditTerm
              term={term}
              index={index}
              terms={terms}
              draggable={true}
              forQuestion={forQuestion}
            />
            {/* </div> */}
          </div>
        </div>
      )}
    </Draggable>
  )
}
)