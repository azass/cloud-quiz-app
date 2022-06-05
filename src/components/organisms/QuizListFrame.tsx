import { VFC, memo, useContext, useState } from 'react'
import { useQueryQuestions } from '../../hooks/useQueryQuestions'
import { QItem } from '../molecules/QItem'
import { useParams } from 'react-router-dom'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectScArgs } from '../../slices/editSlice'
import log from 'loglevel'
import { TagFilter } from '../atoms/TagFilter'
import { Question, Term } from '../../types/types'

export const QuizListFrame: VFC = memo(() => {
  log.setLevel('info')
  log.debug('<QuizListFrame>')
  const color = useContext(ColorContext)
  const params = useParams()
  const scArgs = useAppSelector(selectScArgs)
  const args = { ...scArgs, exam_ids: [params.exam_id] }
  log.debug(args)
  const [searchWord, setSearchWord] = useState('')
  const { status, data } = useQueryQuestions(args)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  const show = (question: Question) => {
    if (searchWord !== '') {
      if (question.keywords) {
        const keywords = JSON.parse(question.keywords)
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
    } else {
      return true
    }
    return false
  }
  return (
    <div id="navWrapper" className={color.bgColor} title="QuizListFrame">
      <div className="flex justify-end -mt-12">
        <TagFilter setSearchWord={setSearchWord} />
      </div>
      <nav
        id="nav"
        className="px-6 pt-2 overflow-y-auto text-xs h-screen pb-60"
      >
        {data?.map((question) => (
          <>
            {show(question) && (
              <div key={question.quest_id}>
                <ul>
                  <QItem question={question} />
                </ul>
              </div>
            )}
          </>
        ))}
      </nav>
    </div>
  )
})
