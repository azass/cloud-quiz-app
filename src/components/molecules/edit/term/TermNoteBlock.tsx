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
import Colors from '../../../../consts/colors'
import { useFireContext, useStarContext } from './TermsProvider'
import { useEditItems } from '../../../../hooks/useEditItems'
import { TermItemTile } from './TermItemTile'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { iconBase, iconShine } from '../../../../styles/util'

export const TermNoteBlock: FC = memo(() => {
  const dispatch = useAppDispatch()
  const updateTem = useAppSelector(selectUpdateTerm)
  const { term } = useTermContext()
  const { fire } = useFireContext()
  const { star } = useStarContext()
  const { draggable, editable, validate, save } = useNoteItemsContext()
  const { showSaveBtn, setShowSaveBtn } = useShowSaveBtnContext()
  const { editting, setEditting } = useEdittingContext()
  const { updateCacheTerm } = useEditTermContext()
  const { editItems, setEditItems } = useEditItemsContext()
  const { isVisibleTag } = useAppearanceTerm()
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
    <div className={`flex items-stretch w-full`}>
      {editable && (
        <div className="pt-2 pl-4 pr-2">
          {editting ? (
            <CheckCircleIcon
              className={`h-5 w-5 ${iconShine}`}
              onClick={() => setEditting(!editting)}
            />
          ) : (
            <PencilAltIcon
              className={`h-4 w-5 ${iconBase}`}
              onClick={() => setEditting(!editting)}
            />
          )}
        </div>
      )}
      <div
        className={`w-full px-0 pb-2 ${Colors.baseBg}`}
        title="TermNoteBlock"
      >
        {editItems.length === 0 && editting ? (
          <NoteItemAdds index={0} />
        ) : (
          editItems.map((editItem, index) => (
            <>
              {isVisibleTag(star, fire, editItem.quest_ids || []) && (
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
    </div>
  )
})
