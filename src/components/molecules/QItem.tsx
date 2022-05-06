import { VFC, memo, useContext } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { PencilAltIcon } from '@heroicons/react/solid'
import { Question, voidTag } from '../../types/types'
import { Link } from 'react-router-dom'
import { QTags } from './QTags'
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
    <li className="inline-flex my-3 space-x-4">
      <Link to={`/editor/${question.exam_id}/${question.quest_id}`}>
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditContext({
                quest_id: question.quest_id,
                keywordsJson: question.keywords || "",
                chosenTag: voidTag,
              })
            )
          }}
        />
      </Link>
      <span className={`font-bold w-3 ${color.baseText}`}>
        Q{question.quest_no}
      </span>
      <div className="pl-4">
        <QTags question={question} withAdd={false} />
      </div>
    </li>
  )
})
