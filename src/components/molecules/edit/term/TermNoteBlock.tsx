import { FC, memo, useState } from 'react'
import { NoteItem, Term } from '../../../../types/types'
import { SaveButton } from '../../../atoms/SaveButton'
import { NoteItemAdds } from '../NoteItemAdds'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectUpdateTerm, setUpdateTerm } from '../../../../slices/editSlice'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import {
  useNoteItemsContext,
  useEditItemsContext,
  useEdittingContext,
  useShowSaveBtnContext,
} from '../NoteItemsProvider'
import { useEditTermContext, useTermContext } from './TermProvider'
import { NoteBlockHeader } from '../NoteBlockHeader'
import Colors from '../../../../consts/colors'
import { useStarContext } from './TermsProvider'
import { useEditItems } from '../../../../hooks/useEditItems'
import { TermItemTile } from './TermItemTile'

export const TermNoteBlock: FC = memo(() => {
  const dispatch = useAppDispatch()
  const updateTem = useAppSelector(selectUpdateTerm)
  const { term } = useTermContext()
  const { star } = useStarContext()
  const { draggable, editable, validate, save } = useNoteItemsContext()
  const { showSaveBtn, setShowSaveBtn } = useShowSaveBtnContext()
  const { editting } = useEdittingContext()
  const { updateCacheTerm } = useEditTermContext()
  const { editItems, setEditItems } = useEditItemsContext()
  const { show } = useAppearanceTerm()
  const { changeCheckItem2 } = useEditItems(editItems)
  const [termId, setTermId] = useState(term.term_id)

  if (!draggable && termId !== term.term_id) {
    setTermId(term.term_id)
    setEditItems(term.description || [])
  }

  const postSave = (requestData: Term) => {
    setShowSaveBtn(false)
    updateCacheTerm(requestData)
  }

  const saveTermNote = (newEditItems: NoteItem[]) => {
    const requestData: Term = { ...term, description: newEditItems }
    save(requestData, 'term', postSave(requestData))
    if (!updateTem) dispatch(setUpdateTerm(true))
  }

  const changeCheck = (index: number) => {
    const newEditItems = changeCheckItem2(index)
    setEditItems(newEditItems)
    if (validate(newEditItems)) {
      saveTermNote(newEditItems)
    }
  }
  return (
    <>
      {editable && (
        <div
          className={`-ml-14 ${
            (editting || (!editting && editItems.length !== 0)) && '-mb-8'
          }`}
        >
          <NoteBlockHeader title="" />
        </div>
      )}
      <div className={`px-2 py-2 ${Colors.baseBg}`} title="TermNoteBlock">
        {editItems.length === 0 && editting ? (
          <NoteItemAdds index={0} />
        ) : (
          editItems.map((editItem, index) => (
            <>
              {show(!star, editItem.quest_ids || []) && (
                <TermItemTile
                  editItem={editItem}
                  index={index}
                  changeCheck={changeCheck}
                />
              )}
            </>
          ))
        )}
        <div className="flex justify-center mx-auto">
          {showSaveBtn && editting && (
            <SaveButton onClick={() => saveTermNote(editItems)} />
          )}
        </div>
      </div>
    </>
  )
})
