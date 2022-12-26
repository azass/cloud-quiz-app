import { CloudUploadIcon, DocumentTextIcon } from "@heroicons/react/outline";
import axios from "axios";
import { memo, useContext, useState, VFC } from "react";
import { useQueryClient } from "react-query";
import { ColorContext } from "../../App";
import { useAppSelector } from "../../app/hooks";
import { selectIdToken } from "../../slices/editSlice";
import { config } from "../../styles/util";
import { Question } from "../../types/types";
import { QNewRegister } from "../atoms/QNewRegister";

interface Props {
  question: Question
  setQuestion: any
  registerToggle: boolean
  setRegisterToggle: any
}
export const EditQuestionHeader: VFC<Props> = memo(({ question, setQuestion, registerToggle, setRegisterToggle }) => {
  const color = useContext(ColorContext)
  const queryClient = useQueryClient()
  const idToken = useAppSelector(selectIdToken)
  const [editCaseNo, setEditCaseNo] = useState(false)
  const [edittingCaseNo, setEdittingCaseNo] = useState(false)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false);
  const [caseNo, setCaseNo] = useState(
    question.case_id && question.exam_id
      ? question.case_id.slice(question.exam_id.length + 1)
      : ''
  )
  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
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
  const onClickOld = (_isOld: boolean) => {
    setIsOld(_isOld)
    // queryClient.resetQueries([question.quest_id])
    putQuestion(
      {
        quest_id: question.quest_id,
        is_old: _isOld,
      },
      question
    )
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
          setIsOld(newQuestion.is_old || false);
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <div
      className={`flex justify-start font-light pt-6 pb-3 text-base font-bold ${color.bgColor} ${color.baseText}`}
      title="EditQuestionHeader"
    >
      {question.quest_id}
      <div className="flex justify-start items-center pl-8">
        <div className="flex">
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!isOld}
              readOnly
            />
            <div
              onClick={() => {
                onClickOld(!isOld)
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
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
  )
}
)  