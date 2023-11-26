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
  const fromcolors = [
    'from-blue-800',
    'from-sky-500',
    'from-blue-600',
    'from-cyan-500',
    'from-blue-400',
    'from-teal-400',
  ]
  const viacolors = [
    'via-blue-900',
    'via-blue-900',
    'via-blue-900',
    'via-blue-900',
    'via-blue-900',
    'via-blue-900',
  ]
  const fromcolorsSelected = [
    'from-red-500',
    'from-pink-400',
    'from-red-300',
    'from-pink-300',
    'from-red-200',
    'from-pink-200',
  ]
  const viacolorsSelected = [
    'via-pink-500',
    'via-pink-500',
    'via-pink-500',
    'via-pink-500',
    'via-pink-500',
    'via-pink-500',
  ]
  const getFromColor = (lv: number) => {
    return `${term.selected ? fromcolorsSelected[lv - 1] : fromcolors[lv - 1]}`
  }
  const getViaColor = (lv: number) => {
    return `${term.selected ? viacolorsSelected[lv - 1] : viacolors[lv - 1]}`
  }

  return (
    <div
      className={
        'place-items-center flex justify-between border rounded-full ' +
        `my-1 mx-1 pr-2 text-sm ${strongText} bg-gradient-to-r ${getFromColor(
          level
        )} from-10% ${getViaColor(level)} via-20% to-black to-90%`
      } title="TermEditTile"
    >
      <div className="flex justify-start items-center w-full">
        <div className={`flex items-center w-full`}>
          <div className="px-4">
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
          </div>
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
