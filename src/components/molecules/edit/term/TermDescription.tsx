import { FC, memo, useContext, useState } from 'react'
import { EditBlockContent } from '../EditBlockContent'
import { Term } from '../../../../types/types'
import { SaveButton } from '../../../atoms/SaveButton'
import { EditElemAdds } from '../EditElemAdds'
import { ColorContext } from '../../../../App'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectUpdateTerm, setUpdateTerm } from '../../../../slices/editSlice'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import { EditElemProvider } from '../EditElemProvider'
import {
  useEditElemsContext,
  useEditElemsStateContext,
  useEnableEditContext,
  useSaveButtonToggleContext,
} from '../EditElemsProvider'
import { useEditTermContext, useTermContext } from './TermProvider'
import { EditBlockHeader } from '../EditBlockHeader'

export const TermDescription: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { term } = useTermContext()
  const { star, draggable, editable } = useEditElemsContext()
  const { enableEdit } = useEnableEditContext()
  const { updateCacheTerm } = useEditTermContext()
  const { editElemsState, setEditElemsState } = useEditElemsStateContext()
  const { saveButtonToggle } = useSaveButtonToggleContext()
  const { save } = useEditElemsContext()
  const color = useContext(ColorContext)
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
          <EditBlockHeader title="" />
        </div>
      )}
      <div
        className={`px-2 pb-6 -mt-6 ${color.bgColor}`}
        title="TermDescription"
      >
        {editElemsState.length === 0 && enableEdit ? (
          <EditElemAdds index={0} />
        ) : (
          editElemsState.map((editElem, index) => (
            <>
              {show(!star, editElem.quest_ids || []) && (
                <EditElemProvider editElem={editElem} index={index}>
                  <EditBlockContent />
                </EditElemProvider>
              )}
            </>
          ))
        )}
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && enableEdit && (
            <SaveButton onClick={onClickSave} />
          )}
        </div>
      </div>
    </>
  )
})
