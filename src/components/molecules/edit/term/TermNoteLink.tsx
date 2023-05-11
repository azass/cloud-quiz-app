import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext, setTab } from '../../../../slices/editSlice'
import { useTermContext } from './TermProvider'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { iconAccent } from '../../../../styles/util'
import { useOpenBookContext } from '../../../pages/QuizEditor'
import Label from '../../../../consts/labels'

export const TermNoteLink: FC = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { term } = useTermContext()
  const { open } = useOpenBookContext()

  const setChosenTerm = () => {
    if (!open) {
      dispatch(setTab(Label.tabs[3]))
    }
    dispatch(setEditContext({ ...editContext, chosenTerm: term }))
  }
  return (
    <ExternalLinkIcon
      className={
        `h-3 w-3 my-1 ml-1 text-blue-400` +
        ` ${iconAccent} hover:h-4 hover:w-4 hover:text-white`
      }
      onClick={() => setChosenTerm()}
    />
  )
}
