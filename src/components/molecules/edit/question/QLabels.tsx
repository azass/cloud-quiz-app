import { PlusCircleIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/solid'
import { memo, useState, FC, createContext, useContext } from 'react'
import { QLabel } from './QLabel'
import { useQuestionContext } from './QuestionProvider'
import { iconBase } from '../../../../styles/util'

interface Props {
  readonly: boolean
}
const LabelsContext = createContext(
  {} as {
    labels: string[]
    setLabels: any
  }
)
const LabelEditableContext = createContext(
  {} as {
    editable: boolean
    seteEditable: any
  }
)
export const useLabelsContext = () => useContext(LabelsContext)
export const useLabelEditableContext = () => useContext(LabelEditableContext)
export const QLabels: FC<Props> = memo(({ readonly }) => {
  const { question } = useQuestionContext()
  const [lastQuestId, setLastQuestId] = useState('')
  const [labels, setLabels] = useState<string[]>([])
  const [editable, seteEditable] = useState(false)
  const add = () => {
    setLabels([...labels, ''])
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
      {labels.map(
        (label, index) =>
          !(!editable && label === '') && (
            <LabelEditableContext.Provider value={{ editable, seteEditable }}>
              <LabelsContext.Provider value={{ labels, setLabels }}>
                <QLabel index={index} label={label} />
              </LabelsContext.Provider>
            </LabelEditableContext.Provider>
          )
      )}
      {editable &&
        labels.length === (question.labels ? question.labels.length : 0) && (
          <PlusCircleIcon
            className={`w-5 h-5 ml-2 ${iconBase}`}
            onClick={() => add()}
          />
        )}
      {!readonly && (
        <PencilAltIcon
          className={`w-5 h-5 ml-2 ${iconBase}`}
          onClick={() => seteEditable(!editable)}
        />
      )}
    </div>
  )
})
