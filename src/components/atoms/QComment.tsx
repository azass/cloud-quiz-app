import { FC } from 'react'
import { Comment } from '../../types/types'
import { useAppSelector } from '../../app/hooks'
import { selectLang } from '../../slices/editSlice'
interface Props {
  comment: Comment
}
export const QComment: FC<Props> = ({ comment }) => {
  const nowLang = useAppSelector(selectLang)
  return (
    <li className="py-2">
      <ul>
        <div className=" -mt-5 text-white">
          {comment.date && <div>{comment.date}</div>}
          {comment.badge && <div>{comment.badge}</div>}
          <div>{comment.comment_jp}</div>
        </div>
      </ul>
      {nowLang !== 1 && (
        <div className="mt-2">
          <span className="text-sky-400">{comment.comment_en}</span>
        </div>
      )}
      <div className="pl-6">
        {comment.replays.map((comment) => (
          <ul className="py-4">
            <QComment comment={comment} />
          </ul>
        ))}
      </div>
    </li>
  )
}
