import log from 'loglevel'
import { FC, memo } from 'react'
import { TermNoteBlock } from './TermNoteBlock'
import { TermNoteHeader } from './TermNoteHeader'
import { useDescribeContext } from './TermProvider'
import { useNoteItemsContext } from '../NoteItemsProvider'
import { TermEditTile } from './TermEditTile'

export const TermEditor: FC = memo(() => {
  log.setLevel('info')
  const { draggable } = useNoteItemsContext()
  const { describe } = useDescribeContext()

  return (
    <>
      {draggable ? (
        <>
          <TermEditTile />
          {describe && <TermNoteBlock />}
        </>
      ) : (
        <>
          <TermNoteHeader />
          <div className="w-full pr-4 pl-4 mt-24">
            <TermNoteBlock />
          </div>
        </>
      )}
    </>
  )
})
