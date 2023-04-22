import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid'
import { memo, useState, FC } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { strongText } from '../../../../styles/util'

interface Props {
  index: number
  label: string
  editable: boolean
  update: any
  remove: any
}
export const QLabel: FC<Props> = memo(
  ({ index, label, editable, update, remove }) => {
    const [editting, setEditting] = useState(false)
    const [value, setValue] = useState(label)
    const edit = () => {
      setEditting(!editting)
      if (editting) {
        update(index, value)
      }
    }
    if (!editting && value !== label) {
      setValue(label)
    }
    if (label === '' && !editting) {
      setEditting(true)
    }
    return (
      <div
        className={`flex items-center rounded-full border my-1 mr-1 py-1 px-3 text-xs bg-orange-500 ${strongText}`}
        title="QLabel"
      >
        {!editable || !editting ? (
          <span className="">{value}</span>
        ) : (
          <ReactTextareaAutosize
            className="text-black px-2 py-1 my-1 border-0 resize"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {editable && (
          <>
            <PencilAltIcon
              className={`w-4 h-4 ml-4 mr-1 cursor-pointer`}
              onClick={() => edit()}
            />
            <XCircleIcon
              className="w-4 h-4 mx-1 cursor-pointer"
              onClick={() => remove(index)}
            />
          </>
        )}
      </div>
    )
  }
)
