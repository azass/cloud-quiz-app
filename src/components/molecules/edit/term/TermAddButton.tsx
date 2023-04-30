import { FC, memo } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectEditContext,
  selectEdittingTerms,
  setEdittingTerms,
} from '../../../../slices/editSlice'
import { v4 as uuidv4 } from 'uuid'
import { useTermContext } from './TermProvider'

interface Props {
  index: number
}

export const TermAddButton: FC<Props> = memo(({ index }) => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const { term } = useTermContext()
  const tag = editContext.chosenTag
  let clickCount: number = 0
  const addTerm = (level: number) => {
    const newTerms = [...terms]
    newTerms.splice(index + 1, 0, {
      term_id: `trm-${uuidv4().substring(0, 6)}`,
      word: '',
      level: level,
      sort: terms.length,
      provider: tag.provider,
      tag_no: tag.tag_no,
      changed: 'new',
    })
    dispatch(setEdittingTerms(newTerms))
  }
  const click = () => {
    clickCount++
    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          addTerm(index === 0 ? 1 : term.level + 1)
        } else {
          addTerm(index === 0 ? 1 : term.level)
        }
        clickCount = 0
      }, 200)
    }
  }
  return (
    <PlusCircleIcon
      className="w-4 h-4 text-white ml-2 cursor-pointer"
      onClick={(e) => click()}
    />
  )
})
