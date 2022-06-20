import { CloudUploadIcon } from "@heroicons/react/outline";
import { memo, VFC } from "react";
import { useMutateQuestion } from "../../hooks/useMutateQuestion";
import { Question } from "../../types/types";

interface Props {
  question: Question
  setRegisterToggle: any
}
export const QNewRegister: VFC<Props> = memo(({ question, setRegisterToggle }) => {
  const { createQuestion } = useMutateQuestion()
  const onClickRegister = () => {
    createQuestion(question)
    setRegisterToggle(false)
  }
  return (
    <>
      <span className="px-4 italic text-red-500">New!!</span>
      <CloudUploadIcon
        className="h-5 w-5  text-blue-400 cursor-pointer "
        onClick={() => onClickRegister()}
      />
    </>
  )
})