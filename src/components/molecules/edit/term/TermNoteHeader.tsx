import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { useTermContext } from './TermProvider'
import { strongText } from '../../../../styles/util'
import { XCircleIcon } from '@heroicons/react/solid'
import { useOpenBookContext } from '../../../pages/QuizEditor'

export const TermNoteHeader: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { open } = useOpenBookContext()
  return (
    <div className={`fixed ${open ? 'w-1/2' : 'w-full'} pr-8 mt-14`}>
      <div className="flex justify-between items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div className={`pt-1 pl-4 text-base ${strongText}`}>{term.word}</div>
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