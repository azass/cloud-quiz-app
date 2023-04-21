export interface Question {
  quest_id: string
  quest_no?: number
  exam_id?: string
  exam_no?: number
  question_items?: EditElem[]
  correct_answer?: string[]
  options?: EditElem[]
  explanation?: EditElem[]
  keywords?: string
  tags?: string[]
  original_url?: string
  is_bug?: boolean
  bug_points?: Bug
  more_study?: boolean
  is_easy?: boolean
  is_difficult?: boolean
  is_weak?: boolean
  is_mandatory?: boolean
  learning_note?: string
  labels?: string[]
  case_id?: string
  case_items?: EditElem[]
  scoring?: number
  is_old?: boolean
  not_ready?: boolean
}

export interface TagTerms {
  [key: string]: Term[];
}

export interface EditElem {
  type?: string
  text?: string
  text_en?: string
  image_path?: string
  image_height?: string
  link?: string
  url?: string
  mark?: string
  correct?: boolean
  quest_ids?: string[]
  lv?: string
}

export interface Bug {
  more_study?: boolean
  in_question?: boolean
  in_option?: boolean
  in_tag?: boolean
  in_explanation?: boolean
  memo?: string
}

export interface Provider {
  name: string
  display_name: string
  exams: Exam[]
  tags: Tag[]
}

export interface Exam {
  exam_id: string
  exam_name: string
  provider: string
  icon_path: string
  exam_count: number
  level: number
  point: number
  div: number
}

export interface Tag {
  tag_no: number
  tag_name: string
  provider: string
  count?: number
}

export interface Term {
  term_id: string
  word: string
  level: number
  sort: number
  provider: string
  tag_no: number
  selected?: boolean
  changed?: string
  draggableId?: string
  description?: EditElem[]
  quest_ids?: string[]
  ref?: Term
  fold?: boolean
  hide?: boolean
}

export interface EditContext {
  quest_id: string
  keywordsJson: string
  chosenTag: Tag
  forQuestion: boolean
  chosenTerm?: Term
}

export interface ProgressState {
  execute: string[][]
  mistake: string[][]
}

export interface Comment {
  date?: string
  badge?: string
  selected?: string
  comment_jp: string
  comment_en: string
  replays: Comment[]
}

export interface Comments {
  comment_items: Comment[]
  answer_items: EditElem[]
}

export namespace EditElemType {
  export const TEXTAREA = "textarea"
  export const IMAGE = "image"
  export const LINK = "link"
  export const OPTION = "option"
  export const TEXTBOX = "textbox"
}

export const bgcolor = [
  'bg-indigo-600',
  'bg-blue-500',
  'bg-indigo-400',
  'bg-blue-400',
  'bg-indigo-300',
  'bg-blue-300',
]
export const selectedBgcolor = [
  'bg-red-500',
  'bg-pink-400',
  'bg-red-300',
  'bg-pink-300',
  'bg-red-200',
  'bg-pink-200',
]

export const voidTag: Tag = {
  tag_no: 0,
  tag_name: '',
  provider: ''
}

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}
