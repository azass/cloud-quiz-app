import { FC, memo } from 'react'
import { useKeywords } from '../../../../hooks/useKeywords'
import { useQuestionContext } from './QuestionProvider'
import { ServiceTag } from '../../../atoms/ServiceTag'
import { TermTag } from '../../../atoms/TermTag'
import { QTermDescription } from './QTermDescription'

export const QTermDescriptions: FC = memo(() => {
  const { question } = useQuestionContext()
  const { getKeywordsJson } = useKeywords()
  const keywords = getKeywordsJson(question)
  const indent = (level: number) => {
    return `pl-${2 * level}`
  }
  return (
    <div className="pb-4" title="QTermDescriptions">
      {Object.keys(keywords).map((key) => (
        <>
          <div className="py-2 text-xs">
            <ServiceTag tagkey={key} question={question} />
          </div>
          {keywords[key].map((term) => (
            <>
              {term.word !== 'is ?' && (
                <div className={`${indent(term.level)} py-0 text-xs`}>
                  <TermTag term={term} withSub={true} />
                </div>
              )}
              {term.description &&
                term.description.filter((item) =>
                  item.quest_ids?.includes(question.quest_id)
                ).length > 0 && (
                  <div className={`pb-2 ${indent(term.level)}`}>
                    <QTermDescription
                      description={term.description || []}
                      quest_id={question.quest_id}
                    />
                  </div>
                )}
            </>
          ))}
        </>
      ))}
    </div>
  )
})
