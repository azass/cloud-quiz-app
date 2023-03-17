import log from 'loglevel'
import { VFC, useState, memo } from 'react'
import { Question, voidTag } from '../../types/types'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../hooks/useQueryQuestion'
import { useAppDispatch } from '../../app/hooks'
import { setEditContext } from '../../slices/editSlice'
import { EditQuestion } from '../edit/question/EditQuestion'
import { useTags } from '../../hooks/useTags'

interface Props {
  logout: any
}
export const QuizEditPanel: VFC<Props> = memo(({ logout }) => {
  log.setLevel('debug')
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [question, setQuestion] = useState<Question>()
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const fromTermEditor = query.has('fromTermEditor')
  const { getTagOfNo } = useTags()
  const chosenTag = getTagOfNo(Number(query.get('fromTermEditor')))
  log.debug(`QuizEditPanel quest_id=${params.quest_id}`)
  const [isNew, setIsNew] = useState(false)
  const [err, setErr] = useState(false)
  const { status, data, error } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') {
    if (!err) {
      setErr(true)
      logout()
      alert(error?.message)
      navigate('/login')
    }
  }

  if (!question || (params.quest_id && questId !== params.quest_id)) {
    if (data === undefined || data === null) {
      params.quest_id && setQuestId(params.quest_id)
      setIsNew(true)
      const exam_id = params.exam_id || ''
      setQuestion({
        quest_id: quest_id,
        quest_no: parseInt(quest_id.slice(exam_id.length + 1)),
        exam_id: exam_id,
        not_ready: true
      })
    } else {
      if (params.quest_id) {
        setQuestId(params.quest_id)
      }
      log.debug('EditQuiz change setQuestion !!!')
      log.debug(data)
      if (data) {
        setQuestion(data)
        setIsNew(false)
        dispatch(
          setEditContext({
            quest_id: data.quest_id,
            keywordsJson: data.keywords || '',
            chosenTag: fromTermEditor ? chosenTag : voidTag,
            forQuestion: true,
          })
        )
      }
    }
  }
  return (
    <>
      {question && (
        <EditQuestion question={question} setQuestion={setQuestion} isNew={isNew} setIsNew={setIsNew} />
      )}
    </>
  )
})
