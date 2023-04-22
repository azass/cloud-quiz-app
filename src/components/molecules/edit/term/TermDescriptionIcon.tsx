import { FC } from 'react'
import {
  AcademicCapIcon,
  StatusOnlineIcon,
  MinusCircleIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { useTermContext, useDescribeContext } from './TermProvider'
import { iconAccent } from '../../../../styles/util'

export const TermDescriptionIcon: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { describe, setDescribe } = useDescribeContext()
  const iconStyle = `w-4 h-4 ${iconAccent}`
  const setChosenTerm = () => {
    dispatch(setEditContext({ ...editContext, chosenTerm: term }))
  }
  return (
    <>
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
    </>
  )
}
