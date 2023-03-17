import { SearchCircleIcon, ServerIcon } from "@heroicons/react/solid";
import { memo, VFC } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useMaintenance } from "../../hooks/useMaintenance";
import { setEditedContent } from "../../slices/editSlice";
import { Exam } from "../../types/types";

interface Props {
  exam: Exam
}

export const QListHeader: VFC<Props> = memo(({ exam }) => {
  const dispatch = useAppDispatch()
  const { onClick } = useMaintenance()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <p className="pt-8 pb-4 pl-8 text-white text-lg font-bold">{exam.exam_name}</p>
        <div className="mt-3 pl-8">
          <SearchCircleIcon
            className="h-8 w-8 text-gray-400 cursor-pointer"
            onClick={() => dispatch(setEditedContent('Search'))} />
        </div>
      </div>
      <div className="mt-3 pl-8 pr-8">
        <ServerIcon
          className="h-8 w-8 text-gray-400 cursor-pointer"
          onClick={() => onClick(exam)} />
      </div>
    </div>
  )
})