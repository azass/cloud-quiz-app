import log from 'loglevel'
import { FC, memo, useContext, useState } from 'react'
import { QItem } from '../molecules/list/QItem'
import { useParams } from 'react-router-dom'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectQuestions, selectScArgs } from '../../slices/editSlice'
import { TagFilter } from '../atoms/TagFilter'
import { Question, Term } from '../../types/types'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline'

export const QuizListFrame: FC = memo(() => {
  log.setLevel('debug')
  const color = useContext(ColorContext)
  const params = useParams()
  const [searchWord, setSearchWord] = useState('')
  const [asc, setAsc] = useState(true)
  const scArgs = useAppSelector(selectScArgs)
  const args = { ...scArgs, exam_ids: [params.exam_id], except_old: false }
  log.debug(args)
  const data = useAppSelector(selectQuestions)
  const filterOtherOptions = (question: Question) => {
    if (args.other_options.length > 0) {
      if (args.other_options.includes(0)) {
        if (question.more_study) {
          return true
        }
      }
      if (args.other_options.includes(1)) {
        if (question.is_difficult) {
          return true
        }
      }
      if (args.other_options.includes(2)) {
        if (question.is_weak) {
          return true
        }
      }
      if (args.other_options.includes(3)) {
        if (question.is_mandatory) {
          return true
        }
      }
      if (args.other_options.includes(4)) {
        if (question.is_bug) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }
  const filterScorings = (question: Question) => {
    if (args.scorings.length > 0) {
      return args.scorings.includes(question.scoring)
    } else {
      return true
    }
  }
  const filterTags = (question: Question) => {
    if (args.category_ids.length > 0 && question.tags) {
      for (const tagId of question.tags) {
        if (args.category_ids.includes(tagId)) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }
  const filter = (question: Question) => {
    if (filterOtherOptions(question)) {
      if (filterScorings(question)) {
        if (filterTags(question)) {
          return true
        }
      }
    }
    return false
  }
  const show = (question: Question) => {
    if (filter(question)) {
      if (searchWord !== '') {
        if (question.keywords) {
          const keywords = JSON.parse(question.keywords || '{}')
          for (const tagName of Object.keys(keywords)) {
            if (tagName.toLowerCase().includes(searchWord.toLowerCase())) {
              return true
            } else {
              if (keywords[tagName].length > 0) {
                if (
                  keywords[tagName].filter((term: Term) => {
                    return term.word
                      .toLowerCase()
                      .includes(searchWord.toLowerCase())
                  }).length > 0
                ) {
                  return true
                }
              }
            }
          }
        }
        if (question.labels) {
          if (
            question.labels.filter((label) => {
              return label.toLowerCase().includes(searchWord.toLowerCase())
            }).length > 0
          ) {
            return true
          }
        }
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
  const list = () => {
    if (data) {
      if (asc) {
        return data
      } else {
        return data.slice().reverse()
      }
    } else {
      return []
    }
  }
  return (
    <div id="navWrapper" className={color.bgColor} title="QuizListFrame">
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
          <TagFilter setSearchWord={setSearchWord} />
          <div className="rounded-full bg-gray-300 h-8 w-8 mt-3 mr-8 flex items-center justify-center font-bold text-blue-700">
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
