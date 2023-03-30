import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { memo, useState, VFC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '../../../../app/hooks'
import { setEdittingTerms } from '../../../../slices/editSlice'
import { Tag, Term } from '../../../../types/types'
import { EditTerm } from './EditTerm'
import { TermAddButton } from './TermAddButton'
import { TermContext } from './TermContext'

interface Props {
  term: Term
  index: number
  terms: Term[]
  forQuestion: boolean
  tag: Tag
  star: boolean
}

export const TermTreeNode: VFC<Props> = memo(({ term, index, terms, forQuestion, tag, star }) => {
  const dispatch = useAppDispatch()
  const [fold, setFold] = useState(term.fold || false)
  const onClickFold = (_fold: boolean) => {
    const newTerms = [...terms]
    newTerms[index] = { ...newTerms[index], fold: _fold }
    for (var i = 0; i < newTerms.length; i++) {
      if (i > index) {
        if (newTerms[i].level > term.level) {
          newTerms[i] = { ...newTerms[i], hide: _fold }
          // if (i + 1 < newTerms.length && newTerms[i + 1].level === term.level) {
          //   break
          // }
        } else {
          break
        }
      }
    }
    dispatch(setEdittingTerms(newTerms))
    setFold(_fold)
  }
  const value = { term, index, forQuestion, star }
  return (
    <div
      key={term.term_id}
      className="flex items-stretch w-full"
    >
      <Draggable index={index} draggableId={term.term_id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full"
          >
            <div className="flex items-stretch w-full">
              <div className="flex-none mt-2 pt-1 w-6">
                {fold ? (
                  <ChevronRightIcon className="w-4 h-4 text-white cursor-pointer" onClick={() => onClickFold(!fold)} />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-white cursor-pointer" onClick={() => onClickFold(!fold)} />
                )}
              </div>
              <div className="grow w-full">
                <TermContext.Provider value={value}>
                  <EditTerm />
                </TermContext.Provider>
              </div>
              {!star &&
                <div className="flex-none mt-2 pt-1 w-6">
                  <TermAddButton
                    terms={terms}
                    tag={tag}
                    index={index}
                  />
                </div>
              }
            </div>
          </div>
        )
        }
      </Draggable >
    </div >
  )
}
)