import { FC, memo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { useScraping } from '../../../../hooks/useScraping'
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PencilIcon,
  CheckIcon,
  ChatIcon,
} from '@heroicons/react/solid'
import { AcademicCapIcon } from '@heroicons/react/outline'
import { NoteItem, Question } from '../../../../types/types'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import log from 'loglevel'
import { QComments } from './QComments'
import { useMutateComments } from '../../../../hooks/useMutateComments'
import { useQuestionContext } from './QuestionProvider'
import Prop from '../../../../consts/props'
import { iconBase, iconShine, strongText } from '../../../../styles/util'
import Colors from '../../../../consts/colors'

export const QScraping: FC = memo(() => {
  const { question, setQuestion } = useQuestionContext()
  const { showFlg, setShowFlg, onChange, onClick } = useScraping(
    question,
    setQuestion
  )
  const { updateQuestion } = useMutateQuestion()
  const { putComments } = useMutateComments()
  const [editFlg, setEditFlg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const onChangeText = (text: string) => {
    const newQuestion = { ...question, original_url: text }
    setQuestion(newQuestion)
  }

  const onClickCheck = () => {
    const reqData: Question = {
      quest_id: question.quest_id,
      original_url: question.original_url,
    }
    updateQuestion(reqData)
    setEditFlg(false)
  }

  const sub = (txt?: string) => {
    let str = txt
    str = str?.replaceAll('true', ' true ')
    str = str?.replaceAll('false', ' false ')
    str = str?.replaceAll('API', ' API ')
    str = str?.replaceAll('Linux', ' Linux ')
    str = str?.replaceAll('URL', ' URL ')
    str = str?.replaceAll('CPU', ' CPU ')
    str = str?.replaceAll('SSH', ' SSH ')
    str = str?.replaceAll('TCP', ' TCP ')
    str = str?.replaceAll('IPアドレス', ' IP アドレス ')
    str = str?.replaceAll('HTTP（S）', ' HTTP(S) ')
    str = str?.replaceAll('IAM', ' IAM ')
    str = str?.replaceAll('役割', 'ロール')
    str = str?.replaceAll('展開', 'デプロイ')
    str = str?.replaceAll('地域', 'リージョン')
    str = str?.replaceAll('オンプレミス', ' オンプレミス ')
    str = str?.replaceAll('メトリック', 'メトリクス')
    str = str?.replaceAll('クラスター', 'クラスタ')
    str = str?.replaceAll('コンテナー', 'コンテナ')
    str = str?.replaceAll('VM', ' VM ')
    str = str?.replaceAll('ETL', ' ETL ')
    str = str?.replaceAll('Hadoop', ' Hadoop ')
    str = str?.replaceAll('SSD', ' SSD ')
    str = str?.replaceAll('Docker', ' Docker ')
    str = str?.replaceAll('Git', ' Git ')
    str = str?.replaceAll('GCP', ' GCP ')
    str = str?.replaceAll('クラウドストレージ', ' Cloud Storage ')
    str = str?.replaceAll(
      '管理対象インスタンスグループ',
      ' マネージドインスタンスグループ '
    )
    str = str?.replaceAll('ComputeEngine', ' Compute Engine ')
    str = str?.replaceAll(
      'GoogleKubernetesEngine',
      ' Google Kubernetes Engine '
    )
    str = str?.replaceAll('GKEクラスター', 'GKE クラスター')
    str = str?.replaceAll('Pub / Sub', ' Pub/Sub ')
    str = str?.replaceAll('CloudPub/Sub', ' Cloud Pub/Sub ')
    str = str?.replaceAll('CloudStorage', ' Cloud Storage ')
    str = str?.replaceAll('AppEngine', ' App Engine ')
    str = str?.replaceAll('CloudVPN', ' Cloud VPN ')
    str = str?.replaceAll('クラウドNAT', ' Cloud NAT ')
    str = str?.replaceAll('CloudIdentity', ' Cloud Identity ')
    str = str?.replaceAll('CloudKMS', ' Cloud KMS ')
    str = str?.replaceAll('CloudRun', ' Cloud Run ')
    str = str?.replaceAll('クラウドラン', ' Cloud Run ')
    str = str?.replaceAll('CloudSQL', ' Cloud SQL ')
    str = str?.replaceAll('CloudSpanner', ' Cloud Spanner ')
    str = str?.replaceAll('クラウドスパナー', ' Cloud Spanner ')
    str = str?.replaceAll('スパナー', ' Spanner ')
    str = str?.replaceAll('CloudBigtable', ' Cloud Bigtable ')
    str = str?.replaceAll('BigQuery', ' BigQuery ')
    str = str?.replaceAll('Dataproc', ' Dataproc ')
    str = str?.replaceAll('Dataflow', ' Dataflow ')
    str = str?.replaceAll('Anthos', ' Anthos ')
    str = str?.replaceAll('gcloud', ' gcloud ')
    str = str?.replaceAll('コンテナーレジストリ', ' Container Registry ')
    str = str?.replaceAll('VPC', ' VPC ')
    str = str?.replaceAll('クラウドVPN', ' Cloud VPN ')
    str = str?.replaceAll('クラウドDNS', ' Cloud DNS ')
    str = str?.replaceAll('クラウドルーター', ' Cloud Router ')
    str = str?.replaceAll('転送アプライアンス', ' Transfer Appliance ')
    str = str?.replaceAll('MySQL', ' MySQL ')
    str = str?.replaceAll('GoogleCloud', ' Google Cloud ')
    str = str?.replaceAll('クラウドアーマー', ' Cloud Armor ')
    str = str?.replaceAll('クラウド機能', ' Cloud Functions ')
    str = str?.replaceAll('クラウドエンドポイント', ' Cloud Endpoints ')
    str = str?.replaceAll('CloudFunctions', ' Cloud Functions ')
    str = str?.replaceAll('CloudFunction', ' Cloud Functions')
    str = str?.replaceAll('CloudMonitoring', ' Cloud Monitoring ')
    str = str?.replaceAll('CloudLogging', ' Cloud Logging ')
    str = str?.replaceAll('Stackdriver', ' Stackdriver ')
    str = str?.replaceAll('CloudScheduler', ' Cloud Scheduler ')
    str = str?.replaceAll(
      'StackdriverMonitoringAgent',
      ' Stackdriver Monitoring Agent '
    )
    str = str?.replaceAll('StackdriverMonitoring', ' Stackdriver Monitoring ')
    str = str?.replaceAll('CloudBuild', ' Cloud Build ')
    str = str?.replaceAll('クラウドビルド', ' Cloud Build ')
    str = str?.replaceAll(
      'クラウドデータ損失防止',
      ' Cloud Data Loss Prevention '
    )
    str = str?.replaceAll('、 ', '、')
    str = str?.replaceAll('。 ', '。')
    str = str?.replaceAll('.  ', '. ')
    str = str?.replaceAll('  ', ' ')
    return str
  }

  const onClick2 = (retry: boolean) => {
    setIsLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_REST_URL}/scraping?url=${question.original_url}`,
        Prop.config
      )
      .then((response) => {
        let result = response.data
        result['keywords'] = []
        const questionItems = (result['question_items'] as NoteItem[])?.map(
          (editElem) => {
            editElem.text = sub(editElem.text)
            return editElem
          }
        )
        const options = (result['options'] as NoteItem[])?.map((editElem) => {
          editElem.text = sub(editElem.text)
          return editElem
        })
        const newQuest: Question = {
          ...question,
          quest_no: parseInt(question.quest_id.slice(-4)),
          question_items: questionItems,
          options: options,
        }
        if (
          question.question_items === undefined &&
          question.options === undefined
        ) {
          updateQuestion(newQuest)
        }
        putComments(question.quest_id, result['comments'], result['answers'])
        setQuestion(newQuest)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        log.debug(error.message)
        log.debug(typeof error)
        if (error.message === 'Network Error' && retry) {
          onClick2(false)
        } else {
          alert(error)
        }
      })
  }
  return (
    <div className="w-full border-blue-500 border-opacity-100">
      {showFlg && (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleDownIcon
              className={`h-3 w-3 ${iconShine}`}
              fill="currentColor"
              onClick={() => setShowFlg(false)}
            />
          </div>
          <textarea
            className="form-textarea mt-1 block w-full border-blue-500 border-opacity-100"
            rows={13}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={
              `flex justify-center mx-auto px-4 py-2 mt-4` +
              ` rounded-lg bg-blue-500 ${strongText}`
            }
            onClick={() => onClick(question.quest_id)}
          >
            取り込み
          </button>
        </>
      )}
      {!showFlg && (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleUpIcon
              className={`flex flex-row-reverse h-3 w-3 ${iconShine}`}
              fill="currentColor"
              onClick={() => setShowFlg(true)}
            />
          </div>
        </>
      )}
      <div className="flex justify-start items-center mt-2">
        <span className={`pr-2 font-bold text-xs ${Colors.shining}`}>URL</span>
        {!editFlg && (
          <>
            <PencilIcon
              className={`h-6 w-6 pl-2 ${iconBase}`}
              fill="currentColor"
              onClick={() => setEditFlg(true)}
            />
            <AcademicCapIcon
              className={`h-4 w-4 ml-4 ${iconBase}`}
              fill="none"
              stroke="currentColor"
              onClick={() => onClick2(true)}
            />
            <ChatIcon
              className={`h-4 w-4 ml-4 ${iconBase}`}
              stroke="currentColor"
              onClick={() => setShowComment(!showComment)}
            />
          </>
        )}
        {editFlg && (
          <>
            <CheckIcon
              className="h-4 w-4 text-green-400 cursor-pointer"
              fill="currentColor"
              onClick={() => onClickCheck()}
            />
          </>
        )}
      </div>
      {editFlg && (
        <TextareaAutosize
          className="px-6 py-1 mt-1 w-full border-gray-300 text-xs"
          onChange={(e) => onChangeText(e.target.value)}
          value={question.original_url}
        />
      )}
      {isLoading && (
        <div className="flex justify-center">
          <div
            className={
              `animate-spin h-10 w-10 rounded-full` +
              ` border-4 border-blue-500 border-t-transparent`
            }
          ></div>
        </div>
      )}
      <div className="py-2 underline text-blue-700 text-base text-xs">
        <a href={question.original_url} target="_blank">
          {question.original_url}
        </a>
      </div>
      {showComment && (
        <div>
          <div className="py-4">コメント</div>
          <QComments />
        </div>
      )}
    </div>
  )
})
