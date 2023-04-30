import { FC } from 'react'
import { QLinkPopup } from '../../../atoms/QLinkPopup'
import { XCircleIcon } from '@heroicons/react/solid'
import {
  PencilAltIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import {
  useEditTermContext,
  useTermContext,
  useTermEdittingContext,
} from './TermProvider'
import { useNoteItemsContext } from '../NoteItemsProvider'
import { iconAccent } from '../../../../styles/util'
import { TermNoteLink } from './TermNoteLink'

export const TermOperateIconSet: FC = () => {
  const { draggable } = useNoteItemsContext()
  const { term } = useTermContext()
  const { termEditting, setTermEditting } = useTermEdittingContext()
  const { update, del } = useEditTermContext()
  return (
    <div className="flex">
      <div className="flex items-center">
        {termEditting && (
          <XCircleIcon
            className="w-6 h-6 mx-1 cursor-pointer"
            onClick={() => del()}
          />
        )}
        {!termEditting ? (
          <PencilAltIcon
            className={`w-4 h-4 my-1 ml-4 mr-4 ${iconAccent}`}
            onClick={() => setTermEditting(true)}
          />
        ) : (
          <CheckCircleIcon
            className={`w-6 h-6 ml-4 mr-4 ${iconAccent}`}
            onClick={() => update()}
          />
        )}
        {draggable && term.quest_ids && term.quest_ids.length > 0 && (
          <QLinkPopup quest_ids={term.quest_ids || []} />
        )}
        <TermNoteLink />
      </div>
    </div>
  )
}
