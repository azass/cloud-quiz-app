import { FC } from "react";
import { TermOperateIconSet } from "./TermOperateIconSet";
import { TermKeyword } from "./TermKeyword";
import { TermDescriptionIcon } from "./TermDescriptionIcon";
import { strongText } from "../../../../styles/util";
import { useEditTermContext, useLevelContext } from "./TermProvider";

export const TermDraggableSelect: FC = () => {
  const { level } = useLevelContext()
  const { getBgColor } = useEditTermContext()
  return (
    <div
    className={
      'place-items-center flex justify-between border rounded-full ' +
      `my-1 mx-1 pr-2 text-sm ${strongText} ` +
      getBgColor(level)
    }
  >
    <div className="flex justify-start items-center px-2">
      <div className={`flex items-center`}>
        <TermDescriptionIcon />
        <TermKeyword />
      </div>
    </div>
    <TermOperateIconSet />
  </div>
  )
}