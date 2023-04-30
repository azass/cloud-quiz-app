import { FC, createContext, useContext, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectEditContext,
  setEdittingTerms,
} from '../../../../slices/editSlice'
import { useQueryTerms } from '../../../../hooks/useQueryTerms'
import { Term } from '../../../../types/types'
import { TermsEditor } from './TermsEditor'
import { LangProvider } from '../../../atoms/LangProvider'

const StarContext = createContext(
  {} as {
    star: boolean
    setStar: any
  }
)
const DraggableContext = createContext(
  {} as {
    draggable: boolean
    setDraggable: any
  }
)
const LockDragContext = createContext(
  {} as {
    lockDrag: boolean
    setLockDrag: any
  }
)
export const useStarContext = () => useContext(StarContext)
export const useDraggableContext = () => useContext(DraggableContext)
export const useLockDragContext = () => useContext(LockDragContext)
export const TermsProvider: FC = () => {
  const [draggable, setDraggable] = useState(true)
  const [star, setStar] = useState(false)
  const [lockDrag, setLockDrag] = useState(false)
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const { status, data } = useQueryTerms(editedContext.chosenTag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    if (editedContext.forQuestion) {
      const keywords = JSON.parse(editedContext.keywordsJson || '{}')
      const selectedTerms: Term[] =
        editedContext.chosenTag.tag_name in keywords
          ? keywords[editedContext.chosenTag.tag_name]
          : keywords[editedContext.chosenTag.tag_no.toString()]
      const selectedTermIds = selectedTerms?.map((term) => term.term_id)
      const newTerms: Term[] = []
      for (var term of data) {
        newTerms.push({
          ...term,
          selected: selectedTermIds.includes(term.term_id),
        })
      }
      dispatch(setEdittingTerms(newTerms))
    } else {
      dispatch(setEdittingTerms(data))
    }
  }
  return (
    <div className="mx-6 my-6" title="TermEditFrame">
      <DraggableContext.Provider value={{ draggable, setDraggable }}>
        <StarContext.Provider value={{ star, setStar }}>
          <LockDragContext.Provider value={{ lockDrag, setLockDrag }}>
            <LangProvider>
              <TermsEditor />
            </LangProvider>
          </LockDragContext.Provider>
        </StarContext.Provider>
      </DraggableContext.Provider>
    </div>
  )
}
