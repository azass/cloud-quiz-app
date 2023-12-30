import { FC, ReactNode, memo } from 'react'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { TermProvider } from './TermProvider'
import { Term } from '../../../../types/types'

interface Props {
  term: Term
  children: ReactNode
}
export const TermEditPanel: FC<Props> = memo(({ term, children }) => {
  return (
    <TermProvider term={term} index={-1}>
      <NoteItemsProvider
        name={'description'}
        noteItems={term.description || []}
        editable={true}
        draggable={false}
        hasAddTextarea={true}
        hasAddLink={true}
        hasAddImage={true}
      >
        {children}
      </NoteItemsProvider>
    </TermProvider>
  )
})
