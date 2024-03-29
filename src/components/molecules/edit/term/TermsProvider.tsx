import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectEditContext,
  setEdittingTerms,
} from '../../../../slices/editSlice'
import { useQueryTerms } from '../../../../hooks/useQueryTerms'
import { Term } from '../../../../types/types'
import { LangProvider } from '../../../atoms/LangProvider'
import { useOpenBookContext } from '../../../pages/QuizEditor'

interface Props {
  children: ReactNode
}
const FireContext = createContext(
  {} as {
    fire: boolean
    setFire: any
  }
)
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
export const useFireContext = () => useContext(FireContext)
export const useStarContext = () => useContext(StarContext)
export const useDraggableContext = () => useContext(DraggableContext)
export const useLockDragContext = () => useContext(LockDragContext)

export const TermsProvider: FC<Props> = ({ children }) => {
  const { open } = useOpenBookContext()
  const [draggable, setDraggable] = useState(true)
  const [fire, setFire] = useState(false)
  const [star, setStar] = useState(false)
  const [lockDrag, setLockDrag] = useState(!open)
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { status, data } = useQueryTerms(editContext.chosenTag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    if (editContext.forQuestion) {
      const keywords = JSON.parse(editContext.keywordsJson || '{}')
      const selectedTerms: Term[] =
        editContext.chosenTag.tag_name in keywords
          ? keywords[editContext.chosenTag.tag_name]
          : keywords[editContext.chosenTag.tag_no.toString()]
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
    <div className="mx-4 my-6" title="TermsProvider">
      <DraggableContext.Provider value={{ draggable, setDraggable }}>
        <FireContext.Provider value={{ fire, setFire }}>
          <StarContext.Provider value={{ star, setStar }}>
            <LockDragContext.Provider value={{ lockDrag, setLockDrag }}>
              <LangProvider>{children}</LangProvider>
            </LockDragContext.Provider>
          </StarContext.Provider>
        </FireContext.Provider>
      </DraggableContext.Provider>
    </div>
  )
}
