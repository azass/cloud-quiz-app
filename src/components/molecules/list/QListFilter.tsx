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

export const QListFilter: FC = () => {
  const data = useAppSelector(selectQuestions)
  const { active, setActive } = useActiveContext()
  const { inactive, setInactivy } = useInactiveContext()
  const { terminate, setTerminate } = useTerminateContext()
  const { show } = useFilter()
  const { filterWord, setFilterWord } = useFilterWordContext()
  return (
    <div className="flex flex-row items-center -mt-8">
      <div className="flex flex-row items-center mt-4 mr-4">
        <div className="flex px-2">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(!active)}
          />
          <label htmlFor="active" className="ml-1 text-white">
            有効
          </label>
        </div>
        <div className="flex px-2">
          <input
            type="checkbox"
            id="inactive"
            checked={inactive}
            onChange={(e) => setInactivy(!inactive)}
          />
          <label htmlFor="inactive" className="ml-1 text-white">
            無効
          </label>
        </div>
        <div className="flex px-2">
          <input
            type="checkbox"
            id="terminate"
            checked={terminate}
            onChange={(e) => setTerminate(!terminate)}
          />
          <label htmlFor="terminate" className="ml-1 text-white">
            破棄
          </label>
        </div>
      </div>
      <TagFilter setSearchWord={setFilterWord} />
      <div
        className={
          `flex items-center justify-center rounded-full` +
          ` bg-gray-300 h-8 w-8 mt-3 mr-8 font-bold text-blue-700`
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
