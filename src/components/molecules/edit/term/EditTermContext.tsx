import { createContext } from "react"
import { Tag, Term } from "../../../../types/types"

export interface EditTermContextValues {
  editting: boolean
  setEditting?: any
  word?: string
  setWord?: any
  level: number
  setLevel?: any
  describe: boolean
  setDescribe?: any
  refTag?: Tag
  setRefTag?: any
  refTerm?: Term
  setRefTerm?: any
  update?: any
  del?: any
  select?: any
  getBgColor?: any
  updateCacheTerm?: any
}
export const EditTermContext = createContext<EditTermContextValues>(
  { editting: false, level: 0, describe: false })
