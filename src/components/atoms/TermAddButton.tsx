import { VFC, memo } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch } from '../../app/hooks'
import { setEdittingTerms } from '../../slices/editSlice'
import { v4 as uuidv4 } from 'uuid'
import { Tag, Term } from '../../types/types'

interface Props {
  terms: Term[]
  tag: Tag
}

export const TermAddButton: VFC<Props> = memo(({ terms, tag }) => {
  const dispatch = useAppDispatch()
  return (
    <PlusCircleIcon
      className="w-10 h-10 pt-2 text-red-600"
      onClick={() => {
        dispatch(
          setEdittingTerms([
            ...terms,
            {
              term_id: `trm-${uuidv4().substring(0, 6)}`,
              word: '',
              level: 1,
              sort: terms.length,
              provider: tag.provider,
              tag_no: tag.tag_no,
              changed: 'new',
            },
          ])
        )
      }}
    />
  )
})
