import { FC } from 'react'
import { TermEditKeyword } from './TermEditKeyword'
import {
  useDescribeContext,
  useEditTermContext,
  useLevelContext,
  useTermContext,
  useTermEdittingContext,
} from './TermProvider'
import {
  AcademicCapIcon,
  StatusOnlineIcon,
  MinusCircleIcon,
  PencilAltIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/solid'
import { QLinkPopup } from '../../../atoms/QLinkPopup'
import { useNoteItemsContext } from '../NoteItemsProvider'
import { TermNoteLink } from './TermNoteLink'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { iconAccent, strongText } from '../../../../styles/util'

export const TermEditTile: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { level } = useLevelContext()
  const { term } = useTermContext()
  const { termEditting, setTermEditting } = useTermEdittingContext()
  const { update, del, getBgColor } = useEditTermContext()
  const { describe, setDescribe } = useDescribeContext()
  const { draggable } = useNoteItemsContext()
  const iconStyle = `w-4 h-4 ${iconAccent}`
  const setChosenTerm = () => {
    dispatch(setEditContext({ ...editContext, chosenTerm: term }))
  }
  return (
    <div
      className={
        'place-items-center flex justify-between border rounded-full ' +
        `my-1 mx-1 pr-2 text-sm ${strongText} ${getBgColor(level)}`
      }
    >
      <div className="flex justify-start items-center px-2 w-full">
        <div className={`flex items-center w-full`}>
          {!describe && term ? (
            term.description && term.description.length > 0 ? (
              <AcademicCapIcon
                className={iconStyle}
                onClick={() => setDescribe(!describe)}
                onDoubleClick={() => setChosenTerm()}
              />
            ) : (
              <StatusOnlineIcon
                className={iconStyle}
                onClick={() => setDescribe(!describe)}
                onDoubleClick={() => setChosenTerm()}
              />
            )
          ) : (
            <MinusCircleIcon
              className={iconStyle}
              onClick={() => setDescribe(!describe)}
              onDoubleClick={() => setChosenTerm()}
            />
          )}
          <TermEditKeyword />
        </div>
      </div>
      <div className="flex items-center">
      {termEditting && (
            <CheckCircleIcon
              className={`w-6 h-6 ml-5 mr-3 ${iconAccent}`}
              onClick={() => update()}
            />
          )}
        {termEditting && (
          <XCircleIcon
            className="w-7 h-7 mr-3 text-red-400 cursor-pointer"
            onClick={() => del()}
          />
        )}
        {!termEditting && (
          <PencilAltIcon
            className={`w-4 h-4 my-1 ml-4 mr-4 ${iconAccent}`}
            onClick={() => setTermEditting(true)}
          />
        )}
        {draggable && term.quest_ids && term.quest_ids.length > 0 && (
          <QLinkPopup quest_ids={term.quest_ids || []} />
        )}
        <TermNoteLink />
      </div>
    </div>
  )
}
