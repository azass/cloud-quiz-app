import { memo, VFC } from "react";
import { Question } from "../../../../types/types";
interface Props {
  question: Question
  isOld: boolean
  putQuestion: any
}
export const QRArchiveToggle: VFC<Props> = memo(({ question, isOld, putQuestion }) => {
  const onClickOld = (_isOld: boolean) => {
    putQuestion(
      {
        quest_id: question.quest_id,
        is_old: _isOld,
      },
      question
    )
  }
  return (
    <div className="flex">
      <label className="inline-flex relative items-center mt-1 mr-4 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={!isOld}
          readOnly
        />
        <div
          onClick={() => {
            onClickOld(!isOld)
          }}
          className="w-7 h-4 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-600"
        ></div>
      </label>
    </div>

  )
})