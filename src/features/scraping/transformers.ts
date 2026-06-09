// src/features/scraping/transformers.ts
// スクレイピング結果を Question 型に変換する純粋関数。
// 副作用なし・外部依存なし（normalizeText のみ使用）。

import { normalizeText } from './normalizers'
import type { RawScrapingResult, NoteItem, Question } from './scraping.types'

// ── ヘルパー：正解フラグの判定 ───────────────────────────────────────────────
const resolveCorrect = (
  item: NoteItem,
  raw: RawScrapingResult
): boolean => {
  if (raw.correct_answers !== undefined) {
    return raw.correct_answers.includes(item.mark ?? '')
  }
  // correct_answers が存在しない場合は options.text の内容から判定する
  return item.text?.includes('最も投票された') ?? false
}

// ── ヘルパー：正解マークの配列を生成 ─────────────────────────────────────────
const resolveCorrectAnswer = (
  options: NoteItem[],
  raw: RawScrapingResult
): string[] => {
  if (raw.correct_answers !== undefined) {
    return raw.correct_answers
  }
  return options.filter((o) => o.correct).map((o) => o.mark ?? '')
}

// ── メイン変換関数 ────────────────────────────────────────────────────────────
/**
 * API レスポンスの生データを Question 型に変換する。
 *
 * @param raw  - GET /scraping のレスポンスボディ
 * @param base - 更新元の Question（変換しないフィールドはそのまま引き継ぐ）
 * @returns 変換済みの Question
 */
export const transformScrapedData = (
  raw: RawScrapingResult,
  base: Question
): Question => {
  const questionItems: NoteItem[] = raw.question_items.map((item) => ({
    ...item,
    text: normalizeText(item.text),
  }))

  const options: NoteItem[] = raw.options.map((item) => {
    const normalizedText = normalizeText(item.text)
    return {
      ...item,
      text: normalizedText.replace('\n\n最も投票された', '').trim(),
      correct: resolveCorrect({ ...item, text: normalizedText }, raw),
    }
  })

  return {
    ...base,
    quest_no: parseInt(base.quest_id.slice(-4), 10),
    question_items: questionItems,
    options,
    correct_answer: resolveCorrectAnswer(options, raw),
    explanation: [
      ...(base.explanation ?? []),
      ...(raw.explanation ?? []),
    ],
  }
}
