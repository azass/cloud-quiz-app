import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { useTermContext } from './TermProvider'
import { useEdittingContext } from '../NoteItemsProvider'
import { iconBase, strongText } from '../../../../styles/util'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/solid'

export const TermHeader: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { editting, setEditting } = useEdittingContext()
  return (
    <div className="fixed w-1/2 pr-8 mt-14" title="TermHeader">
      <div className="flex justify-between items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          {!editting ? (
            <PencilAltIcon
              className={`w-6 h-6 mr-1 ${iconBase}`}
              onClick={() => setEditting(true)}
            />
          ) : (
            <CheckCircleIcon
              className={`w-6 h-6 mr-1 ${iconBase}`}
              onClick={() => setEditting(false)}
            />
          )}
          <div className={`pt-1 pl-4 text-base ${strongText}`}>
            {term.word}
          </div>
        </div>
        <div className="mx-8">
          <XCircleIcon
            className="w-7 h-7 mx-1 cursor-pointer text-pink-500"
            onClick={() =>
              dispatch(
                setEditContext({ ...editContext, chosenTerm: undefined })
              )
            }
          />
        </div>
      </div>
    </div>
  )
}
