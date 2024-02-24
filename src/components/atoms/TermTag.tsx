import { FC, memo } from 'react'
import { Term } from '../../types/types'
import Colors from '../../consts/colors'
import { strongText } from '../../styles/util'
import { useTermTag } from '../../hooks/useTermTag'
interface Props {
  term: Term
  withSub: boolean
}
export const TermTag: FC<Props> = memo(({ term, withSub }) => {
  const { getTagColor } = useTermTag(term.level)
  return (
    <div
      key={term.term_id}
      className={
        `rounded-full border my-1 mr-1 py-1 px-5 text-left ${strongText} ` +
        `${withSub ? 'text-sm' : ''} ` +
        `${withSub ? getTagColor() : Colors.termNodeBgcolors[term.level - 1]}`
      }
    >
      <div title="TermTag">{term.word}</div>
      {withSub && term.explain && (
        <div
          className={`px-1 ml-1 text-left ${
            term.selected ? 'text-white' : 'text-gray-100'
          } text-[10px] `}
        >
          {term.explain}
        </div>
      )}
    </div>
  )
})
