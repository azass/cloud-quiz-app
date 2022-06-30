import { VFC, useState, memo, useContext } from 'react'
import { Question, voidTag } from '../../types/types'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../hooks/useQueryQuestion'
import { useAppDispatch } from '../../app/hooks'
import { setEditContext } from '../../slices/editSlice'
import { EditQuestion } from '../molecules/EditQuestion'
import { ColorContext } from '../../App'
import { useTags } from '../../hooks/useTags'
import { QNewRegister } from '../atoms/QNewRegister'
import log from 'loglevel'

interface Props {
  logout: any
}
export const QuizEditPanel: VFC<Props> = memo(({ logout }) => {
  log.setLevel('debug')
  const color = useContext(ColorContext)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [question, setQuestion] = useState<Question>()
  const [registerToggle, setRegisterToggle] = useState(false)
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const fromTermEditor = query.has('fromTermEditor')
  const { getTagOfNo } = useTags()
  const chosenTag = getTagOfNo(Number(query.get('fromTermEditor')))
  log.debug(`QuizEditPanel quest_id=${params.quest_id}`)

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
      setRegisterToggle(true)
      setQuestion({
        quest_id: quest_id,
        quest_no: parseInt(quest_id.slice(-4)),
        exam_id: params.exam_id,
      })
    } else {
      if (params.quest_id) {
        setQuestId(params.quest_id)
      }
      log.debug('EditQuiz change setQuestion !!!')
      log.debug(data)
      if (data) {
        setQuestion(data)
        setRegisterToggle(false)
        dispatch(
          setEditContext({
            quest_id: data.quest_id,
            keywordsJson: data.keywords || "",
            chosenTag: (fromTermEditor) ? chosenTag : voidTag,
            forQuestion: true,
          })
        )
      }
    }
  }
  return (
    <>
      <div
        className={`flex justify-start font-light pt-6 pb-3 text-base font-bold ${color.bgColor} ${color.baseText}`}
      >
        {quest_id}
        {registerToggle && question && (
          <QNewRegister question={question} setRegisterToggle={setRegisterToggle} />
        )}
      </div>
      {!registerToggle && question && (
        <EditQuestion question={question} setQuestion={setQuestion} />
      )}
    </>
  )
})