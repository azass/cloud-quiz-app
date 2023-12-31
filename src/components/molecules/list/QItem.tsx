import { FC, memo } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { Question } from '../../../types/types'
import { Link } from 'react-router-dom'
import log from 'loglevel'
import Colors from '../../../consts/colors'
import { strongText, weaknessText } from '../../../styles/util'
import { QKeywords } from '../QKeywords'
import { useAppDispatch } from '../../../app/hooks'
import { setTab } from '../../../slices/editSlice'
import Label from '../../../consts/labels'
import { useOpenBookContext } from '../../pages/QuizEditor'

interface Props {
  question: Question
}

export const QItem: FC<Props> = memo(({ question }) => {
  log.setLevel('info')
  const dispatch = useAppDispatch()
  const { open } = useOpenBookContext()
  const linkColor = question.is_old
    ? Colors.linkIconOld
    : question.not_ready
    ? Colors.linkIconNotReady
    : question.is_bug
    ? Colors.linkIconBug
    : Colors.linkIcon

  const click = () => {
    if (!open) {
      dispatch(setTab(Label.tabs[3]))
    }
  }
  return (
    <div className="inline-flex items-start mt-1 space-x-1" title="QItem">
      <div className="flex items-center mt-1.5">
        <Link to={`/editor/${question.exam_id}/${question.quest_id}`}>
          <ExternalLinkIcon
            className={`h-5 w-5 mx-1 cursor-pointer ${linkColor}`}
            onClick={() => {
              click()
            }}
          />
        </Link>
        <span className={`w-3 ${question.is_weak ? weaknessText : strongText}`}>
          Q{question.quest_no}
        </span>
      </div>
      <div className="pl-4">
        <QKeywords question={question} withAdd={false} />
      </div>
    </div>
  )
})
