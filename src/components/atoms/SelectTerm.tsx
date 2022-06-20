import { memo, VFC } from "react";
import { useTerm } from "../../hooks/useTerm";
import { Term } from "../../types/types";
interface Props {
  term: Term
  index: number
  forQuestion: boolean
}
export const SelectTerm: VFC<Props> = memo(({ term, index, forQuestion }) => {
  const { select, getBgColor } = useTerm(term, index, forQuestion)

  return (
    <div
      className={
        'place-items-center flex justify-between border rounded-full my-1 mx-1 pr-2 ' +
        'text-white font-bold text-sm text-center ' +
        getBgColor(term.level)
      }
    >
      <span
        key={term.term_id}
        className={
          'rounded-full px-6 py-1 text-left text-white text-sm font-black ' +
          `${forQuestion && 'cursor-pointer '}` + getBgColor(term.level)
        }
        onClick={() => select()}
      >
        {term.word}
      </span>
    </div>
  )
})