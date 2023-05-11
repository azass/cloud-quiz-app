import { memo, FC } from 'react'
import Colors from '../../../../consts/colors'
import { strongText } from '../../../../styles/util'
import { Term } from '../../../../types/types'

interface Props {
  terms: Term[]
}
export const QTerms: FC<Props> = memo(({ terms }) => {
  return (
    <>
      {terms.map((term) => (
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
      ))}
    </>
  )
})
