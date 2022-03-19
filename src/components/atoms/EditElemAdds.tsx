import { VFC, memo } from 'react'
import {
  DocumentAddIcon,
  ExternalLinkIcon,
  PhotographIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'

interface Props {
  index: number
  name: string
  onClickAdd: any
}
export const EditElemAdds: VFC<Props> = memo(({ index, name, onClickAdd }) => {
  const getBgColor = () => {
    return 'h-5 w-5 mx-2 text-gray-700 cursor-pointer hover:text-blue-500'
  }
  return (
    <div className="flex justify-between">
      <div className="flex justify-start py-2">
        {name !== 'options' && (
          <DocumentAddIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'textarea')}
          />
        )}
        {name === 'explanation' && (
          <ExternalLinkIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'link')}
          />
        )}
        {name === 'description' && (
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
          <PlusCircleIcon
            className={getBgColor()}
            onClick={() => onClickAdd(index, 'option')}
          />
        )}
      </div>
    </div>
  )
})
