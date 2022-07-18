import { VFC, memo } from 'react'
import {
  DocumentAddIcon,
  ExternalLinkIcon,
  PhotographIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'
import { AnnotationIcon } from '@heroicons/react/outline'

interface Props {
  index: number
  name: string
  onClickAdd: any
}
export const EditElemAdds: VFC<Props> = memo(({ index, name, onClickAdd }) => {
  const getBgColor = () => {
    return 'h-5 w-5 mx-2 text-gray-500 cursor-pointer hover:text-blue-500'
  }
  return (
    <div
      className={`flex justify-between ${name !== 'options' && 'pt-4'}`}
      title="EditElemAdds"
    >
      <div className="flex justify-start">
        {name === 'explanation' && (
          <ExternalLinkIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'link')}
          />
        )}
        {name !== 'options' && (
          <DocumentAddIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'textarea')}
          />
        )}
        {name.startsWith('description') && (
          <ExternalLinkIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'link')}
          />
        )}
        {name !== 'options' && (
          <PhotographIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'image')}
          />
        )}
        {name === 'options' && (
          <>
            <PlusCircleIcon
              className={getBgColor()}
              onClick={() => onClickAdd(index, 'option')}
            />
            <AnnotationIcon
              className={getBgColor()}
              onClick={() => onClickAdd(index, 'textbox')}
            />
          </>
        )}
      </div>
    </div>
  )
})
