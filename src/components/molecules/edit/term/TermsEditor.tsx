import { useContext, useState, FC } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { ColorContext } from '../../../../App'
import { useAppSelector } from '../../../../app/hooks'
import { TermAddButton } from './TermAddButton'
import {
  selectEditContext,
  selectEdittingTerms,
  selectTab,
  tabs,
} from '../../../../slices/editSlice'
import { SelectTerm } from './SelectTerm'
import { TermSaveButton } from './TermSaveButton'
import { BookOpenIcon, StarIcon } from '@heroicons/react/solid'
import { TermTree } from './TermTree'
import { Link, useParams } from 'react-router-dom'

export const TermsEditor: FC = () => {
  const color = useContext(ColorContext)
  const editedContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const [draggable, setDraggable] = useState(true)
  const [star, setStar] = useState(false)
  const nowTab = useAppSelector(selectTab)
  const params = useParams()

  const toggle = () => {
    resetServerContext()
    setDraggable(!draggable)
  }
  return (
    <>
      <div className="flex justify-between items-center w-full pl-4 pb-4 h-12">
        <div className="flex">
          <span
            className={`rounded-full px-6 py-1 bg-pink-600 text-white font-bold cursor-pointer ${color.bgColor}`}
            onClick={() => toggle()}
            title={String(editedContext.chosenTag.tag_no)}
          >
            {editedContext.chosenTag.tag_name}
          </span>
          <TermSaveButton />
        </div>
        <div className="flex">
          <StarIcon
            className={
              'h-8 w-8 mr-8 cursor-pointer ' +
              `${star ? 'text-blue-400' : 'text-gray-700'}`
            }
            onClick={() => setStar(!star)}
          />
          {nowTab === tabs[2] && (
            <Link to={`/editor/${params.exam_id}`}>
              <BookOpenIcon
                className={
                  'h-8 w-8 mr-8 cursor-pointer ' +
                  `${star ? 'text-blue-400' : 'text-gray-700'}`
                }
              />
            </Link>
          )}
        </div>
      </div>
      <div id="navWrapper" className={color.bgColor}>
        <nav id="nav" className="pr-2 overflow-y-auto text-base h-screen pb-60">
          {draggable ? (
            <div>
              {terms.length === 0 ? (
                <TermAddButton
                  terms={terms}
                  tag={editedContext.chosenTag}
                  index={terms.length}
                />
              ) : (
                <TermTree star={star} />
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-start items-center pb-60">
              {terms.map((term, index) => (
                <SelectTerm
                  term={term}
                  index={index}
                  forQuestion={editedContext.forQuestion}
                />
              ))}
            </div>
          )}
        </nav>
      </div>
    </>
  )
}