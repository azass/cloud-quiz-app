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
export const TermTile: FC<Props> = memo(({ term, index }) => {
  const { select, getBgColor } = useTerm(term, index)
  const editContext = useAppSelector(selectEditContext)

  return (
    <div
      className={
        `place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2` +
        ` ${strongText} text-sm text-center ${
          term.level === 1
            ? 'mt-3 bg-gradient-to-r from-blue-700 via-black to-black'
            : getBgColor(term.level)
        }`
      }
    >
      <span
        key={term.term_id}
        className={
          `rounded-full pl-6 text-left ${
            term.level === 1
              ? 'py-1 text-white font-bold text-sm bg-blue-800'
              : 'py-1 text-white text-sm ' + getBgColor(term.level)
          }` + `${editContext.forQuestion && ' cursor-pointer'}`
        }
        onClick={() => select()}
      >
        {term.word}
      </span>
      <TermNoteLink />
    </div>
  )
})
