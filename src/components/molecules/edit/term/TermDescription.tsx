import { FC, memo, useState } from 'react'
import { NoteBlockContent } from '../NoteBlockContent'
import { Term } from '../../../../types/types'
import { SaveButton } from '../../../atoms/SaveButton'
import { NoteItemAdds } from '../NoteItemAdds'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectUpdateTerm, setUpdateTerm } from '../../../../slices/editSlice'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import { NoteItemProvider } from '../NoteItemProvider'
import {
  useNoteItemsContext,
  useEditItemsContext,
  useEdittingContext,
  useSaveButtonToggleContext,
} from '../NoteItemsProvider'
import { useEditTermContext, useTermContext } from './TermProvider'
import { NoteBlockHeader } from '../NoteBlockHeader'
import Colors from '../../../../consts/colors'
import { useStarContext } from './TermsProvider'

export const TermDescription: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { term } = useTermContext()
  const { star } = useStarContext()
  const { draggable, editable } = useNoteItemsContext()
  const { editting } = useEdittingContext()
  const { updateCacheTerm } = useEditTermContext()
  const { editItems: editElemsState, setEditItems: setEditElemsState } =
    useEditItemsContext()
  const { saveButtonToggle } = useSaveButtonToggleContext()
  const { save } = useNoteItemsContext()
  const updateTem = useAppSelector(selectUpdateTerm)
  const [termId, setTermId] = useState(term.term_id)
  const { show } = useAppearanceTerm()
  if (!draggable && termId !== term.term_id) {
    setTermId(term.term_id)
    setEditElemsState(term.description || [])
  }
  const onClickSave = () => {
    const requestData: Term = { ...term, description: editElemsState }
    save(requestData, 'term', updateCacheTerm(requestData))
    if (!updateTem) dispatch(setUpdateTerm(true))
  }

  return (
    <>
      {editable && (
        <div className="-ml-6 -mt-2 pt-1">
          <NoteBlockHeader title="" />
        </div>
      )}
      <div
        className={`px-2 pb-6 -mt-6 ${Colors.baseBg}`}
        title="TermDescription"
      >
        {editElemsState.length === 0 && editting ? (
          <NoteItemAdds index={0} />
        ) : (
          editElemsState.map((editElem, index) => (
            <>
              {show(!star, editElem.quest_ids || []) && (
                <NoteItemProvider editElem={editElem} index={index}>
                  <NoteBlockContent />
                </NoteItemProvider>
              )}
            </>
          ))
        )}
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && editting && <SaveButton onClick={onClickSave} />}
        </div>
      </div>
    </>
  )
})
