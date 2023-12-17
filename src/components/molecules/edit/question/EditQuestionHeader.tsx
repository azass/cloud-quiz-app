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
  const w = () => {
    return open ? 'w-20' : ''
  }
  const text_size = () => {
    return open ? '' : 'text-xs'
  }
  return (
    <div
      className={`fixed ${open ? 'w-1/2 -mt-8' : 'w-full'} pr-8 pt-1`}
      title="EditQuestionHeader"
    >
      <div className="flex flex-wrap items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div
            className={
              `pt-1 w-30 text-orange-400 font-bold` +
              ` ${open ? 'text-lg' : 'text-base'}`
            }
          >
            {question.quest_id}
          </div>
          {isNew && question && <QNewRegister />}
          <div className="mt-1 ml-4" title="QCaseButtonSet">
            <QCaseButtonSet />
          </div>
          <div className={`flex mt-2 mx-2 px-4 ${strongText}`}>
            <QScreenTime />
          </div>
          <div className="flex items-center">
            <div className="" title="QArchiveToggle">
              <QArchiveToggle w={w()} text_size={text_size()} />
            </div>
            <div className="" title="QReadyButton">
              <QReadyButton w={w()} text_size={text_size()} />
            </div>
            <div className={``}>
              <LangSelector w={w()} text_size={text_size()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
