import { PauseIcon, RssIcon } from "@heroicons/react/solid";
import { memo, useContext, VFC } from "react";
import { ColorContext } from "../../../App";
import { Question } from "../../../types/types";
interface Props {
  question: Question
  notReady: boolean
  putQuestion: any
}
export const QReadyButton: VFC<Props> = memo(({ question, notReady, putQuestion }) => {
  const color = useContext(ColorContext)
  const onClickReady = (_notReady: boolean) => {
    putQuestion(
      {
        quest_id: question.quest_id,
        not_ready: _notReady,
      },
      question
    )
  }
  return (
    <div>
      {notReady ? (
        <PauseIcon
          className={`h-8 w-8 ml-8 ${color.iconColor} cursor-pointer text-pink-500`}
          onClick={() => onClickReady(!notReady)}
        />
      ) : (
        <RssIcon
          className={`h-8 w-8 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
          onClick={() => onClickReady(!notReady)}
        />
      )}
    </div>
  )
})