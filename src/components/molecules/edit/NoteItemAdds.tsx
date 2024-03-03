import { FC, memo } from 'react'
import {
  DocumentAddIcon,
  ExternalLinkIcon,
  PhotographIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/solid'
import { AnnotationIcon } from '@heroicons/react/outline'
import {
  useEditItemsContext,
  useEdittingContext,
  useNoteItemsContext,
  useShowSaveBtnContext,
} from './NoteItemsProvider'
import { iconHover } from '../../../styles/util'
import { NoteItem, Term } from '../../../types/types'
import { useEditTermContext, useTermContext } from './term/TermProvider'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUpdateTerm, setUpdateTerm } from '../../../slices/editSlice'

interface Props {
  index: number
}
export const NoteItemAdds: FC<Props> = memo(({ index }) => {
  const dispatch = useAppDispatch()
  const updateTem = useAppSelector(selectUpdateTerm)
  const { add } = useNoteItemsContext()
  const {
    draggable,
    hasAddTextarea,
    hasAddLink,
    hasAddImage,
    isOptions,
    save,
  } = useNoteItemsContext()
  const style = `h-5 w-5 mx-2 ${iconHover}`
  const { showSaveBtn, setShowSaveBtn } = useShowSaveBtnContext()
  const { editting } = useEdittingContext()
  const { editItems } = useEditItemsContext()
  const { term } = useTermContext()
  const { updateCacheTerm } = useEditTermContext()

  const postSave = (requestData: Term) => {
    setShowSaveBtn(false)
    updateCacheTerm(requestData)
  }

  const saveTermNote = (newEditItems: NoteItem[]) => {
    const requestData: Term = { ...term, description: newEditItems }
    save(requestData, 'term', postSave(requestData))
    if (!updateTem) dispatch(setUpdateTerm(true))
  }
  return (
    <div
      className={`flex justify-between ${!isOptions && 'py-2'}`}
      title="NoteItemAdds"
    >
      <div className="flex justify-start">
        {hasAddTextarea && (
          <DocumentAddIcon
            className={style}
            onClick={() => add(index, 'textarea')}
          />
        )}
        {hasAddLink && (
          <ExternalLinkIcon
            className={style}
            onClick={() => add(index, 'link')}
          />
        )}
        {hasAddImage && (
          <PhotographIcon
            className={style}
            onClick={() => add(index, 'image')}
          />
        )}
        {draggable && showSaveBtn && editting && (
          <button
            type="button"
            className={`rounded-full flex-shrink-0 px-1 mx-4 my-0.5 text-xs text-white bg-green-400`}
            onClick={() => saveTermNote(editItems)}
          >
            <span>save</span>
          </button>
        )}
        {isOptions && (
          <>
            <PlusCircleIcon
              className={style}
              onClick={() => add(index, 'option')}
            />
            <PlusIcon className={style} onClick={() => add(index, 'select')} />
            <AnnotationIcon
              className={style}
              onClick={() => add(index, 'textbox')}
            />
          </>
        )}
      </div>
    </div>
  )
})
