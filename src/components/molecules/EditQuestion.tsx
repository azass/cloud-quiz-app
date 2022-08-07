import log from 'loglevel'
import { memo, useContext, useState, VFC } from 'react'
import { useMutateQuestion } from '../../hooks/useMutateQuestion'
import { Question } from '../../types/types'
import { ColorContext } from '../../App'
import { EditBlock } from './EditBlock'
import { QScraping } from './QScraping'
import { QBug } from './QBug'
import { QKeywords } from './QKeywords'
import { QTermDescriptions } from './QTermDescriptions'
import { QLeaningProfiles } from './QLeaningProfiles'
import { QLabels } from './QLabels'
import { QNewRegister } from '../atoms/QNewRegister'
import { CloudUploadIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { config } from '../../styles/util'
import axios from 'axios'
import { useAppSelector } from '../../app/hooks'
import { selectIdToken } from '../../slices/editSlice'
interface Props {
  question: Question
  setQuestion: any
  isNew: boolean
}
export const EditQuestion: VFC<Props> = memo(
  ({ question, setQuestion, isNew }) => {
    log.setLevel('debug')
    log.debug('Question Edit')
    const color = useContext(ColorContext)
    const { deleteBug } = useMutateQuestion()
    const [registerToggle, setRegisterToggle] = useState<boolean>(isNew)
    const [caseNo, setCaseNo] = useState(
      question.case_id && question.exam_id
        ? question.case_id.slice(question.exam_id.length + 1)
        : ''
    )
    const [editCaseNo, setEditCaseNo] = useState(false)
    const [edittingCaseNo, setEdittingCaseNo] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const idToken = useAppSelector(selectIdToken)

    const onClickDelete = () => {
      if (question) {
        const newQuestion = { ...question, is_bug: false }
        deleteBug(newQuestion)
        setQuestion(newQuestion)
      }
    }
    const onChangeCaseNo = (val: string) => {
      if (Number.isInteger(val)) {
        alert('')
      } else {
        setCaseNo(('0000' + val).slice(-4))
        question.case_id = question.exam_id + '-' + caseNo
        // question.case_items = []
        setEdittingCaseNo(true)
      }
    }
    const onClickRegister = () => {
      setEdittingCaseNo(false)
      queryClient.resetQueries([question.quest_id])
      putQuestion(
        {
          quest_id: question.quest_id,
          case_id: question.exam_id + '-' + caseNo,
        },
        question
      )
    }

    const putQuestion = (requestData: any, question: Question, post?: any) => {
      axios
        .put(`${process.env.REACT_APP_REST_URL}/question`, requestData, config)
        .then(async (response) => {
          const headers = {
            headers: {
              Authorization: idToken,
            },
          }
          const { data } = await axios.get(
            `${process.env.REACT_APP_REST_URL}/question?quest_id=${question.quest_id}`,
            headers
          )
          const newQuestion: Question = data.body
          if (newQuestion) {
            newQuestion.options?.map((option) => {
              if (!('mark' in option)) {
                // 連想配列キーの存在チェック
                const mark = option.text?.slice(0, 1) || ''
                option.mark = mark
              }
              option.correct = question.correct_answer?.includes(
                option.mark || '_'
              )
            })
            newQuestion.keywords = JSON.stringify(newQuestion.keywords)
            setQuestion(newQuestion)
          }
        })
        .catch((error) => console.log(error))
    }

    return (
      <>
        <div
          className={`flex justify-start font-light pt-6 pb-3 text-base font-bold ${color.bgColor} ${color.baseText}`}
        >
          {question.quest_id}
          <div className="flex justify-start items-center">
            <DocumentTextIcon
              className="w-6 h-6 ml-8 cursor-pointer hover:text-blue-500"
              onClick={() => setEditCaseNo(!editCaseNo)}
            />
            {(editCaseNo || question.case_id) && (
              <>
                <div className="pl-4 text-white">ケース問題</div>
                <div className="pl-4 text-white">
                  <i>{question.exam_id}-</i>
                </div>
                {editCaseNo ? (
                  <input
                    type="text"
                    className="w-20 ml-1 px-1 text-black"
                    value={caseNo}
                    onChange={(e) => {
                      onChangeCaseNo(e.target.value)
                    }}
                  ></input>
                ) : (
                  <span>{caseNo}</span>
                )}
                {edittingCaseNo && (
                  <CloudUploadIcon
                    className="h-5 w-5 ml-4 text-blue-400 cursor-pointer "
                    onClick={() => onClickRegister()}
                  />
                )}
              </>
            )}
          </div>

          {registerToggle && question && (
            <QNewRegister
              question={question}
              setRegisterToggle={setRegisterToggle}
            />
          )}
        </div>
        {!registerToggle && question && (
          <>
            {'case_id' in question && (
              <EditBlock
                question={question}
                title={'与件'}
                name="case_items"
                editElems={question.case_items || []}
                editable={true}
              />
            )}
            <EditBlock
              question={question}
              title={'問題文'}
              name="question_items"
              editElems={question.question_items || []}
              editable={true}
            />
            <EditBlock
              question={question}
              title={'選択肢'}
              name="options"
              editElems={question.options || []}
              editable={true}
            />
            <QScraping question={question} setQuestion={setQuestion} />
            {'is_bug' in question && question.is_bug && question.bug_points && (
              <QBug bug={question.bug_points} onClickDelete={onClickDelete} />
            )}
            <div className="pt-4">
              <QKeywords question={question} withAdd={true} />
              <div className={`flex gap-2 mt-6 font-bold ${color.baseText}`}>
                リファレンス
              </div>
              <QTermDescriptions question={question} />
            </div>
            <EditBlock
              question={question}
              title={'メモ'}
              name="explanation"
              editElems={question.explanation || []}
              editable={true}
            />
            <div
              className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}
            >
              学習プロファイル
            </div>
            <QLeaningProfiles question={question} />
            <QLabels question={question} readonly={false} />
          </>
        )}
      </>
    )
  }
)
