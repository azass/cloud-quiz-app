import { FC, useContext } from "react";
import { EditTermContext } from "./EditTermContext";
import { QLinkPopup } from "./QLinkPopup";
import { XCircleIcon } from '@heroicons/react/solid'
import {
  PencilAltIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { TermContext } from "./TermContext";

export const EditTermOperateIconSet: FC = () => {
  const { term } = useContext(TermContext)
  const { editting, setEditting, update, del } = useContext(EditTermContext)
  return (
    <div className="flex" >
      <div className="flex items-center">
        {term.quest_ids && term.quest_ids.length > 0 && (
          <QLinkPopup quest_ids={term.quest_ids || []} />
        )}
        {editting && (
          <XCircleIcon
            className="w-6 h-6 mx-1 cursor-pointer"
            onClick={() => del()}
          />
        )}
      </div>
      {!editting ? (
        <PencilAltIcon
          className="w-4 h-4 ml-4 mr-1 cursor-pointer"
          onClick={() => setEditting(true)}
        />
      ) : (
        <CheckCircleIcon
          className="w-6 h-6 ml-4 mr-1 cursor-pointer"
          onClick={() => update()}
        />
      )}
    </div>
  )
}