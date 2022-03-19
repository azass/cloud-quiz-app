import { VFC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Term } from '../../types/types'
import { EditTerm } from '../molecules/EditTerm'

interface Props {
  term: Term
  index: number
  terms: Term[]
}

export const TermDraggable: VFC<Props> = ({ term, index, terms }) => {
  return (
    <Draggable index={index} draggableId={term.term_id}>
      {(provided) => (
        <div className="">
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
            />
            {/* </div> */}
          </div>
        </div>
      )}
    </Draggable>
  )
}
