import { VFC, memo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { useScraping } from '../../../hooks/useScraping'
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/solid'
import { AcademicCapIcon } from '@heroicons/react/outline'
import { Question } from '../../../types/types'
import { useMutateQuestion } from '../../../hooks/useMutateQuestion'
import log from 'loglevel'

interface Props {
  question: Question
  setQuestion?: any
}
export const QScraping: VFC<Props> = memo(({ question, setQuestion }) => {
  log.setLevel("info")
  const { showFlg, setShowFlg, onChange, onClick } = useScraping(setQuestion)
  const { updateQuestion } = useMutateQuestion()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const [editFlg, setEditFlg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onChangeText = (text: string) => {
    log.debug(`onChangeText:${text}`)
    const newQuestion = {
      ...question,
      original_url: text,
    }
    setQuestion(newQuestion)
  }

  const onClickCheck = () => {
    const reqData: Question = {
      quest_id: question.quest_id,
      original_url: question.original_url
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
    str = str?.replaceAll('管理対象インスタンスグループ', ' マネージドインスタンスグループ ')
    str = str?.replaceAll('ComputeEngine', ' Compute Engine ')
    str = str?.replaceAll('GoogleKubernetesEngine', ' Google Kubernetes Engine ')
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
    str = str?.replaceAll('StackdriverMonitoringAgent', ' Stackdriver Monitoring Agent ')
    str = str?.replaceAll('StackdriverMonitoring', ' Stackdriver Monitoring ')
    str = str?.replaceAll('CloudBuild', ' Cloud Build ')
    str = str?.replaceAll('クラウドビルド', ' Cloud Build ')
    str = str?.replaceAll('クラウドデータ損失防止', ' Cloud Data Loss Prevention ')
    str = str?.replaceAll('、 ', '、')
    str = str?.replaceAll('。 ', '。')
    str = str?.replaceAll('.  ', '. ')
    str = str?.replaceAll('  ', ' ')
    return str
  }

  const onClick2 = (retry: boolean) => {
    log.debug(`scraping?url=${question.original_url}`)
    setIsLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_REST_URL}/scraping?url=${question.original_url}`,
        config
      )
      .then((response) => {
        let result = response.data
        log.debug(result)
        log.debug(question.quest_id)
        log.debug('onClick2 setQuestion !!!')
        result['keywords'] = []
        question.question_items = result['question_items'] || []
        const questionItems = question.question_items?.map((editElem) => {
          editElem.text = sub(editElem.text)
          return editElem
        })
        question.options = result['options']
        const options = question.options?.map((editElem) => {
          editElem.text = sub(editElem.text)
          return editElem
        })
        const newQuest: Question = {
          ...question,
          quest_no: parseInt(question.quest_id.slice(-4)),
          question_items: questionItems,
          options: options,
        }
        setQuestion(newQuest)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        log.debug(error.message)
        log.debug(typeof (error))
        if (error.message === "Network Error" && retry) {
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
              className="h-3 w-3 text-blue-500 cursor-pointer"
              fill="currentColor"
              onClick={() => {
                setShowFlg(false)
              }}
            />
          </div>
          <textarea
            className="form-textarea mt-1 block w-full border-blue-500 border-opacity-100"
            rows={13}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white font-bold flex justify-center mx-auto"
            onClick={() => {
              onClick(question.quest_id)
            }}
          >
            取り込み
          </button>
        </>
      )}
      {!showFlg && (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleUpIcon
              className="flex flex-row-reverse h-3 w-3 text-blue-500 cursor-pointer"
              fill="currentColor"
              onClick={() => {
                setShowFlg(true)
              }}
            />
          </div>
        </>
      )}
      <div className="flex justify-start mt-2">
        <span className="pr-2 text-blue-700 font-bold text-xs">URL</span>
        {!editFlg && (
          <>
            <PencilIcon
              className="h-4 w-4 cursor-pointer"
              fill="currentColor"
              onClick={() => setEditFlg(true)}
            />
            <AcademicCapIcon
              className="h-4 w-4 ml-4 text-blue-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              onClick={() => {
                onClick2(true)
              }}
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
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      <div className="py-2 underline text-blue-700 text-base text-xs">
        <a href={question.original_url} target="_blank">
          {question.original_url}
        </a>
      </div>
    </div>
  )
})
