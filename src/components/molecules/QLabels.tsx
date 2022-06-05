import { PlusCircleIcon } from "@heroicons/react/outline";
import { PencilAltIcon } from "@heroicons/react/solid";
import { memo, useState, VFC } from "react";
import { useMutateQuestion } from "../../hooks/useMutateQuestion";
import { Question } from "../../types/types";
import { QLabel } from "./QLabel";

interface Props {
  question: Question
  readonly: boolean
}
export const QLabels: VFC<Props> = memo(({ question, readonly }) => {
  const [lastQuestId, setLastQuestId] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [editable, seteEditable] = useState(false)
  const { putQuestion } = useMutateQuestion()
  const save = () => {
    putQuestion(
      {
        quest_id: question.quest_id,
        labels: question.labels,
      },
      question
    )
  }
  const add = () => {
    setLabels([...labels, ""])
  }
  const update = (index: number, value: string) => {
    const newLabels = labels.map((label, i) => i === index ? value : label)
    question.labels = newLabels
    setLabels(newLabels)
    save()
  }
  const remove = (index: number) => {
    question.labels?.splice(index, 1)
    const newLabels = [...labels]
    newLabels.splice(index, 1)
    setLabels(newLabels)
    save()
  }
  if (lastQuestId !== question.quest_id) {
    setLastQuestId(question.quest_id)
    if (question.labels) {
      setLabels([...question.labels])
    }
    seteEditable(false)
  }
  return (
    <div className="flex flex-wrap justify-start items-center pt-8 pb-60">
      {labels.map((label, index) => (
        !(!editable && label === "") && (
          <QLabel index={index} label={label} editable={editable} update={update} remove={remove} />)
      ))}
      {editable && labels.length === (question.labels ? question.labels.length : 0) && (
        <PlusCircleIcon
          className="w-6 h-6 text-white ml-2 cursor-pointer"
          onClick={() => add()}
        />)}
      {!readonly &&
        <PencilAltIcon
          className="w-6 h-6 text-white ml-2 cursor-pointer"
          onClick={() => seteEditable(!editable)}
        />
      }
    </div>
  )
})