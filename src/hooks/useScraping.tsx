import axios from 'axios'
import { useState } from 'react'
import { NoteItem, Question } from '../types/types'
import { useMutateQuestion } from './useMutateQuestion'
import Prop from '../consts/props'
import log from 'loglevel'

export const useScraping = (question: Question, setQuestion: any) => {
  const { updateQuestion } = useMutateQuestion()
  const [showFlg, setShowFlg] = useState(false)
  const [html, setHtml] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (text: string) => {
    setHtml(text)
  }
  const onClick = (questId: string) => {
    const requestData = {
      quest_id: questId,
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
        updateQuestion(newQuestion)
        setQuestion(newQuestion)
      })
      .catch((error) => console.log(error))
  }

  const onClick2 = (retry: boolean, scan: String) => {
    setIsLoading(true)
    const startTime = performance.now()
    axios
      .get(
        `${process.env.REACT_APP_REST_URL}/scraping?quest_id=${question.quest_id}&url=${question.original_url}&scan=${scan}`,
        Prop.config
      )
      .then((response) => {
        const endTime = performance.now()
        console.log((endTime - startTime) / 1000)
        if (scan === 'all') {
          const startTime2 = performance.now()
          let result = response.data
          console.log(result)
          result['keywords'] = []
          const questionItems = (result['question_items'] as NoteItem[])?.map(
            (editElem) => {
              editElem.text = sub(editElem.text)?.trim()
              return editElem
            }
          )
          const options = (result['options'] as NoteItem[])?.map((editElem) => {
            editElem.text = sub(editElem.text)?.trim()
            editElem.correct = editElem.text?.includes('最も投票された')
            editElem.text = editElem.text
              ?.replace('\n\n最も投票された', '')
              .trim()
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
          setQuestion(newQuest)
          const endTime2 = performance.now()
          console.log((endTime2 - startTime2) / 1000)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        log.debug(error.message)
        log.debug(typeof error)
        if (error.message === 'Network Error' && retry) {
          onClick2(false, scan)
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
    str = str?.replaceAll('デプロイメント', 'デプロイ')
    str = str?.replaceAll('地域', 'リージョン')
    // str = str?.replaceAll('オンプレミス', ' オンプレミス ')
    str = str?.replaceAll('メトリック', 'メトリクス')
    str = str?.replaceAll('クラスター', 'クラスタ')
    str = str?.replaceAll('コンテナー', 'コンテナ')
    str = str?.replaceAll('セキュリティ ', 'セキュリティ')
    str = str?.replaceAll('プル リクエスト', 'プルリクエスト')
    str = str?.replaceAll('エラー メッセージ', 'エラーメッセージ')
    str = str?.replaceAll('ソース コード', 'ソースコード')
    str = str?.replaceAll('オープン ソース', 'オープンソース')
    str = str?.replaceAll('ロード バランサー', 'ロードバランサー')
    str = str?.replaceAll(
      'ネットワーク ロード バランサー',
      'Network Load Balancer'
    )
    str = str?.replaceAll('ファイル サーバー', 'ファイルサーバー')
    str = str?.replaceAll(
      'アプリケーション サーバー',
      'アプリケーションサーバー'
    )
    str = str?.replaceAll('イベント ソース', 'イベントソース')
    str = str?.replaceAll('VM', ' VM ')
    str = str?.replaceAll('ETL', ' ETL ')
    str = str?.replaceAll('Hadoop', ' Hadoop ')
    str = str?.replaceAll('SSD', ' SSD ')
    str = str?.replaceAll('Docker', ' Docker ')
    str = str?.replaceAll('Git', ' Git ')
    str = str?.replaceAll(' Git Hub', 'GitHub')
    str = str?.replaceAll('メイビン', 'Maven')
    str = str?.replaceAll('竹', 'Bamboo')
    str = str?.replaceAll(
      'ソリューション アーキテクト',
      'ソリューションアーキテクト'
    )
    str = str?.replaceAll('ルート テーブル', 'ルートテーブル')
    str = str?.replaceAll('セキュリティ グループ', 'セキュリティグループ')
    str = str?.replaceAll('ターゲット グループ', 'ターゲットグループ')
    str = str?.replaceAll('バケット ポリシー', 'バケットポリシー')
    str = str?.replaceAll('キー ポリシー', 'キーポリシー')
    str = str?.replaceAll('グローバル テーブル', 'グローバルテーブル')
    str = str?.replaceAll('エンドポイント サービス', 'エンドポイントサービス')
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
