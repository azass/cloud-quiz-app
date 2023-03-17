import axios from "axios";
import { memo, useContext, useState, VFC } from "react";
import { ColorContext } from "../../../App";
import { useAppSelector } from "../../../app/hooks";
import { selectIdToken } from "../../../slices/editSlice";
import { config } from "../../../styles/util";
import { Question } from "../../../types/types";
import { SelectLang } from "../../atoms/SelectLang";
import { QRArchiveToggle } from "./QArchiveToggle";
import { QCaseButtonSet } from "./QCaseButtonSet";
import { QNewRegister } from "./QNewRegister";
import { QReadyButton } from "./QReadyButton";

interface Props {
  question: Question
  setQuestion: any
  isNew: boolean
  setIsNew: any
  editCaseNo: boolean
  setEditCaseNo: any
  changeCaseNo: boolean
}
export const EditQuestionHeader: VFC<Props> = memo(
  ({ question, setQuestion, isNew, setIsNew, editCaseNo, setEditCaseNo, changeCaseNo }) => {
    const color = useContext(ColorContext)
    const idToken = useAppSelector(selectIdToken)
    const [questId, setQuestId] = useState(question.quest_id)
    const [isOld, setIsOld] = useState(question.is_old || false);
    const [notReady, setNotReady] = useState(question.not_ready || false)
    if (questId !== question.quest_id) {
      setQuestId(question.quest_id)
      setIsOld(question.is_old || false)
      setNotReady(question.not_ready || false)
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
      <div className='fixed w-1/2 pr-8' title="EditQuestionHeader">
        <div className="flex justify-between items-center w-full pb-2 z-10">
          <div
            className={`font-light pt-1 pb-1 pr-8 text-base font-bold ${color.bgColor} ${color.baseText}`}
          >
            <div className="flex justify-start items-center">
              <div className="pr-8">{question.quest_id}</div>
              <QRArchiveToggle
                question={question}
                isOld={isOld}
                putQuestion={putQuestion} />
              <QReadyButton
                question={question}
                notReady={notReady}
                putQuestion={putQuestion} />
              <QCaseButtonSet
                question={question}
                editCaseNo={editCaseNo}
                setEditCaseNo={setEditCaseNo}
                changeCaseNo={changeCaseNo}
                putQuestion={putQuestion} />
            </div>
            {isNew && question && (
              <QNewRegister question={question} setRegisterToggle={setIsNew} />
            )}
          </div>
          <div className="mt-4 ml-8 mr-8">
            <SelectLang />
          </div>
        </div>
      </div>
    )
  }
)  