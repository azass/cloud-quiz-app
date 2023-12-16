import { memo, FC } from 'react'
import { Term } from '../../../../types/types'
import { TermTag } from '../../../atoms/TermTag'

interface Props {
  terms: Term[]
}
export const QTerms: FC<Props> = memo(({ terms }) => {
  return (
    <>
      {terms.map((term) => (
        <TermTag term={term} />
      ))}
    </>
  )
})
