import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Tag, Term, EditContext, voidTag } from '../types/types'

export interface EditState {
  idToken: string
  tab: string
  exam: any
  editedContent: string
  editedContext: EditContext
  examTags: Tag[]
  updateTerm: boolean
  callTermEdit: boolean
  edittingTerms: Term[]
  scArgs: any
  lang: number
}

export const tabs = ['試験一覧', '問題一覧', '絞り込み']

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
  examTags: [],
  updateTerm: false,
  callTermEdit: false,
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
    order: 0,
  },
  lang: 1,
}

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string>) => {
      console.log('>>>editSlice.setIdToken')
      state.idToken = action.payload
    },
    setTab: (state, action: PayloadAction<string>) => {
      console.log('>>>editSlice.setTab')
      state.tab = action.payload
    },
    setExam: (state, action: PayloadAction<any>) => {
      console.log('>>>editSlice.setExam')
      state.exam = action.payload
    },
    setEditedContent: (state, action: PayloadAction<string>) => {
      console.log('>>>editSlice.setEditedContent')
      state.editedContent = action.payload
    },
    resetEditedContent: (state) => {
      console.log('>>>editSlice.resetEditedContent')
      state.editedContent = initialState.editedContent
    },
    setEditContext: (state, action: PayloadAction<EditContext>) => {
      console.log('>>>editSlice.setEditContext')
      state.editedContext = action.payload
    },
    resetEditContext: (state) => {
      console.log('>>>editSlice.resetEditContext')
      state.editedContext = initialState.editedContext
    },
    setExamTags: (state, action: PayloadAction<Tag[]>) => {
      console.log('>>>editSlice.setExamTags')
      state.examTags = action.payload
    },
    resetExamTags: (state) => {
      console.log('>>>editSlice.resetExamTags')
      state.examTags = initialState.examTags
    },
    setUpdateTerm: (state, action: PayloadAction<boolean>) => {
      console.log('>>>editSlice.setUpdateTerm')
      state.updateTerm = action.payload
    },
    resetUpdateTerm: (state) => {
      console.log('>>>editSlice.resetUpdateTerm')
      state.updateTerm = initialState.updateTerm
    },
    setCallTermEdit: (state, action: PayloadAction<boolean>) => {
      console.log('>>>editSlice.setCallTermEdit')
      state.callTermEdit = action.payload
    },
    resetCallTermEdit: (state) => {
      console.log('>>>editSlice.resetCallTermEdit')
      state.callTermEdit = initialState.callTermEdit
    },
    setEdittingTerms: (state, action: PayloadAction<Term[]>) => {
      console.log('>>>editSlice.setEdittingTerms')
      state.edittingTerms = action.payload
    },
    resetEdittingTerms: (state) => {
      console.log('>>>editSlice.resetEdittingTerms')
      state.edittingTerms = initialState.edittingTerms
    },
    setScArgs: (state, action: PayloadAction<any>) => {
      console.log('>>>editSlice.setScArgs')
      state.scArgs = action.payload
    },
    resetScArgs: (state) => {
      console.log('>>>editSlice.resetScArgs')
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
  setExamTags,
  resetExamTags,
  setUpdateTerm,
  resetUpdateTerm,
  setCallTermEdit,
  resetCallTermEdit,
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
export const selectExamTags = (state: RootState) => state.edit.examTags
export const selectUpdateTerm = (state: RootState) => state.edit.updateTerm
export const selectCallTermEdit = (state: RootState) => state.edit.callTermEdit
export const selectEdittingTerms = (state: RootState) =>
  state.edit.edittingTerms
export const selectScArgs = (state: RootState) => state.edit.scArgs
export const selectLang = (state: RootState) => state.edit.lang
export default editSlice.reducer
