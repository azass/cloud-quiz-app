import { FC } from 'react'
import { TermSaveButton } from './TermSaveButton'
import {
  BookOpenIcon,
  LockClosedIcon,
  LockOpenIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import { selectEditContext, selectTab } from '../../../../slices/editSlice'
import Colors from '../../../../consts/colors'
import { iconStrong } from '../../../../styles/util'
import { resetServerContext } from 'react-beautiful-dnd'
import {
  useDraggableContext,
  useLockDragContext,
  useStarContext,
} from './TermsProvider'
import Label from '../../../../consts/labels'

export const TermsHeader: FC = () => {
  const params = useParams()
  const editedContext = useAppSelector(selectEditContext)
  const nowTab = useAppSelector(selectTab)
  const { star, setStar } = useStarContext()
  const { lockDrag, setLockDrag } = useLockDragContext()
  const { draggable, setDraggable } = useDraggableContext()
  const toggle = () => {
    resetServerContext()
    setDraggable(!draggable)
  }
  return (
    <div className="flex justify-between items-center w-full pl-4 pb-4 h-12">
      <div className="flex">
        <span
          className={`rounded-full px-6 py-1 bg-pink-600 ${iconStrong} ${Colors.baseBg}`}
          onClick={() => toggle()}
          title={String(editedContext.chosenTag.tag_no)}
        >
          {editedContext.chosenTag.tag_name}
        </span>
        <TermSaveButton />
      </div>
      <div className="flex">
        <StarIcon
          className={
            'h-8 w-8 mr-8 cursor-pointer ' +
            `${star ? Colors.shining : 'text-gray-700'}`
          }
          onClick={() => setStar(!star)}
        />
        {nowTab === Label.tabs[2] ? (
          <Link to={`/editor/${params.exam_id}`}>
            <BookOpenIcon
              className={
                'h-8 w-8 mr-8 cursor-pointer ' +
                `${star ? 'text-sky-500' : 'text-gray-700'}`
              }
            />
          </Link>
        ) : (
          <>
            {lockDrag ? (
              <LockClosedIcon
                className="h-7 w-7 mr-8 mt-1 text-sky-500 cursor-pointer"
                onClick={() => setLockDrag(!lockDrag)}
              />
            ) : (
              <LockOpenIcon
                className="h-7 w-7 mr-8 mt-1 text-sky-500 cursor-pointer"
                onClick={() => setLockDrag(!lockDrag)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
