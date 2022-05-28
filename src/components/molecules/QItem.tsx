import { VFC, memo, useContext } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { PencilAltIcon } from '@heroicons/react/solid'
import { Question, voidTag } from '../../types/types'
import { Link } from 'react-router-dom'
import { QKeywords } from './QKeywords'
import { setEditContext } from '../../slices/editSlice'
import { ColorContext } from '../../App'
import log from 'loglevel'

interface Props {
  question: Question
}

export const QItem: VFC<Props> = memo(({ question }) => {
  log.setLevel("info")
  log.debug('<QItem>')
  const color = useContext(ColorContext)
  const dispatch = useAppDispatch()

  return (
    <li className="inline-flex my-3 space-x-4" title="QItem">
      <Link to={`/editor/${question.exam_id}/${question.quest_id}`}>
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditContext({
                quest_id: question.quest_id,
                keywordsJson: question.keywords || "",
                chosenTag: voidTag,
                // tag_terms: {}
              })
            )
          }}
        />
      </Link>
      <span className={`font-bold w-3 ${color.baseText}`}>
        Q{question.quest_no}
      </span>
      <div className="pl-4">
        <QKeywords
          question={question}
          keywords={question.keywords ? JSON.parse(question.keywords) : {}}
          withAdd={false} />
      </div>
    </li>
  )
})
