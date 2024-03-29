import { TagIcon } from '@heroicons/react/outline'
import { memo, FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext } from '../../slices/editSlice'
import { iconAccent } from '../../styles/util'

interface Props {
  quest_ids: string[]
}
export const QLinkPopup: FC<Props> = memo(({ quest_ids }) => {
  const editContext = useAppSelector(selectEditContext)

  return (
    <div className="relative group">
      <TagIcon className={`w-4 h-4 mr-1 font-black ${iconAccent}`} />
      <div className="absolute invisible group-hover:visible bg-blue-800 w-32 -ml-20">
        {quest_ids.map((quest_id) => (
          <div
            className={
              `mx-1 my-1 text-pink-200 cursor-pointer bg-blue-800` +
              ` hover:text-pink-400 text-center z-10`
            }
          >
            <Link
              to={`/editor/${quest_id.slice(
                0,
                -5
              )}/${quest_id}?fromTermEditor=${editContext.chosenTag.tag_no}`}
            >
              {quest_id}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
})
