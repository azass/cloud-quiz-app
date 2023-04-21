import { EyeIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { memo, useContext, FC } from 'react'
import { ColorContext } from '../../../App'
import {
  useEditElemsContext,
  useEnableEditContext,
  useShowAllQuestionCaseContext,
  useShowCheckboxContext,
} from './EditElemsProvider'
interface Props {
  title: string
}
export const EditBlockHeader: FC<Props> = memo(({ title }) => {
  const { name } = useEditElemsContext()
  const color = useContext(ColorContext)
  const { enableEdit, setEnableEdit } = useEnableEditContext()
  const { showCheckbox, setShowCheckbox } = useShowCheckboxContext()
  const { showAllQuestionCase, setShowAllQuestionCase } =
    useShowAllQuestionCaseContext()

  const onClickEye = () => {
    if (name === 'options') {
      setShowCheckbox(!showCheckbox)
    } else if (name === 'case_items') {
      setShowAllQuestionCase(!showAllQuestionCase)
    }
  }
  return (
    <div className={`flex items-center gap-2 my-4 font-bold ${color.baseText}`}>
      {title}
      {(name === 'options' || name === 'case_items') && (
        <EyeIcon
          className="w-4 h-4 ml-4 cursor-pointer hover:text-blue-500"
          onClick={() => onClickEye()}
        />
      )}
      <div>
        {enableEdit ? (
          <CheckCircleIcon
            className={`h-6 w-6 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
        ) : (
          <PencilAltIcon
            className={`h-5 w-5 ml-8 ${color.iconColor} cursor-pointer hover:text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
        )}
      </div>
    </div>
  )
})
