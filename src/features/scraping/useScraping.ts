// src/features/scraping/useScraping.ts
// スクレイピング機能の状態管理と HTTP 通信を担うカスタムフック。
// データ変換ロジックは transformers.ts に分離済み。

import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import log from 'loglevel'

import { useMutateQuestion } from '../../hooks/useMutateQuestion'
import Prop from '../../consts/props'
import { transformScrapedData } from './transformers'
import type {
  Question,
  ManualScrapingResult,
  RawScrapingResult,
  ScanType,
} from './scraping.types'
import { useQuestionContext } from '../../components/molecules/edit/question/QuestionProvider'

// ── フックの戻り値の型 ────────────────────────────────────────────────────────
interface UseScrapingReturn {
  showFlag: boolean
  setShowFlag: (flag: boolean) => void
  isLoading: boolean
  error: string | null
  clearError: () => void
  onChange: (text: string) => void
  handleManualScrape: (questId: string) => void
  handleAutoScrape: (retry: boolean, scan: ScanType) => void
}

// ── フック本体 ────────────────────────────────────────────────────────────────
export const useScraping = (): UseScrapingReturn => {
  const { question, setQuestion, setExplanation } = useQuestionContext()
  const { updateQuestion } = useMutateQuestion()

  const [showFlag, setShowFlag] = useState(false)
  const [html, setHtml]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const clearError = () => setError(null)

  // ── テキストエリア変更ハンドラ ──────────────────────────────────────────────
  const onChange = (text: string): void => {
    setHtml(text)
  }

  // ── 手動スクレイピング（HTML 貼り付け → POST） ──────────────────────────────
  const handleManualScrape = (questId: string): void => {
    const requestData = {
      quest_id: questId,
      data: html,
    }

    axios
      .post<ManualScrapingResult>(
        `${process.env.REACT_APP_REST_URL}/scraping`,
        requestData,
        Prop.config
      )
      .then(({ data }) => {
        const newQuestion: Question = {
          ...question,
          question_items: data.question_items,
          options: data.options,
        }
        updateQuestion(newQuestion)
        setQuestion(newQuestion)
      })
      .catch((err: AxiosError) => {
        log.error('[handleManualScrape]', err.message)
        setError(err.message)
      })
  }

  // ── 自動スクレイピング（URL 指定 → GET） ─────────────────────────────────────
  const handleAutoScrape = (retry: boolean, scan: ScanType): void => {
    setIsLoading(true)

    const url =
      `${process.env.REACT_APP_REST_URL}/scraping` +
      `?quest_id=${question.quest_id}` +
      `&url=${question.original_url}` +
      `&scan=${scan}`

    axios
      .get<RawScrapingResult>(url, Prop.config)
      .then(({ data }) => {
        if (scan === 'all') {
          const newQuestion = transformScrapedData(
            { ...data, keywords: [] },
            question
          )

          // 未取得の場合のみ DB を更新する（再スクレイピングで上書きしない）
          const isFirstFetch =
            question.question_items === undefined &&
            question.options === undefined

          if (isFirstFetch) {
            updateQuestion(newQuestion)
          }

          setQuestion(newQuestion)
          setExplanation(newQuestion.explanation ?? []) // explanation は QuestionProvider で管理しているため、個別に更新する
        }
      })
      .catch((err: AxiosError) => {
        log.error('[handleAutoScrape]', err.message)

        // ネットワークエラーは 1 回だけリトライする
        if (err.message === 'Network Error' && retry) {
          handleAutoScrape(false, scan)
          return
        }

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    showFlag,
    setShowFlag,
    isLoading,
    error,
    clearError,
    onChange,
    handleManualScrape,
    handleAutoScrape,
  }
}
