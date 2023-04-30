import log from 'loglevel'
import { FC, memo } from 'react'
import { TermDescription } from './TermDescription'
import { TermNoteHeader } from './TermNoteHeader'
import { useDescribeContext } from './TermProvider'
import { useNoteItemsContext } from '../NoteItemsProvider'
import { TermDraggableSelect } from './TermDraggableSelect'

export const TermEditor: FC = memo(() => {
  log.setLevel('info')
  const { draggable } = useNoteItemsContext()
  const { describe } = useDescribeContext()

  return (
    <>
      {draggable ? (
        <>
          <TermDraggableSelect />
          {describe && <TermDescription />}
        </>
      ) : (
        <>
          <TermNoteHeader />
          <div className="fixed w-1/2 pr-16 mt-24">
            <TermDescription />
          </div>
        </>
      )}
    </>
  )
})
