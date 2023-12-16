import { FC, memo, useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { iconAccent } from '../../../../styles/util'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectEdittingTerms,
  setEdittingTerms,
} from '../../../../slices/editSlice'
import { useTermContext } from './TermProvider'

export const TermTreeButton: FC = memo(() => {
  const dispatch = useAppDispatch()
  const terms = useAppSelector(selectEdittingTerms)
  const { term, index } = useTermContext()
  const [fold, setFold] = useState(term.fold || false)

  const clickFold = (isFold: boolean) => {
    const newTerms = [...terms]
    newTerms[index] = { ...newTerms[index], fold: isFold }
    for (var i = 0; i < newTerms.length; i++) {
      if (i > index) {
        if (newTerms[i].level > term.level) {
          newTerms[i] = { ...newTerms[i], hide: isFold }
        } else {
          break
        }
      }
    }
    dispatch(setEdittingTerms(newTerms))
    setFold(isFold)
  }
  return (
    <div className="flex-none mt-2 pt-1 w-6">
      {fold ? (
        <ChevronRightIcon
          className={`w-4 h-4 ${iconAccent}`}
          onClick={() => clickFold(!fold)}
        />
      ) : (
        <ChevronDownIcon
          className={`w-4 h-4 ${iconAccent}`}
          onClick={() => clickFold(!fold)}
        />
      )}
    </div>
  )
})
