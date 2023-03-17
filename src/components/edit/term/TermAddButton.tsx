import { VFC, memo } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch } from '../../../app/hooks'
import { setEdittingTerms } from '../../../slices/editSlice'
import { v4 as uuidv4 } from 'uuid'
import { Tag, Term } from '../../../types/types'

interface Props {
  terms: Term[]
  tag: Tag
  index: number
}

export const TermAddButton: VFC<Props> = memo(({ terms, tag, index }) => {
  const dispatch = useAppDispatch()
  return (
    <PlusCircleIcon
      className="w-4 h-4 text-white ml-2 cursor-pointer"
      onClick={() => {
        const newTerms = [...terms]
        newTerms.splice(index + 1, 0, {
          term_id: `trm-${uuidv4().substring(0, 6)}`,
          word: '',
          level: 1,
          sort: terms.length,
          provider: tag.provider,
          tag_no: tag.tag_no,
          changed: 'new',
        })
        dispatch(setEdittingTerms(newTerms))
      }}
    />
  )
})
