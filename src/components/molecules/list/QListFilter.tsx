import { FC } from 'react'
import { TagFilter } from '../../atoms/TagFilter'
import { useFilter } from '../../../hooks/useFilter'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import {
  useActiveContext,
  useInactiveContext,
  useTerminateContext,
} from './QListProvider'
import { useFilterWordContext } from '../../atoms/FilterWordProvider'
import { strongText } from '../../../styles/util'

export const QListFilter: FC = () => {
  const data = useAppSelector(selectQuestions)
  const { active, setActive } = useActiveContext()
  const { inactive, setInactivy } = useInactiveContext()
  const { terminate, setTerminate } = useTerminateContext()
  const { show } = useFilter()
  const { filterWord, setFilterWord } = useFilterWordContext()
  return (
    <div className="flex items-center">
      <div className="flex items-center mt-0.5 px-1">
        <button
          type="button"
          className={
            `flex-shrink-0 border px-1 ${strongText} text-xs ` +
            `${active && ` bg-green-400`}`
          }
          onClick={() => setActive(!active)}
        >
          <span>有効</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border px-1 ${strongText} text-xs ` +
            `${inactive && ` bg-sky-400`}`
          }
          onClick={() => setInactivy(!inactive)}
        >
          <span>無効</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border px-1 ${strongText} text-xs ` +
            `${terminate && ` bg-sky-400`}`
          }
          onClick={() => setTerminate(!terminate)}
        >
          <span>破棄</span>
        </button>
      </div>
      <div className="flex px-2">
        <TagFilter filterWord={filterWord} setSearchWord={setFilterWord} />
      </div>
      <div
        className={
          `flex items-center justify-center rounded-full px-2` +
          ` bg-gray-300 h-8 w-8 mr-8 font-bold text-blue-700`
        }
      >
        {data
          ? data
              .filter((question) => show(question, filterWord))
              .filter(
                (quest) =>
                  (!quest.is_old &&
                    ((active && !quest.not_ready) ||
                      (inactive && quest.not_ready))) ||
                  (terminate && quest.is_old)
              ).length
          : 0}
      </div>
    </div>
  )
}
