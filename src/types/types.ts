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
}

export interface Bug {
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
}

export interface Term {
  term_id: string
  word: string
  level: number
  sort: number
  provider: string
  selected?: boolean
  changed?: string
  draggableId?: string
  // describe?: string
  description?: EditElem[]
}

export interface EditContext {
  quest_id: string
  keywordsJson: string
  chosenTag: Tag
}

export namespace EditElemType {
  export const TEXTAREA = "textarea"
  export const IMAGE = "image"
  export const LINK = "link"
  export const OPTION = "option"
}

// export const bgcolor = [
//   'bg-purple-700',
//   'bg-indigo-600',
//   'bg-blue-500',
//   'bg-teal-400',
//   'bg-blue-300',
// ]
export const bgcolor = [
  'bg-indigo-600',
  'bg-blue-500',
  'bg-indigo-400',
  'bg-blue-400',
]
export const selectedBgcolor = [
  'bg-red-500',
  'bg-pink-400',
  'bg-red-300',
  'bg-pink-300',
]

export const voidTag: Tag = {
  tag_no: 0,
  tag_name: '',
  provider: ''
}

// export const voidQuestion: Question = {
//   quest_id: '',
//   quest_no: 0,
//   exam_id: '',
//   exam_no: 0,
//   question_items: [],
//   options: [],
//   explanation: [],
//   correct_answer: [],
//   keywords: [],
//   tags: [],
// }
