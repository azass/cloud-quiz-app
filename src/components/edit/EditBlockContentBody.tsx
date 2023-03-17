import { memo, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLang } from "../../slices/editSlice";
import { EditElem, EditElemType } from "../../types/types";
import { EditElemImage } from "./EditElemImage";
import { EditElemLinkMemo } from "./EditElemLink";
import { EditElemOption } from "./EditElemOption";
import { EditElemTextarea } from "./EditElemTextarea";
import { EditElemTextbox } from "./EditElemTextbox";
interface Props {
  editElem: EditElem
  name: string
  index: number
  onClickAdd: any
  onChangeText: any
  onChangeCheck: any
  showCheckbox?: boolean
  editable: boolean
  editting: boolean
  on: any
}
export const EditBlockContentBody: VFC<Props> = memo(({
  editElem,
  name,
  index,
  onClickAdd,
  onChangeText,
  onChangeCheck,
  showCheckbox,
  editable,
  editting,
  on
}) => {
  const nowLang = useAppSelector(selectLang)
  const lv = editElem.lv
  return (
    <div className={`${lv && `pl-${(Number(lv) - 1) * 4}`}`}>
      {editElem.type === EditElemType.OPTION && (
        <EditElemOption
          editElem={editElem}
          index={index}
          onClickAdd={onClickAdd}
          onChangeText={onChangeText}
          onChangeCheck={onChangeCheck}
          showCheckbox={showCheckbox}
          editting={editting}
          lang={nowLang}
        />
      )}
      {editElem.type === EditElemType.TEXTAREA && (
        <EditElemTextarea
          editElem={editElem}
          index={index}
          onChangeText={onChangeText}
          lang={name === 'question_items' ? nowLang : 1}
          editable={editable}
          editting={editting}
          on={on()}
        />
      )}
      {editElem.type === EditElemType.LINK && (
        <EditElemLinkMemo
          editElem={editElem}
          index={index}
          onChangeText={onChangeText}
          editable={editable}
          editting={editting}
          on={on()}
        />
      )}
      {editElem.type === EditElemType.IMAGE && (
        <EditElemImage
          editElem={editElem}
          index={index}
          onChangeText={onChangeText}
          editable={editable}
          editting={editting}
        />
      )}
      {editElem.type === EditElemType.TEXTBOX && <EditElemTextbox />}
    </div>
  )
})