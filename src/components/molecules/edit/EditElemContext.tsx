import { createContext } from "react";
import { EditElem } from "../../../types/types";

export interface EditElemContextVals {
  editElem: EditElem
  name: string
  index: number
  editable: boolean
  editting: boolean
  on?: any
}

export const EditElemContext = createContext<EditElemContextVals>({ editElem: {}, name: "", index: 0, editable: false, editting: false })