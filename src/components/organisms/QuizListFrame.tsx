import { VFC, memo, useContext, useState } from 'react'
import { QItem } from '../molecules/QItem'
import { useParams } from 'react-router-dom'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectScArgs } from '../../slices/editSlice'
import { TagFilter } from '../atoms/TagFilter'
import { Question, Term } from '../../types/types'
import log from 'loglevel'
import { useQueryQuestions } from '../../hooks/useQueryQuestions'

export const QuizListFrame: VFC = memo(() => {
  console.log('QuizListFrame start')
  log.setLevel('debug')
  const color = useContext(ColorContext)
  const params = useParams()
  const scArgs = useAppSelector(selectScArgs)
  const args = { ...scArgs, exam_ids: [params.exam_id], except_old: false }
  log.debug(args)
  const [searchWord, setSearchWord] = useState('')
  const { status, data } = useQueryQuestions(args)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

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
          if (question.labels.filter((label) => {
            return label.toLowerCase().includes(searchWord.toLowerCase())
          }).length > 0) {
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
  const count = () => {
    var count = 0
    if (data) {
      data.map((question) => (show))
    }
  }
  return (
    <div id="navWrapper" className={color.bgColor} title="QuizListFrame">
      <div className="flex justify-end -mt-12">
        <div className="flex flex-row items-center">
          <TagFilter setSearchWord={setSearchWord} />
          <div className="rounded-full bg-gray-300 h-8 w-8 mt-3 mr-8 flex items-center justify-center font-bold text-blue-700">
            {data ? data.filter((question) => show(question)).length : 0}
          </div>
        </div>
      </div>
      <nav className="px-6 pt-2 overflow-y-auto text-xs h-screen pb-60">
        {data && data.map((question) => (
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
