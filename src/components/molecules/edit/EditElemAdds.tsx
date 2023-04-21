import { FC, memo } from 'react'
import {
  DocumentAddIcon,
  ExternalLinkIcon,
  PhotographIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'
import { AnnotationIcon } from '@heroicons/react/outline'
import { useEditElemsContext } from './EditElemsProvider'

interface Props {
  index: number
}
export const EditElemAdds: FC<Props> = memo(({ index }) => {
  const { name, add } = useEditElemsContext()
  const getBgColor = () => {
    return 'h-5 w-5 mx-2 text-gray-500 cursor-pointer hover:text-blue-500'
  }
  return (
    <div
      className={`flex justify-between ${name !== 'options' && 'pt-4'}`}
      title="EditElemAdds"
    >
      <div className="flex justify-start">
        {name !== 'options' && (
          <DocumentAddIcon
            className={getBgColor()}
            onClick={() => add(index, 'textarea')}
          />
        )}
        {name === 'explanation' && (
          <ExternalLinkIcon
            className={getBgColor()}
            onClick={() => add(index, 'link')}
          />
        )}
        {name.startsWith('description') && (
          <ExternalLinkIcon
            className={getBgColor()}
            onClick={() => add(index, 'link')}
          />
        )}
        {name !== 'options' && (
          <PhotographIcon
            className={getBgColor()}
            onClick={() => add(index, 'image')}
          />
        )}
        {name === 'options' && (
          <>
            <PlusCircleIcon
              className={getBgColor()}
              onClick={() => add(index, 'option')}
            />
            <AnnotationIcon
              className={getBgColor()}
              onClick={() => add(index, 'textbox')}
            />
          </>
        )}
      </div>
    </div>
  )
})
