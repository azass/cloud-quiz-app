import { FC, ReactNode, memo } from 'react'
import { QuestionProvider, useQuestionContext } from './QuestionProvider'
import { QuestionCaseProvider } from './QuestionCaseProvider'
import { QuestionHeaderProvider } from './QuestionHeaderProvider'

interface Props {
  children: ReactNode
}
export const QuestionEditPanel: FC = memo(({ children }) => {
  return (
    <QuestionProvider>
      <QuestionCaseProvider>
        <QuestionHeaderProvider>{children}</QuestionHeaderProvider>
      </QuestionCaseProvider>
    </QuestionProvider>
  )
})
