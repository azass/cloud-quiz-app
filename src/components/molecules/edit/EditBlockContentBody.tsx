import { memo, useContext, VFC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectLang } from "../../../slices/editSlice";
import { EditElemType } from "../../../types/types";
import { EditElemContext } from "./EditElemContext";
import { EditElemImage } from "./EditElemImage";
import { EditElemLinkMemo } from "./EditElemLink";
import { EditElemOption } from "./EditElemOption";
import { EditElemTextarea } from "./EditElemTextarea";
import { EditElemTextbox } from "./EditElemTextbox";

export const EditBlockContentBody: VFC = memo(() => {
  const nowLang = useAppSelector(selectLang)
  const { editElem, name } = useContext(EditElemContext)
  const lv = editElem?.lv
  return (
    <div className={`${lv && `pl-${(Number(lv) - 1) * 4}`}`}>
      {editElem?.type === EditElemType.OPTION && (
        <EditElemOption lang={nowLang} />
      )}
      {editElem?.type === EditElemType.TEXTAREA && (
        <EditElemTextarea lang={name === 'question_items' ? nowLang : 1} />
      )}
      {editElem?.type === EditElemType.LINK && (
        <EditElemLinkMemo />
      )}
      {editElem?.type === EditElemType.IMAGE && (
        <EditElemImage />
      )}
      {editElem?.type === EditElemType.TEXTBOX && <EditElemTextbox />}
    </div>
  )
})