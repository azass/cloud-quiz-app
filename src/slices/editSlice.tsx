import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Tag, Term, EditContext, voidTag } from '../types/types'

export interface EditState {
  idToken: string
  tab: string
  exam: any
  editedContent: string
  editedContext: EditContext
  providerTags: Tag[]
  examTags: Tag[]
  updateTerm: boolean
  edittingTerms: Term[]
  scArgs: any
  lang: number
}

export const tabs = ['試験一覧', '問題一覧', 'ノート']

export const initialState: EditState = {
  idToken: '',
  tab: tabs[0],
  exam: {},
  editedContent: 'QuizList',
  editedContext: {
    quest_id: '',
    keywordsJson: '',
    chosenTag: voidTag,
    forQuestion: false
  },
  providerTags: [],
  examTags: [],
  updateTerm: false,
  edittingTerms: [],
  scArgs: {
    exam_ids: [],
    category_ids: [],
    execute_times: [],
    mistake_times: [],
    correct_times: [],
    no_of_questions: -1,
    other_options: [],
    maturities: [],
    exclusives: [],
    scorings: [],
    order: 0,
  },
  lang: 1,
}

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload
    },
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload
    },
    setExam: (state, action: PayloadAction<any>) => {
      state.exam = action.payload
    },
    setEditedContent: (state, action: PayloadAction<string>) => {
      state.editedContent = action.payload
    },
    resetEditedContent: (state) => {
      state.editedContent = initialState.editedContent
    },
    setEditContext: (state, action: PayloadAction<EditContext>) => {
      state.editedContext = action.payload
    },
    resetEditContext: (state) => {
      state.editedContext = initialState.editedContext
    },
    setProviderTags: (state, action: PayloadAction<Tag[]>) => {
      state.providerTags = action.payload
    },
    resetProviderTags: (state) => {
      state.providerTags = initialState.providerTags
    },
    setExamTags: (state, action: PayloadAction<Tag[]>) => {
      state.examTags = action.payload
    },
    resetExamTags: (state) => {
      state.examTags = initialState.examTags
    },
    setUpdateTerm: (state, action: PayloadAction<boolean>) => {
      state.updateTerm = action.payload
    },
    resetUpdateTerm: (state) => {
      state.updateTerm = initialState.updateTerm
    },
    setEdittingTerms: (state, action: PayloadAction<Term[]>) => {
      state.edittingTerms = action.payload
    },
    resetEdittingTerms: (state) => {
      state.edittingTerms = initialState.edittingTerms
    },
    setScArgs: (state, action: PayloadAction<any>) => {
      state.scArgs = action.payload
    },
    resetScArgs: (state) => {
      state.scArgs = initialState.scArgs
    },
    setLangs: (state, action: PayloadAction<number>) => {
      state.lang = action.payload
    }
  },
})

export const {
  setIdToken,
  setTab,
  setExam,
  setEditedContent,
  resetEditedContent,
  setEditContext,
  resetEditContext,
  setProviderTags,
  resetProviderTags,
  setExamTags,
  resetExamTags,
  setUpdateTerm,
  resetUpdateTerm,
  setEdittingTerms,
  resetEdittingTerms,
  setScArgs,
  resetScArgs,
  setLangs,
} = editSlice.actions

export const selectIdToken = (state: RootState) => state.edit.idToken
export const selectTab = (state: RootState) => state.edit.tab
export const selectExam = (state: RootState) => state.edit.exam
export const selectEditedContent = (state: RootState) =>
  state.edit.editedContent
export const selectEditContext = (state: RootState) => state.edit.editedContext
export const selectProviderTags = (state: RootState) => state.edit.providerTags
export const selectExamTags = (state: RootState) => state.edit.examTags
export const selectUpdateTerm = (state: RootState) => state.edit.updateTerm
export const selectEdittingTerms = (state: RootState) =>
  state.edit.edittingTerms
export const selectScArgs = (state: RootState) => state.edit.scArgs
export const selectLang = (state: RootState) => state.edit.lang
export default editSlice.reducer
