import { memo, useContext, VFC } from "react";
import { ColorContext } from "../../App";
import { Bug } from "../../types/types";
import { TrashIcon } from '@heroicons/react/solid'

interface Props {
  bug: Bug
  onClickDelete: any
}

export const QBug: VFC<Props> = memo(({ bug, onClickDelete }) => {
  const color = useContext(ColorContext)
  return (
    <>
      <div className="flex items-center py-4">
        <div className={`flex gap-2 my-2 mr-2 font-bold ${color.baseText}`}>
          バグ
        </div>
        <TrashIcon
          className={`h-5 w-5 ${color.iconColor} cursor-pointer hover:text-blue-500 mr-4`}
          onClick={() => onClickDelete()}
        />
        {("in_question" in bug && bug.in_question) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>問題</div>
        )}
        {("in_option" in bug && bug.in_option) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>選択肢</div>
        )}
        {("in_tag" in bug && bug.in_tag) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>タグ</div>
        )}
        {("in_explanation" in bug && bug.in_explanation) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>解説</div>
        )}
      </div>
      {("memo" in bug) && (
        <div className={`flex-shrink-0 border p-1 pl-2 ml-14 ${color.baseText}`}>{bug.memo}</div>
      )}
    </>
  )
})