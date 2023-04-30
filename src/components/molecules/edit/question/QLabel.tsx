import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid'
import { memo, useState, FC } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { strongText } from '../../../../styles/util'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { useQuestionContext } from './QuestionProvider'
import { useLabelEditableContext, useLabelsContext } from './QLabels'

interface Props {
  index: number
  label: string
}
export const QLabel: FC<Props> = memo(({ index, label }) => {
  const { question } = useQuestionContext()
  const { labels, setLabels } = useLabelsContext()
  const { editable } = useLabelEditableContext()
  const [editting, setEditting] = useState(false)
  const [value, setValue] = useState(label)
  const edit = () => {
    setEditting(!editting)
    if (editting) {
      update(index, value)
    }
  }
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
  const update = (index: number, value: string) => {
    const newLabels = labels.map((label, i) => (i === index ? value : label))
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
  if (!editting && value !== label) {
    setValue(label)
  }
  if (label === '' && !editting) {
    setEditting(true)
  }
  return (
    <div
      className={
        `flex items-center rounded-full border my-1 mr-1 py-1 px-3` +
        ` text-xs bg-orange-500 ${strongText}`
      }
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
})
