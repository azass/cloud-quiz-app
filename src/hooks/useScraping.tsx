import axios from 'axios'
import { useState } from 'react'
import { NoteItem, Question } from '../types/types'
import { useMutateQuestion } from './useMutateQuestion'
import { useMutateComments } from './useMutateComments'
import Prop from '../consts/props'
import log from 'loglevel'

export const useScraping = (question: Question, setQuestion: any) => {
  const { updateQuestion } = useMutateQuestion()
  const [showFlg, setShowFlg] = useState(false)
  const [html, setHtml] = useState('')
  const { putComments } = useMutateComments()
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (text: string) => {
    setHtml(text)
  }
  const onClick = (questId: string) => {
    const requestData = {
      data: html,
    }
    axios
      .post(
        `${process.env.REACT_APP_REST_URL}/scraping`,
        requestData,
        Prop.config
      )
      .then((response) => {
        let result = response.data
        console.log(result)
        const newQuestion = {
          ...question,
          question_items: result['question_items'],
          options: result['options'],
        }
        // if (questId === 'new') {
        updateQuestion(newQuestion)
        putComments(question.quest_id, result['comments'], result['answers'], result['title'])
        setQuestion(newQuestion)
        // }
      })
      .catch((error) => console.log(error))
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
        console.log(result)
        result['keywords'] = []
        const questionItems = (result['question_items'] as NoteItem[])?.map(
          (editElem) => {
            editElem.text = sub(editElem.text)
            return editElem
          }
        )
        const options = (result['options'] as NoteItem[])?.map((editElem) => {
          editElem.text = sub(editElem.text)
          editElem.correct = editElem.text?.includes('最も投票された')
          editElem.text = editElem.text?.replace('\n最も投票された', '')
          return editElem
        })
        const correct_answer: string[] = []
        options.forEach((option) => {
          if (option.correct) correct_answer.push(option.mark || '')
        })
        const newQuest: Question = {
          ...question,
          quest_no: parseInt(question.quest_id.slice(-4)),
          question_items: questionItems,
          options: options,
          correct_answer: correct_answer,
        }
        if (
          question.question_items === undefined &&
          question.options === undefined
        ) {
          updateQuestion(newQuest)
        }
        putComments(question.quest_id, result['comments'], result['answers'], result['title'])
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
    str = str?.replaceAll('メイビン', 'Maven')
    str = str?.replaceAll('竹', 'Bamboo')
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
    str = str?.replaceAll('ダイレクト コネクト', 'Direct Connect ')
    str = str?.replaceAll('、 ', '、')
    str = str?.replaceAll('。 ', '。')
    str = str?.replaceAll('.  ', '. ')
    str = str?.replaceAll('  ', ' ')
    return str
  }

  return {
    showFlg,
    setShowFlg,
    isLoading,
    onChange,
    onClick,
    onClick2,
  }
}
