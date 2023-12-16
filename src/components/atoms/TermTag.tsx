import { FC, memo } from 'react'
import { Term } from '../../types/types'
import Colors from '../../consts/colors'
import { strongText } from '../../styles/util'
interface Props {
  term: Term
}
export const TermTag: FC<Props> = memo(({ term }) => {
  return (
    <>
      {term.word !== 'is ?' && (
        <span
          title="QTerms"
          key={term.term_id}
          className={
            `rounded-full border my-1 mr-1 py-1 px-3 text-left ${strongText} ` +
            `${Colors.termNodeBgcolors[term.level - 1]}`
          }
        >
          {term.word}
        </span>
      )}
    </>
  )
})
