import { FC, memo } from 'react'
import {
  DocumentAddIcon,
  ExternalLinkIcon,
  PhotographIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/solid'
import { AnnotationIcon } from '@heroicons/react/outline'
import { useNoteItemsContext } from './NoteItemsProvider'
import { iconHover } from '../../../styles/util'

interface Props {
  index: number
}
export const NoteItemAdds: FC<Props> = memo(({ index }) => {
  const { add } = useNoteItemsContext()
  const { hasAddTextarea, hasAddLink, hasAddImage, isOptions } =
    useNoteItemsContext()
  const style = `h-5 w-5 mx-2 ${iconHover}`
  return (
    <div
      className={`flex justify-between ${!isOptions && 'py-2'}`}
      title="NoteItemAdds"
    >
      <div className="flex justify-start">
        {hasAddTextarea && (
          <DocumentAddIcon
            className={style}
            onClick={() => add(index, 'textarea')}
          />
        )}
        {hasAddLink && (
          <ExternalLinkIcon
            className={style}
            onClick={() => add(index, 'link')}
          />
        )}
        {hasAddImage && (
          <PhotographIcon
            className={style}
            onClick={() => add(index, 'image')}
          />
        )}
        {isOptions && (
          <>
            <PlusCircleIcon
              className={style}
              onClick={() => add(index, 'option')}
            />
            <PlusIcon
              className={style}
              onClick={() => add(index, 'select')}
            />
            <AnnotationIcon
              className={style}
              onClick={() => add(index, 'textbox')}
            />
          </>
        )}
      </div>
    </div>
  )
})
