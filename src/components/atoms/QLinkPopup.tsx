import { ChevronRightIcon } from "@heroicons/react/solid";
import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectEditContext } from "../../slices/editSlice";

interface Props {
  quest_ids: string[]
}
export const QLinkPopup: VFC<Props> = memo(({ quest_ids }) => {
  const editContext = useAppSelector(selectEditContext)

  return (
    <div className="relative group">
      <ChevronRightIcon className="w-5 h-5 mr-1 text-white cursor-pointer" />
      <div className="absolute invisible group-hover:visible bg-blue-800 w-32 -ml-20">
        {quest_ids.map((quest_id => (
          <div className="px-1 py-1 text-pink-200 cursor-pointer bg-blue-800 hover:text-pink-400 text-center">
            <Link to={`/editor/${quest_id.slice(0, -5)}/${quest_id}?fromTermEditor=${editContext.chosenTag.tag_no}`} >{quest_id}</Link>
          </div>
        )))}
      </div>
    </div>
  );
});
