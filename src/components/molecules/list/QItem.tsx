import { FC, memo } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { Question } from '../../../types/types'
import { Link } from 'react-router-dom'
import { QKeywords } from './QKeywords'
import log from 'loglevel'
import Colors from '../../../consts/colors'
import { strongText } from '../../../styles/util'

interface Props {
  question: Question
}

export const QItem: FC<Props> = memo(({ question }) => {
  log.setLevel('info')
  const linkColor = question.is_old
    ? Colors.linkIconOld
    : question.not_ready
    ? Colors.linkIconNotReady
    : question.is_bug
    ? Colors.linkIconBug
    : Colors.linkIcon
  return (
    <div className="inline-flex mt-1 space-x-4" title="QItem">
      <Link to={`/editor/${question.exam_id}/${question.quest_id}`}>
        <ExternalLinkIcon
          className={`h-5 w-5 mx-1 mt-1 cursor-pointer ${linkColor}`}
        />
      </Link>
      <span className={`w-3 mt-2 ${strongText}`}>
        Q{question.quest_no}
      </span>
      <div className="pl-4">
        <QKeywords question={question} withAdd={false} />
      </div>
    </div>
  )
})
