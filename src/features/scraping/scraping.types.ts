// src/features/scraping/scraping.types.ts
// スクレイピング機能固有の型定義。共通型は types/types.ts から再利用する。

import type { NoteItem, Question } from '../../types/types'

// ── scan パラメータ ───────────────────────────────────────────────────────────
export type ScanType = 'all' | 'comments'

// ── API レスポンスの生データ ──────────────────────────────────────────────────
// response.data をそのまま受け取る際の型。
// correct_answers・explanation は存在しない場合があるため省略可能にする。
export interface RawScrapingResult {
  question_items: NoteItem[]
  options: NoteItem[]
  correct_answers?: string[]   // 省略時は options.text の内容から正解を判定する
  explanation?: NoteItem[]
  keywords?: string[]
}

// ── 手動スクレイピング（POST /scraping）レスポンス ────────────────────────────
export interface ManualScrapingResult {
  question_items: NoteItem[]
  options: NoteItem[]
}

// ── re-export ─────────────────────────────────────────────────────────────────
// 外部モジュールが types/ を直接参照しなくて済むよう窓口を一本化する。
export type { NoteItem, Question }
