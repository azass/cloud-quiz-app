import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext } from '../../slices/editSlice'
import { QuestionProvider } from '../molecules/edit/question/QuestionProvider'
import { TermEditor } from '../molecules/edit/term/TermEditor'
import { EditQuestion } from '../molecules/edit/question/EditQuestion'
import { QuestionCaseProvider } from '../molecules/edit/question/QuestionCaseProvider'
import { EditElemsProvider } from '../molecules/edit/EditElemsProvider'
import { TermProvider } from '../molecules/edit/term/TermProvider'
export const EditPanel: FC = () => {
  const editContext = useAppSelector(selectEditContext)
  return (
    <>
      {!editContext.chosenTerm ? (
        <QuestionProvider>
          <QuestionCaseProvider>
            <EditQuestion />
          </QuestionCaseProvider>
        </QuestionProvider>
      ) : (
        <div className="flex grow w-full">
            <TermProvider
              term={editContext.chosenTerm}
              index={-1}
              forQuestion={false}
            >
          <EditElemsProvider
            name={'description'}
            editElems={editContext.chosenTerm.description || []}
            editable={true}
            draggable={false}
            star={false}
          >
              <TermEditor />
          </EditElemsProvider>
          </TermProvider>
        </div>
      )}
    </>
  )
}
