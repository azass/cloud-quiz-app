import { createContext } from "react";

export interface EditContextVals {
  enableEdit?: boolean
  setEnableEdit?: any
  showCheckbox?: boolean
  setShowCheckbox?: any
  showAllQuestionCase?: boolean
  setShowAllQuestionCase?: any
  add?: any
  del?: any
  changeText?: any
  changeCheck?: any
  changeCheck2?: any
}

export const EditContext = createContext<EditContextVals>({})