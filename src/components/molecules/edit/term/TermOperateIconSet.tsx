import { FC } from 'react'
import { QLinkPopup } from '../../../atoms/QLinkPopup'
import { XCircleIcon } from '@heroicons/react/solid'
import {
  PencilAltIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import {
  useEditTermContext,
  useTermContext,
  useTermEdittingContext,
} from './TermProvider'
import { useEditElemsContext } from '../EditElemsProvider'

export const TermOperateIconSet: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { draggable } = useEditElemsContext()
  const { term } = useTermContext()
  // const { enableEdit, setEnableEdit } = useEnableEditContext()
  const { termEditting, setTermEditting } = useTermEdittingContext()
  const { update, del } = useEditTermContext()
  const setChosenTerm = () => {
    dispatch(setEditContext({ ...editContext, chosenTerm: term }))
  }
  return (
    <div className="flex">
      <div className="flex items-center">
        {termEditting && (
          <XCircleIcon
            className="w-6 h-6 mx-1 cursor-pointer"
            onClick={() => del()}
          />
        )}
        {!termEditting ? (
          <PencilAltIcon
            className="w-4 h-4 my-1 ml-4 mr-4 cursor-pointer"
            onClick={() => setTermEditting(true)}
          />
        ) : (
          <CheckCircleIcon
            className="w-6 h-6 ml-4 mr- cursor-pointer"
            onClick={() => update()}
          />
        )}
        {draggable && term.quest_ids && term.quest_ids.length > 0 && (
          <QLinkPopup quest_ids={term.quest_ids || []} />
        )}
        <ExternalLinkIcon
          className={
            'h-2 w-2 my-1 ml-1 mr-1 cursor-pointer text-white hover:h-4 hover:w-4'
          }
          onClick={() => setChosenTerm()}
        />
      </div>
    </div>
  )
}