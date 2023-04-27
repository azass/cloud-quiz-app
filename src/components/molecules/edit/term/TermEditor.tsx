import log from 'loglevel'
import { FC, memo, useState } from 'react'
import { TermDescription } from './TermDescription'
import { TermKeyword } from './TermKeyword'
import { TermDescriptionIcon } from './TermDescriptionIcon'
import { TermOperateIconSet } from './TermOperateIconSet'
import { TermHeader } from './TermHeader'
import {
  useDescribeContext,
  useEditTermContext,
  useLevelContext,
  useTermContext,
  useWordContext,
} from './TermProvider'
import { useNoteItemsContext } from '../NoteItemsProvider'
import { strongText } from '../../../../styles/util'

export const TermEditor: FC = memo(() => {
  log.setLevel('info')
  const { term } = useTermContext()
  const { draggable } = useNoteItemsContext()
  const { word, setWord } = useWordContext()
  const { level, setLevel } = useLevelContext()
  const { describe } = useDescribeContext()
  const { getBgColor } = useEditTermContext()
  const [termId, setTermId] = useState(term.term_id)
  if (termId !== term.term_id) {
    setTermId(term.term_id)
    if (word !== term.word) setWord(term.word)
    if (level !== term.level) setLevel(term.level)
  }
  return (
    <>
      {draggable ? (
        <>
          <div
            className={
              'place-items-center flex justify-between border rounded-full ' +
              `my-1 mx-1 pr-2 text-sm ${strongText} ` +
              getBgColor(level)
            }
          >
            <div className="flex justify-start items-center px-2">
              <div className={`flex items-center`}>
                <TermDescriptionIcon />
                <TermKeyword />
              </div>
            </div>
            <TermOperateIconSet />
          </div>
          {describe && <TermDescription />}
        </>
      ) : (
        <>
          <TermHeader />
          <div className="mt-24">
            <TermDescription />
          </div>
        </>
      )}
    </>
  )
})
