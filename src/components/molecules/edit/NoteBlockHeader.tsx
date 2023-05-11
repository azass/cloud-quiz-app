import { EyeIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import {
  iconBase,
  iconHover,
  iconShine,
  strongText,
} from '../../../styles/util'
interface Props {
  title: string
}
export const NoteBlockHeader: FC<Props> = memo(({ title }) => {
  const { clickEye } = useNoteItemsContext()
  const { editting, setEditting } = useEdittingContext()
  return (
    <div className={`flex items-center gap-2 mt-2 mb-1 ${strongText}`}>
      {title}
      {clickEye && (
        <EyeIcon
          className={`w-4 h-4 ml-4 ${iconHover}`}
          onClick={() => clickEye()}
        />
      )}
      <div>
        {editting ? (
          <CheckCircleIcon
            className={`h-6 w-6 ml-8 ${iconShine}`}
            onClick={() => setEditting(!editting)}
          />
        ) : (
          <PencilAltIcon
            className={`h-5 w-5 ml-8 ${iconBase}`}
            onClick={() => setEditting(!editting)}
          />
        )}
      </div>
    </div>
  )
})
