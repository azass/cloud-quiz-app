import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext } from '../../slices/editSlice'
import { QuestionEdit } from '../molecules/edit/question/QuestionEdit'
import { TermNoteHeader } from '../molecules/edit/term/TermNoteHeader'
import { TermNoteBlock } from '../molecules/edit/term/TermNoteBlock'
import { QuestionEditHeader } from '../molecules/edit/question/QuestionEditHeader'
import { QuestionEditPanel } from '../molecules/edit/question/QuestionEditPanel'
import { useOpenBookContext } from '../pages/QuizEditor'
import { TermEditPanel } from '../molecules/edit/term/TermEditPanel'

export const EditPanel: FC = () => {
  const { open } = useOpenBookContext()
  const editContext = useAppSelector(selectEditContext)
  return (
    <>
      {!editContext.chosenTerm ? (
        <div>
          <QuestionEditPanel>
            <div
              className={
                `fixed pr-8 pt-1 pb-2 z-10 ` +
                `${open ? 'w-1/2 -mt-6' : 'w-full'}`
              }
              title="EditQuestionHeader"
            >
              <QuestionEditHeader />
            </div>
            <div className="pt-8" title="EditQuestion">
              <QuestionEdit />
            </div>
          </QuestionEditPanel>
        </div>
      ) : (
        <div className="flex w-full">
          <TermEditPanel term={editContext.chosenTerm}>
            <div
              className={
                `fixed pr-8 mt-14 pb-2 z-10 ` + `${open ? 'w-1/2' : 'w-full'}`
              }
            >
              <TermNoteHeader />
            </div>
            <div className="w-full pr-4 pl-2 mt-24">
              <TermNoteBlock />
            </div>
          </TermEditPanel>
        </div>
      )}
    </>
  )
}
