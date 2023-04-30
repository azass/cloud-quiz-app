import { memo, FC } from 'react'
import { useTerm } from '../../../../hooks/useTerm'
import { Term } from '../../../../types/types'
import { strongText } from '../../../../styles/util'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext } from '../../../../slices/editSlice'
import { TermNoteLink } from './TermNoteLink'
interface Props {
  term: Term
  index: number
}
export const TermSelect: FC<Props> = memo(({ term, index }) => {
  const { select, getBgColor } = useTerm(term, index)
  const editContext = useAppSelector(selectEditContext)

  return (
    <div
      className={
        `place-items-center flex justify-between border rounded-full` +
        ` my-1 mx-1 pr-2 ${strongText} text-sm text-center ` +
        getBgColor(term.level)
      }
    >
      <span
        key={term.term_id}
        className={
          `rounded-full pl-6 text-left ${
            term.level === 1
              ? 'my-1 text-orange-100 font-bold text-sm'
              : 'py-1 text-white text-sm'
          }` +
          `${editContext.forQuestion && ' cursor-pointer '}` +
          getBgColor(term.level)
        }
        onClick={() => select()}
      >
        {term.word}
      </span>
      <TermNoteLink />
    </div>
  )
})
