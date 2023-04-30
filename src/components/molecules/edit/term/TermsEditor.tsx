import { FC } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { TermAddButton } from './TermAddButton'
import { selectEdittingTerms } from '../../../../slices/editSlice'
import { TermTree } from './TermTree'
import Colors from '../../../../consts/colors'
import { TermsVis } from './TermsVis'
import { useDraggableContext } from './TermsProvider'
import { TermsHeader } from './TermsHeader'

export const TermsEditor: FC = () => {
  const terms = useAppSelector(selectEdittingTerms)
  const { draggable } = useDraggableContext()
  return (
    <>
      <TermsHeader />
      <div id="navWrapper" className={Colors.baseBg}>
        <nav id="nav" className="pr-2 overflow-y-auto text-base h-screen pb-60">
          {draggable ? (
            <>
              {terms.length === 0 ? <TermAddButton index={0} /> : <TermTree />}
            </>
          ) : (
            <TermsVis />
          )}
        </nav>
      </div>
    </>
  )
}
