import { FC } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { selectEdittingTerms } from '../../../../slices/editSlice'
import { TermTile } from './TermTile'
import { Term } from '../../../../types/types'
import { TermProvider } from './TermProvider'

export const TermsVis: FC = () => {
  const terms = useAppSelector(selectEdittingTerms)
  const getDivideTerms = () => {
    const divTerms: Term[][] = []
    terms.forEach((term) => {
      if (term.level === 1) {
        divTerms.push([])
      }
      divTerms.slice(-1)[0].push(term)
    })
    return divTerms
  }
  const divideTerms = getDivideTerms()
  let i = 0
  return (
    <>
      {divideTerms.map((divterms) => (
        <>
          <div>
            <TermProvider term={divterms.shift() || divterms[0]} index={i++}>
              <TermTile />
            </TermProvider>
          </div>
          {divterms.length > 0 && (
            <div className="flex flex-wrap justify-start items-center pl-4">
              {divterms.map((term) => (
                <TermProvider term={term} index={i++}>
                  <TermTile />
                </TermProvider>
              ))}
            </div>
          )}
        </>
      ))}
    </>
  )
}
