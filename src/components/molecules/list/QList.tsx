import { FC, memo } from 'react'
import { QItem } from './QItem'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { useFilter } from '../../../hooks/useFilter'
import {
  useActiveContext,
  useInactiveContext,
  useSortContext,
  useTerminateContext,
} from './QListProvider'
import { useFilterWordContext } from '../../atoms/FilterWordProvider'

export const QList: FC = memo(() => {
  const { asc } = useSortContext()
  const { active } = useActiveContext()
  const { inactive } = useInactiveContext()
  const { terminate } = useTerminateContext()
  const { filterWord } = useFilterWordContext()
  const data = useAppSelector(selectQuestions)
  const { show } = useFilter()
  const list = () => {
    if (data) {
      const filtered = data.filter(
        (quest) =>
          (!quest.is_old &&
            ((active && !quest.not_ready) || (inactive && quest.not_ready))) ||
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
    <nav className="overflow-y-auto text-xs h-screen">
      {list().map((question) => (
        <>
          {show(question, filterWord) && (
            <div key={question.quest_id}>
              <QItem question={question} />
            </div>
          )}
        </>
      ))}
    </nav>
  )
})
