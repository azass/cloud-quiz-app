import { TrashIcon } from "@heroicons/react/outline";
import { memo, useContext, VFC } from "react";
import { ColorContext } from "../../App";
import { EditElem } from "../../types/types";
interface Props {
  editElem: EditElem
  name: string
  index: number
  onClickDelete: any
  onChangeText: any
  onChangeCheck: any
  onSelectCase?: any
  on: any
}
export const EditBlockContentBar: VFC<Props> = memo(({
  editElem,
  name,
  index,
  onClickDelete,
  onChangeText,
  onChangeCheck,
  onSelectCase,
  on
}) => {
  const color = useContext(ColorContext)
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        {name === 'description_for_question' && (
          <input
            type="checkbox"
            className="w-5 h-5 text-black"
            checked={on()}
            onChange={(e) => onChangeCheck(index)}
          />
        )}
        {name === 'case_items' && (
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={on()}
            onChange={(e) => onSelectCase(index)}
          />
        )}
        {name !== 'explanation' && name !== 'options' && (
          <select
            className={`ml-8 w-10 h-5`}
            onChange={(e) =>
              onChangeText(index, 'lv', e.target.value)
            }
            value={editElem.lv}
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
          onClick={() => onClickDelete(index)}
        />
      </div>
    </div>
  )
})