import { FC, memo, useState } from 'react'
import { QItem } from '../molecules/list/QItem'
import { useAppSelector } from '../../app/hooks'
import { selectQuestions } from '../../slices/editSlice'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline'
import Colors from '../../consts/colors'
import { useFilter } from '../../hooks/useFilter'
import {
  useActiveContext,
  useInactiveContext,
  useTerminateContext,
} from '../molecules/list/QListProvider'
import { QListFilter } from '../molecules/list/QListFilter'

export const QuizListFrame: FC = memo(() => {
  const [asc, setAsc] = useState(true)
  const { active } = useActiveContext()
  const { inactive } = useInactiveContext()
  const { terminate } = useTerminateContext()
  const data = useAppSelector(selectQuestions)
  const { show } = useFilter()
  const list = () => {
    if (data) {
      const filtered = data.filter(
        (quest) =>
          (active && !quest.not_ready) ||
          (inactive && quest.not_ready) ||
          (terminate && quest.is_old)
      )
      if (asc) {
        return filtered
      } else {
        return filtered.slice().reverse()
      }
    } else {
      return []
    }
  }
  return (
    <div id="navWrapper" className={Colors.baseBg} title="QuizListFrame">
      <div className="flex justify-between">
        <div className="flex flex-row items-center ml-1">
          <div className="ml-7 mr-1 mb-1 text-sky-500">sort</div>
          {asc ? (
            <ArrowSmUpIcon
              className="h-5 w-5 mx-1 text-sky-500 cursor-pointer"
              onClick={() => setAsc(false)}
            />
          ) : (
            <ArrowSmDownIcon
              className="h-5 w-5 mx-1 text-sky-500 cursor-pointer"
              onClick={() => setAsc(true)}
            />
          )}
        </div>
        <QListFilter />
      </div>
      <nav className="px-6 pt-2 overflow-y-auto text-xs h-screen pb-60">
        {list().map((question) => (
          <>
            {show(question) && (
              <div key={question.quest_id}>
                <div>
                  <QItem question={question} />
                </div>
              </div>
            )}
          </>
        ))}
      </nav>
    </div>
  )
})
