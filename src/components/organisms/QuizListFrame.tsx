import { FC, memo, useState } from 'react'
import { QItem } from '../molecules/list/QItem'
import { useAppSelector } from '../../app/hooks'
import { selectQuestions } from '../../slices/editSlice'
import { TagFilter } from '../atoms/TagFilter'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline'
import Colors from '../../consts/colors'
import { useFilter } from '../../hooks/useFilter'

export const QuizListFrame: FC = memo(() => {
  const [asc, setAsc] = useState(true)
  const [active, setActive] = useState(true)
  const [inactive, setInactivy] = useState(true)
  const [terminate, setTerminate] = useState(false)
  const data = useAppSelector(selectQuestions)
  const {setSearchWord, show} = useFilter()
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
                id="active"
                checked={terminate}
                onChange={(e) => setTerminate(!terminate)}
              />
              <label htmlFor="active" className="ml-1 text-white">
                破棄
              </label>
            </div>
          </div>
          <TagFilter setSearchWord={setSearchWord} />
          <div
            className={`flex items-center justify-center rounded-full bg-gray-300 h-8 w-8 mt-3 mr-8 font-bold text-blue-700`}
          >
            {data ? data.filter((question) => show(question)).length : 0}
          </div>
        </div>
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
