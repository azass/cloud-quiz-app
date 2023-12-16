import { memo, FC } from 'react'
import { LangSelector } from '../../../atoms/LangSelector'
import { QArchiveToggle } from './QArchiveToggle'
import { QCaseButtonSet } from './QCaseButtonSet'
import { QNewRegister } from './QNewRegister'
import { QReadyButton } from './QReadyButton'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'
import { QScreenTime } from './QScreenTime'
import { useOpenBookContext } from '../../../pages/QuizEditor'
import {
  useIsOldContext,
  useNotReadyContext,
  useQuestionHeaderContext,
} from './QuestionHeaderProvider'
import { strongText } from '../../../../styles/util'

export const EditQuestionHeader: FC = memo(() => {
  const { question } = useQuestionContext()
  const { isNew } = useIsNewContext()
  const { open } = useOpenBookContext()
  const { questId, setQuestId } = useQuestionHeaderContext()
  const { setIsOld } = useIsOldContext()
  const { setNotReady } = useNotReadyContext()

  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
    setNotReady(question.not_ready || false)
  }
  return (
    <div
      className={`fixed ${open ? 'w-1/2' : 'w-full'} pr-8 -mt-8 pt-1`}
      title="EditQuestionHeader"
    >
      <div className="flex items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div className="pt-1 w-30 text-lg text-orange-400 font-bold">
            {question.quest_id}
          </div>
          {isNew && question && <QNewRegister />}
          <div className="mt-1 ml-4" title="QCaseButtonSet">
            <QCaseButtonSet />
          </div>
          <div className={`flex mt-2 mx-2 px-4 ${strongText}`}>
            <QScreenTime />
          </div>
          <div className="flex mt-0 mr-0" title="QArchiveToggle">
            <QArchiveToggle />
          </div>
          <div className="ml-0" title="QReadyButton">
            <QReadyButton />
          </div>
          <div className="py-4">
            <LangSelector />
          </div>
        </div>
      </div>
    </div>
  )
})
