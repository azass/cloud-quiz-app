import { VFC, memo, useContext } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { Question } from '../../../types/types'
import { Link } from 'react-router-dom'
import { QKeywords } from './QKeywords'
import { ColorContext } from '../../../App'
import log from 'loglevel'

interface Props {
  question: Question
}

export const QItem: VFC<Props> = memo(({ question }) => {
  log.setLevel("info")
  log.debug('<QItem>')
  const color = useContext(ColorContext)
  const linkColor = question.is_old ? color.linkIconColorOld : question.not_ready ? color.linkIconColorNotReady : question.is_bug ? color.linkIconColorBug : color.linkIconColor
  return (
    <div className="inline-flex mt-1 space-x-4" title="QItem">
      <Link to={`/editor/${question.exam_id}/${question.quest_id}`}>
        <ExternalLinkIcon
          className={`h-5 w-5 mx-1 mt-1 cursor-pointer ${linkColor}`} />
      </Link>
      <span className={`font-bold w-3 mt-2 ${color.baseText}`}>
        Q{question.quest_no}
      </span>
      <div className="pl-4">
        <QKeywords
          question={question}
          withAdd={false} />
      </div>
    </div>
  )
})