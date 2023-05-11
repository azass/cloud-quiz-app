import { FC, memo, useState } from 'react'
import { QItem } from './QItem'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline'
import Colors from '../../../consts/colors'
import { useFilter } from '../../../hooks/useFilter'
import {
  useActiveContext,
  useInactiveContext,
  useTerminateContext,
} from './QListProvider'
import { QListFilter } from './QListFilter'
import { useFilterWordContext } from '../../atoms/FilterWordProvider'
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/solid'

export const QList: FC = memo(() => {
  const [asc, setAsc] = useState(true)
  const { active } = useActiveContext()
  const { inactive } = useInactiveContext()
  const { terminate } = useTerminateContext()
  const data = useAppSelector(selectQuestions)
  const { show } = useFilter()
  const { filterWord } = useFilterWordContext()
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
    <div id="navWrapper" className={`${Colors.baseBg} pb-4`} title="QList">
      <div className="flex justify-between">
        <div className="flex flex-row items-center ml-1">
          <div className="ml-7 mr-1 mb-1 text-sky-500">sort</div>
          {asc ? (
            <ArrowCircleUpIcon
              className="h-5 w-5 mx-1 text-sky-500 cursor-pointer"
              onClick={() => setAsc(false)}
            />
          ) : (
            <ArrowCircleDownIcon
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
            {show(question,filterWord) && (
              <div key={question.quest_id}>
                <QItem question={question} />
              </div>
            )}
          </>
        ))}
      </nav>
    </div>
  )
})
