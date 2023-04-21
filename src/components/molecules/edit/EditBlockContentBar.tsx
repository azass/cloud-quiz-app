import { TrashIcon } from '@heroicons/react/outline'
import { memo, useContext, FC } from 'react'
import { ColorContext } from '../../../App'
import { useEditElemContext } from './EditElemProvider'
import { useEditElemsContext } from './EditElemsProvider'
export const EditBlockContentBar: FC = memo(() => {
  const color = useContext(ColorContext)
  const { name, del, changeText, changeCheck2 } = useEditElemsContext()
  const { editElem, index, on } = useEditElemContext()
  return (
    <div
      className="flex justify-between items-center"
      title="EditBlockContentBar"
    >
      <div className="flex">
        {(name === 'description_for_question' || name === 'case_items') && (
          <input
            type="checkbox"
            className="w-5 h-5 text-black"
            checked={on()}
            onChange={(e) => changeCheck2(index)}
            title="related"
          />
        )}
        {/* {name === 'case_items' && (
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={on()}
            onChange={(e) => changeCheck2(index)}
            title="related"
          />
        )} */}
        {name !== 'explanation' && name !== 'options' && (
          <select
            className={`ml-8 w-10 h-5`}
            onChange={(e) => changeText(index, 'lv', e.target.value)}
            value={editElem?.lv}
            title={name}
          >
            {['1', '2', '3', '4'].map((i) => (
              <option value={`${i}`}>{`${i}`}</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-row pr-3 gap-4">
        <TrashIcon
          className={`h-6 w-6 ${color.iconColor} cursor-pointer hover:text-blue-500`}
          onClick={() => del(index)}
        />
      </div>
    </div>
  )
})
