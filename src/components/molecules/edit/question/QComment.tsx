import { FC } from 'react'
import { Comment } from '../../../../types/types'
import Colors from '../../../../consts/colors'
import { useLangContext } from '../../../atoms/LangProvider'
interface Props {
  comment: Comment
}
export const QComment: FC<Props> = ({ comment }) => {
  const { lang } = useLangContext()
  return (
    <li className="py-2">
      <ul>
        <div className={`-mt-5 ${Colors.strong}`}>
          {comment.date && <div>{comment.date}</div>}
          {comment.badge && <div>{comment.badge}</div>}
          <div className="text-xs w-full text-white whitespace-pre-wrap font-body">
            <p>{comment.comment_jp}</p>
          </div>
        </div>
      </ul>
      {lang !== 1 && (
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
