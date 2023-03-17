import { DocumentTextIcon } from "@heroicons/react/outline";
import { PauseIcon, RssIcon } from "@heroicons/react/solid";
import axios from "axios";
import { memo, useContext, useState, VFC } from "react";
import { ColorContext } from "../../App";
import { useAppSelector } from "../../app/hooks";
import { selectIdToken } from "../../slices/editSlice";
import { config } from "../../styles/util";
import { Question } from "../../types/types";
import { EditQuestionCase } from "./EditQuestionCase";

interface Props {
  question: Question
  setQuestion: any
  registerToggle: boolean
  setRegisterToggle: any
}
export const EditQuestionHeader: VFC<Props> = memo(({ question, setQuestion, registerToggle, setRegisterToggle }) => {
  const color = useContext(ColorContext)
  const idToken = useAppSelector(selectIdToken)
  const [editCaseNo, setEditCaseNo] = useState(false)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false);
  const [notReady, setNotReady] = useState(question.not_ready || false)
  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
    setNotReady(question.not_ready || false)
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
  const onClickReady = (_notReady: boolean) => {
    putQuestion(
      {
        quest_id: question.quest_id,
        not_ready: _notReady,
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
          setNotReady(newQuestion.not_ready || false)
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
        <div>
          {notReady ? (
            <PauseIcon
              className={`h-8 w-8 ml-8 ${color.iconColor} cursor-pointer text-pink-500`}
              onClick={() => onClickReady(!notReady)}
            />
          ) : (
            <RssIcon
              className={`h-8 w-8 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
              onClick={() => onClickReady(!notReady)}
            />
          )}
        </div>
        <DocumentTextIcon
          className="w-6 h-6 ml-8 cursor-pointer hover:text-blue-500"
          onClick={() => setEditCaseNo(!editCaseNo)}
        />
        <EditQuestionCase
          question={question}
          setQuestion={setQuestion}
          registerToggle={registerToggle}
          setRegisterToggle={setRegisterToggle}
          putQuestion={putQuestion}
          editCaseNo={editCaseNo} />
      </div>
    </div>
  )
}
)  