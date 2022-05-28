import { memo, VFC } from 'react'
import { bgcolor } from '../../types/types'

interface Props {
  terms: any[]
}
export const QTerms: VFC<Props> = memo(({ terms }) => {
  return (
    <>
      {terms.map((term) => (
        <>
          {term.word !== "is ?" && <span
            key={term.term_id}
            className={
              'rounded-full border my-1 mr-1 py-1 px-3 text-white font-bold text-left ' +
              `${bgcolor[term.level - 1]}`
            }
          >
            {term.word}
          </span>}
        </>
      ))}
    </>
  )
})
